import { useEffect, useRef, useState, useMemo } from 'react';

interface TrueFocusProps {
  sentence?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  className?: string;
  wordClassName?: string;
}

const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence = 'True Focus',
  manualMode = false,
  blurAmount = 5,
  borderColor = 'green',
  glowColor = 'rgba(0, 255, 0, 0.6)',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  className = '',
  wordClassName = 'text-[3rem] font-black'
}) => {
  const words = useMemo(() => sentence.split(' '), [sentence]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusStyle, setFocusStyle] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Auto-cycling effect
  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(
        () => {
          setCurrentIndex(prev => (prev + 1) % words.length);
        },
        (animationDuration + pauseBetweenAnimations) * 1000
      );

      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  // Position update with RAF batching
  useEffect(() => {
    if (currentIndex === null || currentIndex === -1) return;
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;

    // Cancel any pending animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // Batch DOM reads in RAF
    animationFrameRef.current = requestAnimationFrame(() => {
      const parentRect = containerRef.current!.getBoundingClientRect();
      const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect();

      setFocusStyle({
        left: activeRect.left - parentRect.left,
        top: activeRect.top - parentRect.top,
        width: activeRect.width,
        height: activeRect.height,
        opacity: 1
      });
    });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [currentIndex]);

  const handleMouseEnter = (index: number) => {
    if (manualMode) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode && lastActiveIndex !== null) {
      setCurrentIndex(lastActiveIndex);
    }
  };

  return (
    <div 
      className={`relative flex gap-2 sm:gap-3 md:gap-4 justify-center lg:justify-start items-center flex-wrap lg:flex-nowrap ${className}`} 
      ref={containerRef}
      style={{
        // Performance optimization
        willChange: 'contents',
      }}
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={el => {
              wordRefs.current[index] = el;
            }}
            className={`relative cursor-pointer ${wordClassName}`}
            style={{
              filter: isActive ? 'blur(0px)' : `blur(${blurAmount}px)`,
              transition: `filter ${animationDuration}s ease`,
              // GPU acceleration hint
              transform: 'translateZ(0)',
            } as React.CSSProperties}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}

      {/* Simplified focus indicator using CSS transforms instead of Framer Motion */}
      <div
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          transform: `translate(${focusStyle.left}px, ${focusStyle.top}px)`,
          width: focusStyle.width,
          height: focusStyle.height,
          opacity: focusStyle.opacity,
          transition: `transform ${animationDuration}s ease, width ${animationDuration}s ease, height ${animationDuration}s ease, opacity ${animationDuration}s ease`,
          willChange: 'transform, width, height',
        }}
      >
        {/* Corner indicators - simplified to single elements */}
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] left-[-10px] border-r-0 border-b-0"
          style={{ borderColor }}
        />
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] right-[-10px] border-l-0 border-b-0"
          style={{ borderColor }}
        />
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] left-[-10px] border-r-0 border-t-0"
          style={{ borderColor }}
        />
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] right-[-10px] border-l-0 border-t-0"
          style={{ borderColor }}
        />
      </div>
    </div>
  );
};

export default TrueFocus;
