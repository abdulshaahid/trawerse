'use client';

import React, { useRef, useLayoutEffect, useState, useMemo, useCallback, useEffect } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from 'framer-motion';
import './scroll-velocity.css';

interface VelocityMapping {
  input: [number, number];
  output: [number, number];
}

interface VelocityTextProps {
  children: React.ReactNode;
  baseVelocity: number;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

interface ScrollVelocityProps {
  scrollContainerRef?: React.RefObject<HTMLElement>;
  texts: string[];
  velocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

function useElementWidth<T extends HTMLElement>(ref: React.RefObject<T | null>): number {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    updateWidth();
    
    let timeoutId: NodeJS.Timeout;
    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateWidth, 150); // Increased debounce time
    };
    
    window.addEventListener('resize', debouncedUpdate, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', debouncedUpdate);
    };
  }, [ref]);

  return width;
}

// Custom hook for Intersection Observer to pause animations when off-screen
function useIsVisible(ref: React.RefObject<HTMLElement | null>): boolean {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].isIntersecting);
      },
      { rootMargin: '100px', threshold: 0.01 } // Start animating slightly before visible
    );
    
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return isVisible;
}

export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  scrollContainerRef,
  texts = [],
  velocity = 100,
  className = '',
  damping = 50,
  stiffness = 400,
  numCopies = 4, // Reduced from 6 to 4 for better performance
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName = 'parallax',
  scrollerClassName = 'scroller',
  parallaxStyle,
  scrollerStyle
}) => {
  // Detect mobile device for performance optimizations
  const isMobile = useMemo(() => 
    typeof window !== 'undefined' && window.innerWidth < 768,
    []
  );

  // Reduce copies even further on mobile devices
  const effectiveCopies = useMemo(() => {
    if (numCopies !== undefined && numCopies !== 4) return numCopies;
    return isMobile ? 3 : 4;
  }, [numCopies, isMobile]);

  const VelocityText = React.memo((({
    children,
    baseVelocity = velocity,
    scrollContainerRef,
    className = '',
    damping,
    stiffness,
    numCopies,
    velocityMapping,
    parallaxClassName,
    scrollerClassName,
    parallaxStyle,
    scrollerStyle
  }: VelocityTextProps) => {
    const baseX = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const isVisible = useIsVisible(containerRef);
    
    const scrollOptions = useMemo(() => 
      scrollContainerRef ? { container: scrollContainerRef } : {}, 
      [scrollContainerRef]
    );
    const { scrollY } = useScroll(scrollOptions);
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: damping ?? 50,
      stiffness: stiffness ?? 400,
      restDelta: 0.001
    });
    const velocityFactor = useTransform(
      smoothVelocity,
      velocityMapping?.input || [0, 1000],
      velocityMapping?.output || [0, 5],
      { clamp: false }
    );

    const copyRef = useRef<HTMLSpanElement>(null);
    const copyWidth = useElementWidth(copyRef);

    const wrap = useCallback((min: number, max: number, v: number): number => {
      const range = max - min;
      const mod = (((v - min) % range) + range) % range;
      return mod + min;
    }, []);

    const x = useTransform(baseX, v => {
      if (copyWidth === 0) return '0px';
      return `${wrap(-copyWidth, 0, v)}px`;
    });

    const directionFactor = useRef<number>(1);
    
    // Frame throttling for mobile devices
    const frameCountRef = useRef(0);
    
    useAnimationFrame((t, delta) => {
      // Only animate if visible
      if (!isVisible) return;
      
      // Throttle to 30fps on mobile (skip every other frame)
      if (isMobile) {
        frameCountRef.current++;
        if (frameCountRef.current % 2 === 0) return;
      }
      
      const cappedDelta = Math.min(delta, 50);
      let moveBy = directionFactor.current * baseVelocity * (cappedDelta / 1000);

      const velFactor = velocityFactor.get();
      if (velFactor < 0) {
        directionFactor.current = -1;
      } else if (velFactor > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velFactor;
      baseX.set(baseX.get() + moveBy);
    });

    // Function to format text with different opacity parts - memoized
    const formatText = useCallback((text: React.ReactNode) => {
      const textStr = String(text).trim();
      if (textStr === '#WECODEFORFUN') {
        return (
          <>
            <span style={{ opacity: 0.3 }}>#WE</span>
            <span style={{ opacity: 0.6 }}>CODE</span>
            <span style={{ opacity: 0.3 }}>FOR</span>
            <span style={{ opacity: 0.6 }}>FUN</span>
            &nbsp;&nbsp;
          </>
        );
      }
      return text;
    }, []);

    const spans = useMemo(() => {
      const result = [];
      for (let i = 0; i < numCopies!; i++) {
        result.push(
          <span className={className} key={i} ref={i === 0 ? copyRef : null}>
            {formatText(children)}
          </span>
        );
      }
      return result;
    }, [numCopies, className, children, formatText]);

    return (
      <div 
        ref={containerRef}
        className={parallaxClassName} 
        style={{
          ...parallaxStyle,
          // Performance optimizations - removed 'contain' to fix sizing
          willChange: isVisible ? 'transform' : 'auto',
        }}
      >
        <motion.div 
          className={scrollerClassName} 
          style={{ 
            x, 
            ...scrollerStyle,
            // Force GPU acceleration
            willChange: isVisible ? 'transform' : 'auto',
          }}
        >
          {spans}
        </motion.div>
      </div>
    );
  }) as React.FC<VelocityTextProps>);

  VelocityText.displayName = 'VelocityText';

  return (
    <section>
      {texts.map((text: string, index: number) => (
        <VelocityText
          key={index}
          className={className}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          scrollContainerRef={scrollContainerRef}
          damping={damping}
          stiffness={stiffness}
          numCopies={effectiveCopies}
          velocityMapping={velocityMapping}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
        >
          {text}
        </VelocityText>
      ))}
    </section>
  );
};

export default ScrollVelocity;