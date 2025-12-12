import { useRef, useEffect, useState, useMemo, useId, FC } from 'react';
import './CurvedLoop.css';

interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  className?: string;
  curveAmount?: number;
  direction?: 'left' | 'right';
}

const CurvedLoop: FC<CurvedLoopProps> = ({
  marqueeText = '',
  speed = 2,
  className,
  curveAmount = 400,
  direction = 'left',
}) => {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0';
  }, [marqueeText]);

  const measureRef = useRef<SVGTextElement | null>(null);
  const textPathRef = useRef<SVGTextPathElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const uid = useId();
  const pathId = `curve-${uid}`;
  const waveHeight = curveAmount;
  const pathD = `M-200,75 Q100,${75 - waveHeight} 400,75 T1000,75 T1600,75 T2200,75`;

  // Performance optimization: Cache the current offset value
  const cachedOffsetRef = useRef(0);

  const textLength = spacing;
  const totalText = textLength
    ? Array(Math.ceil(1800 / textLength) + 2)
        .fill(text)
        .join('')
    : text;
  const ready = spacing > 0;

  // Intersection Observer to pause animations when off-screen
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].isIntersecting);
      },
      { rootMargin: '50px', threshold: 0.1 }
    );
    
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (measureRef.current) setSpacing(measureRef.current.getComputedTextLength());
  }, [text, className]);

  useEffect(() => {
    if (!spacing) return;
    if (textPathRef.current) {
      const initial = -spacing;
      textPathRef.current.setAttribute('startOffset', initial + 'px');
      cachedOffsetRef.current = initial;
      setOffset(initial);
    }
  }, [spacing]);

  // Simple one-direction animation loop
  useEffect(() => {
    if (!spacing || !ready || !isVisible) return;
    
    let frame = 0;
    const step = () => {
      if (textPathRef.current) {
        const delta = direction === 'right' ? speed : -speed;
        let newOffset = cachedOffsetRef.current + delta;
        const wrapPoint = spacing;
        
        if (newOffset <= -wrapPoint) newOffset += wrapPoint;
        if (newOffset > 0) newOffset -= wrapPoint;
        
        cachedOffsetRef.current = newOffset;
        textPathRef.current.setAttribute('startOffset', newOffset + 'px');
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [spacing, speed, ready, isVisible, direction]);

  return (
    <div
      ref={containerRef}
      className="curved-loop-jacket"
      style={{
        visibility: ready ? 'visible' : 'hidden',
        // Performance optimizations - lightweight, non-interactive
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
        userSelect: 'none',
        pointerEvents: 'none', // Non-interactive
      }}
    >
      <svg
        className="curved-loop-svg"
        viewBox="-100 0 1840 150"
        preserveAspectRatio="xMidYMid slice"
        style={{
          // Additional SVG performance hints
          shapeRendering: 'geometricPrecision',
          textRendering: 'geometricPrecision',
        }}
      >
        <text ref={measureRef} xmlSpace="preserve" style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}>
          {text}
        </text>
        <defs>
          <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>
        {ready && (
          <text fontWeight="bold" xmlSpace="preserve" className={className}>
            <textPath ref={textPathRef} href={`#${pathId}`} startOffset={offset + 'px'} xmlSpace="preserve">
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;
