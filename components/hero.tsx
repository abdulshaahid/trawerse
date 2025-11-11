"use client"

import { useEffect, useRef } from "react"
import * as React from 'react';
import Image from 'next/image';
import gsap from "gsap"
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import TrueFocus from "@/components/ui/true-focus";
import { ArrowDown, Eye } from 'lucide-react';

// --- Company Logo SVG Components ---

const IconGoogle = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.9999 12.24C21.9999 11.4933 21.9333 10.76 21.8066 10.0533H12.3333V14.16H17.9533C17.7333 15.3467 17.0133 16.3733 15.9666 17.08V19.68H19.5266C21.1933 18.16 21.9999 15.4533 21.9999 12.24Z" fill="#4285F4"/>
        <path d="M12.3333 22C15.2333 22 17.6866 21.0533 19.5266 19.68L15.9666 17.08C15.0199 17.7333 13.7933 18.16 12.3333 18.16C9.52659 18.16 7.14659 16.28 6.27992 13.84H2.59326V16.5133C4.38659 20.0267 8.05992 22 12.3333 22Z" fill="#34A853"/>
        <path d="M6.2799 13.84C6.07324 13.2267 5.9599 12.58 5.9599 11.92C5.9599 11.26 6.07324 10.6133 6.2799 10L2.59326 7.32667C1.86659 8.78667 1.45326 10.32 1.45326 11.92C1.45326 13.52 1.86659 15.0533 2.59326 16.5133L6.2799 13.84Z" fill="#FBBC05"/>
        <path d="M12.3333 5.68C13.8933 5.68 15.3133 6.22667 16.3866 7.24L19.6 4.02667C17.68 2.29333 15.2266 1.33333 12.3333 1.33333C8.05992 1.33333 4.38659 3.97333 2.59326 7.32667L6.27992 10C7.14659 7.56 9.52659 5.68 12.3333 5.68Z" fill="#EA4335"/>
    </svg>
);

const IconApple = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor" className="text-foreground/80" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.482 15.334C16.274 16.146 15.238 17.554 15.238 19.138C15.238 21.694 17.062 22.846 19.33 22.99C21.682 23.122 23.53 21.73 23.53 19.138C23.53 16.57 21.742 15.334 19.438 15.334C18.23 15.334 17.482 15.334 17.482 15.334ZM19.438 1.018C17.074 1.018 15.238 2.41 15.238 4.982C15.238 7.554 17.062 8.702 19.33 8.842C21.682 8.974 23.53 7.582 23.53 4.982C23.518 2.41 21.742 1.018 19.438 1.018Z" />
    </svg>
);

const IconMicrosoft = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.4 2H2v9.4h9.4V2Z" fill="#F25022"/>
        <path d="M22 2h-9.4v9.4H22V2Z" fill="#7FBA00"/>
        <path d="M11.4 12.6H2V22h9.4V12.6Z" fill="#00A4EF"/>
        <path d="M22 12.6h-9.4V22H22V12.6Z" fill="#FFB900"/>
    </svg>
);

const IconFigma = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10A10 10 0 0 1 2 12 10 10 0 0 1 12 2z" fill="#2C2C2C"/>
        <path d="M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5V7z" fill="#0ACF83"/>
        <path d="M12 12a5 5 0 0 1-5-5 5 5 0 0 1 5-5v10z" fill="#A259FF"/>
        <path d="M12 17a5 5 0 0 1-5-5h10a5 5 0 0 1-5 5z" fill="#F24E1E"/>
        <path d="M7 12a5 5 0 0 1 5 5v-5H7z" fill="#FF7262"/>
    </svg>
);

const IconGitHub = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor" className="text-foreground/80" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
);





const IconVercel = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor" className="text-foreground/90" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 22h20L12 2z"/>
    </svg>
);

const IconStripe = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" fill="#635BFF"/><path d="M6 7H18V9H6V7Z" fill="white"/><path d="M6 11H18V13H6V11Z" fill="white"/><path d="M6 15H14V17H6V15Z" fill="white"/>
    </svg>
);

const IconDiscord = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.317 4.482a1.88 1.88 0 0 0-1.635-.482C17.398 3.42 16.02 3 12 3s-5.398.42-6.682 1.001a1.88 1.88 0 0 0-1.635.483c-1.875 1.2-2.325 3.61-1.568 5.711 1.62 4.47 5.063 7.8 9.885 7.8s8.265-3.33 9.885-7.8c.757-2.1-.307-4.51-1.568-5.711ZM8.45 13.4c-.825 0-1.5-.75-1.5-1.65s.675-1.65 1.5-1.65c.825 0 1.5.75 1.5 1.65s-.675 1.65-1.5 1.65Zm7.1 0c-.825 0-1.5-.75-1.5-1.65s.675-1.65 1.5-1.65c.825 0 1.5.75 1.5 1.65s-.675 1.65-1.5 1.65Z" fill="#5865F2"/>
    </svg>
);

const IconX = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor" className="text-foreground/90" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231L18.244 2.25zM17.03 19.75h1.866L7.156 4.25H5.16l11.874 15.5z"/>
    </svg>
);

const IconSpotify = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.125 14.175c-.188.3-.563.413-.863.225-2.437-1.5-5.5-1.725-9.15-1.012-.338.088-.675-.15-.763-.488-.088-.337.15-.675.488-.762 3.937-.787 7.287-.525 9.975 1.125.3.187.412.562.225.862zm.9-2.7c-.225.363-.675.488-1.037.263-2.7-1.65-6.825-2.1-9.975-1.162-.413.113-.825-.15-1-.562-.15-.413.15-.825.563-1 .362-.112 3.487-.975 6.6 1.312.362.225.487.675.262 1.038v.112zm.113-2.887c-3.225-1.875-8.55-2.025-11.512-1.125-.487.15-.975-.15-1.125-.637-.15-.488.15-.975.638-1.125 3.337-.975 9.15-.787 12.825 1.312.45.263.6.825.337 1.275-.263.45-.825.6-1.275.337v-.038z" fill="#1DB954"/>
    </svg>
);

const IconDropbox = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 8l-6 4 6 4 6-4-6-4z" fill="#0061FF"/><path d="M6 12l6 4 6-4-6-4-6 4z" fill="#007BFF"/><path d="M12 16l6-4-6-4-6 4 6 4z" fill="#4DA3FF"/><path d="M18 12l-6-4-6 4 6 4 6-4z" fill="#0061FF"/>
    </svg>
);

const IconTwitch = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.149 0L.707 3.028v17.944h5.66v3.028h3.028l3.028-3.028h4.243l7.07-7.07V0H2.15zm19.799 13.434l-3.535 3.535h-4.95l-3.029 3.029v-3.03H5.14V1.414h16.808v12.02z" fill="#9146FF"/><path d="M15.53 5.303h2.12v6.36h-2.12v-6.36zm-4.95 0h2.12v6.36h-2.12v-6.36z" fill="#9146FF"/>
    </svg>
);

const IconLinear = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="linear-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#5E5CE6" /><stop offset="100%" stopColor="#2C2C2C" /></linearGradient></defs><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-4 9h8v2H8v-2z" fill="url(#linear-grad)"/>
    </svg>
);

const IconYouTube = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.582 6.186A2.482 2.482 0 0 0 19.82 4.42C18.1 4 12 4 12 4s-6.1 0-7.82.42c-.98.26-1.74.98-1.762 1.766C2 7.94 2 12 2 12s0 4.06.418 5.814c.022.786.782 1.506 1.762 1.766C6.1 20 12 20 12 20s6.1 0 7.82-.42c.98-.26 1.74-.98 1.762-1.766C22 16.06 22 12 22 12s0-4.06-.418-5.814zM9.75 15.5V8.5L15.75 12 9.75 15.5z" fill="#FF0000"/>
    </svg>
);

// Floating Icon Component
const FloatingIcon = ({
  mouseX,
  mouseY,
  Icon,
  className,
  index,
}: {
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  className: string;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 30, mass: 0.5, restSpeed: 0.2 });
  const springY = useSpring(y, { stiffness: 200, damping: 30, mass: 0.5, restSpeed: 0.2 });

  useEffect(() => {
    let rafId: number;
    let lastFrameTime = 0;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const maxDistance = isTouchDevice ? 150 : 120;
    const forceMultiplier = isTouchDevice ? 40 : 30;
    const targetFPS = 30; // Reduce from 60 to 30 FPS for better performance
    const frameInterval = 1000 / targetFPS;
    
    const updatePosition = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceSq = Math.pow(mouseX.current - centerX, 2) + Math.pow(mouseY.current - centerY, 2);
        const maxDistanceSq = maxDistance * maxDistance;

        if (distanceSq < maxDistanceSq) {
          const distance = Math.sqrt(distanceSq);
          const angle = Math.atan2(
            mouseY.current - centerY,
            mouseX.current - centerX
          );
          const force = (1 - distance / maxDistance) * forceMultiplier;
          x.set(-Math.cos(angle) * force);
          y.set(-Math.sin(angle) * force);
        } else {
          x.set(0);
          y.set(0);
        }
      }
    };

    // Throttled animation loop for better performance
    const animate = (currentTime: number = 0) => {
      const elapsed = currentTime - lastFrameTime;
      
      if (elapsed >= frameInterval) {
        lastFrameTime = currentTime - (elapsed % frameInterval);
        updatePosition();
      }
      
      rafId = requestAnimationFrame(animate);
    };

    animate();

    const handleTouchEnd = () => {
      // Reset mouse position off-screen when touch ends
      setTimeout(() => {
        mouseX.current = -1000;
        mouseY.current = -1000;
      }, 100);
    };
    
    // Add touch end handlers for mobile
    if (isTouchDevice) {
      window.addEventListener('touchend', handleTouchEnd, { passive: true });
      window.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    }
    
    return () => {
      if (isTouchDevice) {
        window.removeEventListener('touchend', handleTouchEnd);
        window.removeEventListener('touchcancel', handleTouchEnd);
      }
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [x, y, mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY, willChange: 'transform' }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 0.2 + index * 0.05,
        duration: 0.6,
        type: "spring",
        stiffness: 120,
        damping: 18
      }}
      className={`absolute ${className}`}
    >
      <motion.div
        className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 p-2 md:p-2.5 rounded-2xl md:rounded-3xl bg-[#1b1b1b] backdrop-blur-md border border-border/10"
        style={{
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 10px 25px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
          willChange: 'transform',
        }}
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      >
        <Icon className="w-5 h-5 md:w-8 md:h-8" style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4))' }} />
      </motion.div>
    </motion.div>
  );
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subheadlineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const decorStarsRef = useRef<HTMLDivElement>(null)
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const floatingIcons = [
    // Top row - spread across
    { Icon: IconGoogle, className: 'top-[9%] left-[5%] md:top-[8%] md:left-[10%]' },
    { Icon: IconApple, className: 'top-[23%] right-[7%] md:top-[12%] md:left-[28%]' },
    { Icon: IconFigma, className: 'top-[15%] right-[30%] md:top-[12%] md:left-[48%]' },
    { Icon: IconStripe, className: 'top-[23%] left-[5%] md:top-[14%] md:left-[68%]' },
    { Icon: IconYouTube, className: 'top-[9%] right-[7%] md:top-[9%] md:right-[10%]' },
    
    // Upper-middle row
    { Icon: IconX, className: 'top-[45%] left-[5%] md:top-[25%] md:left-[55%]' },
    { Icon: IconMicrosoft, className: 'bottom-[8%] left-[10%] md:bottom-[15%] md:left-[5%]' },

    
    // Middle row
    { Icon: IconSpotify, className: 'bottom-[21%] right-[7%] md:top-[48%] md:left-[5%]' },
    { Icon: IconGitHub, className: 'top-[15%] left-[28%] md:top-[55%] md:left-[65%]' },
    { Icon: IconDiscord, className: 'top-[45%] right-[5%] md:top-[49%] md:right-[12%]' },
    
    // Lower-middle row
    { Icon: IconLinear, className: 'bottom-[21%] left-[7%] md:top-[78%] md:left-[22%]' },
    { Icon: IconDropbox, className: 'bottom-[22%] left-[42%] md:top-[70%] md:left-[57%]' },
    
    // Bottom row
    { Icon: IconVercel, className: 'bottom-[10%] left-[45%] md:bottom-[12%] md:left-[38%]' },
    { Icon: IconTwitch, className: 'bottom-[9%] right-[12%] md:bottom-[16%] md:right-[15%]' },
  ];

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([decorStarsRef.current, logoRef.current, titleRef.current, subheadlineRef.current, ctaRef.current], { 
        opacity: 0
      })

      // Decorative stars at top
      gsap.to(decorStarsRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power1.out",
      })
      gsap.from(decorStarsRef.current?.children || [], {
        scale: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "back.out(1.7)",
      })

      // Create a timeline for smooth sequencing
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } })
      
      // Logo animation
      tl.fromTo(logoRef.current, 
        { opacity: 0, y: -20, scale: 0.85 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power1.out" },
        0.1
      )
      
      // Title animation
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power1.out" },
        0.25
      )
      
      // Subheadline animation
      tl.fromTo(subheadlineRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power1.out" },
        0.4
      )
      
      // CTA container fade in
      tl.to(ctaRef.current, 
        { opacity: 1, duration: 0.4, ease: "power1.out" },
        0.55
      )
      
      // CTA buttons stagger
      tl.fromTo(ctaRef.current?.children || [],
        { opacity: 0, y: 15, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.4)"
        },
        0.65
      )

    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    mouseX.current = event.clientX;
    mouseY.current = event.clientY;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    if (touch) {
      mouseX.current = touch.clientX;
      mouseY.current = touch.clientY;
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent/5 -z-10" />

        {/* Floating Icons */}
        {floatingIcons.map((item, index) => (
          <FloatingIcon
            key={index}
            mouseX={mouseX}
            mouseY={mouseY}
            Icon={item.Icon}
            className={item.className}
            index={index}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left sidebar navigation */}
          

          {/* Center content */}
          <div className="lg:col-span-10 text-center lg:text-left relative">
            {/* Decorative elements around title */}
            <div ref={decorStarsRef} className="flex items-center justify-center lg:justify-start gap-3 mb-4 sm:mb-6 opacity-0" style={{ willChange: 'opacity' }}>
              <div className="w-6 h-6 text-accent text-xl">✦</div>
              <div className="w-6 h-6 text-accent text-xl">✦</div>
            </div>

            {/* Main headline */}
            <h1 ref={titleRef} className="mb-4 sm:mb-6 leading-tight opacity-0" style={{ willChange: 'opacity, transform' }}>
              <div ref={logoRef} className="mb-4 opacity-0" style={{ willChange: 'opacity, transform' }}>
                <Image 
                  src="/trawerse.svg" 
                  alt="Trawerse" 
                  width={200} 
                  height={60} 
                  className="h-10 sm:h-12 md:h-14 lg:h-16 xl:h-20 w-auto mx-auto lg:mx-0"
                  priority
                />
              </div>
              <TrueFocus 
                sentence="Builds Your Dream, Perfectly."
                manualMode={false}
                blurAmount={3}
                borderColor="#4ADE80"
                glowColor="rgba(74, 222, 128, 0.6)"
                animationDuration={0.8}
                pauseBetweenAnimations={1.2}
                wordClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground"
              />
            </h1>
            
            {/* Subheadline */}
            <p ref={subheadlineRef} className="text-base sm:text-lg md:text-xl lg:text-xl text-foreground/70 max-w-3xl mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed opacity-0" style={{ willChange: 'opacity, transform' }}>
              We don't just make websites, we craft experiences with unmatched quality.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-row gap-3 items-center justify-center lg:justify-start mb-12 opacity-0" style={{ willChange: 'opacity', perspective: '1000px' }}>
              <button 
                onClick={() => {
                  const event = new CustomEvent('navigateToSection', {
                    detail: { sectionId: 'contact' }
                  })
                  window.dispatchEvent(event)
                }}
                className="group relative bg-accent hover:bg-accent/90 text-white pl-1.5 pr-4 sm:pr-5 py-1.5 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 hover:scale-105 hover:-translate-y-1 active:scale-95 active:translate-y-0 flex items-center gap-2 sm:gap-2.5 overflow-hidden"
                style={{
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                }}
              >
                {/* Glossy light effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none" 
                  style={{ 
                    transform: 'translateZ(1px)',
                    maskImage: 'linear-gradient(135deg, white 0%, transparent 60%)'
                  }} 
                />
                {/* Bottom shadow for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full" />
                
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black flex items-center justify-center transition-transform duration-300 group-hover:rotate-180 relative overflow-hidden"
                  style={{
                    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50" />
                  <ArrowDown className="w-4 h-4 sm:w-4 sm:h-4 text-accent relative z-10" strokeWidth={2.5} />
                </div>
                <span className="whitespace-nowrap text-black font-semibold relative z-10">Start Project</span>
              </button>
              
              <button 
                onClick={() => {
                  const event = new CustomEvent('navigateToSection', {
                    detail: { sectionId: 'work' }
                  })
                  window.dispatchEvent(event)
                }}
                className="group relative bg-accent hover:bg-accent/90 text-white pl-1.5 pr-4 sm:pr-5 py-1.5 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 hover:scale-105 hover:-translate-y-1 active:scale-95 active:translate-y-0 flex items-center gap-2 sm:gap-2.5 overflow-hidden"
                style={{
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                }}
              >
                {/* Glossy light effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none" 
                  style={{ 
                    transform: 'translateZ(1px)',
                    maskImage: 'linear-gradient(135deg, white 0%, transparent 60%)'
                  }} 
                />
                {/* Bottom shadow for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full" />
                
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black flex items-center justify-center transition-transform duration-300 group-hover:scale-110 relative overflow-hidden"
                  style={{
                    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50" />
                  <Eye className="w-4 h-4 sm:w-4 sm:h-4 text-accent relative z-10" strokeWidth={2.5} />
                </div>
                <span className="whitespace-nowrap text-black font-semibold relative z-10">View Our Work</span>
              </button>
            </div>
            
            {/* Random decorative stars scattered around */}
            <div className="absolute top-[15%] left-[85%] hidden lg:block">
              <div className="w-4 h-4 text-accent/40 text-lg">✦</div>
            </div>
            <div className="absolute top-[35%] left-[90%] hidden lg:block">
              <div className="w-5 h-5 text-accent/30 text-xl">✦</div>
            </div>
            <div className="absolute top-[55%] left-[88%] hidden lg:block">
              <div className="w-3 h-3 text-accent/50 text-sm">✦</div>
            </div>
            <div className="absolute bottom-[25%] left-[82%] hidden lg:block">
              <div className="w-4 h-4 text-accent/35 text-base">✦</div>
            </div>
            <div className="absolute top-[25%] left-[75%] hidden lg:block">
              <div className="w-3 h-3 text-accent/45 text-sm">✦</div>
            </div>
          </div>

     
        </div>
      </div>
    </section>
  )
}
