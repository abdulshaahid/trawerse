"use client";

import { useEffect, useRef, useMemo, useCallback, memo } from "react";
import * as React from "react";
import Image from "next/image";
import gsap from "gsap";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import TrueFocus from "@/components/ui/true-focus";
import { Component as GlowBackground } from "@/components/ui/background-components";
import { ArrowDown, Eye, Code2, Palette, Layout, Database, Server, Smartphone, Globe, Cpu, Layers, Monitor, PenTool, Terminal, Cloud, Shield } from "lucide-react";

// Static floating icons configuration (moved outside for performance)
const FLOATING_ICONS_CONFIG = [
  { Icon: Globe, className: "top-[9%] left-[5%] md:top-[8%] md:left-[10%]" },
  { Icon: Smartphone, className: "top-[21%] right-[7%] md:top-[12%] md:left-[28%]" },
  { Icon: Palette, className: "top-[15%] right-[30%] md:top-[12%] md:left-[48%]" },
  { Icon: Code2, className: "top-[21%] left-[5%] md:top-[14%] md:left-[68%]" },
  { Icon: Layout, className: "top-[9%] right-[7%] md:top-[9%] md:right-[10%]" },
  { Icon: Database, className: "top-[48%] left-[3%] md:top-[25%] md:left-[55%]" },
  { Icon: Server, className: "bottom-[8%] left-[10%] md:bottom-[15%] md:left-[5%]" },
  { Icon: Cpu, className: "bottom-[21%] right-[7%] md:top-[48%] md:left-[5%]" },
  { Icon: Layers, className: "top-[15%] left-[28%] md:top-[65%] md:left-[65%]" },
  { Icon: Monitor, className: "top-[48%] right-[3%] md:top-[49%] md:right-[12%]" },
  { Icon: PenTool, className: "bottom-[21%] left-[7%] md:top-[78%] md:left-[22%]" },
  { Icon: Terminal, className: "bottom-[22%] left-[42%] md:top-[70%] md:left-[52%]" },
  { Icon: Cloud, className: "bottom-[10%] left-[45%] md:bottom-[12%] md:left-[38%]" },
  { Icon: Shield, className: "bottom-[9%] right-[12%] md:bottom-[16%] md:right-[15%]" },
] as const;

// Memoized Floating Icon Component - OPTIMIZED: Start visible immediately
const FloatingIcon = memo(
  ({
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
    const springX = useSpring(x, {
      stiffness: 200,
      damping: 30,
      mass: 0.5,
      restSpeed: 0.2,
    });
    const springY = useSpring(y, {
      stiffness: 200,
      damping: 30,
      mass: 0.5,
      restSpeed: 0.2,
    });

    useEffect(() => {
      let rafId: number;
      let lastFrameTime = 0;
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const maxDistance = isTouchDevice ? 280 : 140;
      const forceMultiplier = isTouchDevice ? 60 : 35;
      const targetFPS = 30;
      const frameInterval = 1000 / targetFPS;

      const updatePosition = () => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const distanceSq =
            Math.pow(mouseX.current - centerX, 2) +
            Math.pow(mouseY.current - centerY, 2);
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

      const animate = (currentTime: number = 0) => {
        const elapsed = currentTime - lastFrameTime;

        if (elapsed >= frameInterval) {
          lastFrameTime = currentTime - (elapsed % frameInterval);
          updatePosition();
        }

        rafId = requestAnimationFrame(animate);
      };

      animate();

      const handleTouchMoveDirect = () => {
        updatePosition();
      };

      const handleTouchEnd = () => {
        setTimeout(() => {
          mouseX.current = -1000;
          mouseY.current = -1000;
        }, 100);
      };

      if (isTouchDevice) {
        window.addEventListener("touchstart", handleTouchMoveDirect, {
          passive: true,
        });
        window.addEventListener("touchmove", handleTouchMoveDirect, {
          passive: true,
        });
        window.addEventListener("touchend", handleTouchEnd, { passive: true });
        window.addEventListener("touchcancel", handleTouchEnd, {
          passive: true,
        });
      }

      return () => {
        if (isTouchDevice) {
          window.removeEventListener("touchstart", handleTouchMoveDirect);
          window.removeEventListener("touchmove", handleTouchMoveDirect);
          window.removeEventListener("touchend", handleTouchEnd);
          window.removeEventListener("touchcancel", handleTouchEnd);
        }
        if (rafId) cancelAnimationFrame(rafId);
      };
    }, [x, y, mouseX, mouseY]);

    return (
      <motion.div
        ref={ref}
        style={{ x: springX, y: springY, willChange: "transform" }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 0,
          duration: 0.4,
          type: "spring",
          stiffness: 150,
          damping: 15,
        }}
        className={`absolute ${className}`}
      >
        <motion.div
          className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 p-2 md:p-2.5 rounded-2xl md:rounded-3xl bg-[#1b1b1b] backdrop-blur-md border border-border/10"
          style={{
            boxShadow:
              "0 20px 50px rgba(0, 0, 0, 0.6), 0 10px 25px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
            willChange: "transform",
          }}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          <Icon
            className="w-5 h-5 md:w-8 md:h-8"
            style={{ filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4))" }}
          />
        </motion.div>
      </motion.div>
    );
  }
);
FloatingIcon.displayName = "FloatingIcon";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const decorStarsRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  // OPTIMIZED: Faster animations, elements hidden until animation starts
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Decorative stars - faster animation
      gsap.to(decorStarsRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power1.out",
      });
      gsap.from(decorStarsRef.current?.children || [], {
        scale: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: "back.out(1.4)",
      });

      // Timeline with faster sequences
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Badge - start immediately
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -15, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4 },
        0
      );

      // Logo - start almost immediately after
      tl.fromTo(
        logoRef.current,
        { opacity: 0, y: -15, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4 },
        0.1
      );

      // Title - minimal delay
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4 },
        0.2
      );

      // Subheadline - reduced delay
      tl.fromTo(
        subheadlineRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4 },
        0.3
      );

      // CTA container - reduced delay
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3 },
        0.4
      );

      // CTA buttons - faster stagger
      tl.fromTo(
        ctaRef.current?.children || [],
        { opacity: 0, y: 10, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: "back.out(1.2)",
        },
        0.45
      );
    }, containerRef);

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) return;

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) {
        mouseX.current = t.clientX;
        mouseY.current = t.clientY;
      }
    };
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) {
        mouseX.current = t.clientX;
        mouseY.current = t.clientY;
      }
    };
    const onTouchEnd = () => {
      mouseX.current = -1000;
      mouseY.current = -1000;
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !(window as any).PointerEvent) return;
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") {
        mouseX.current = e.clientX;
        mouseY.current = e.clientY;
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") {
        mouseX.current = e.clientX;
        mouseY.current = e.clientY;
      }
    };
    const onPointerUp = () => {
      mouseX.current = -1000;
      mouseY.current = -1000;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      mouseX.current = event.clientX;
      mouseY.current = event.clientY;
    },
    []
  );

  const handleTouchMove = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      const touch = event.touches[0];
      if (touch) {
        mouseX.current = touch.clientX;
        mouseY.current = touch.clientY;
      }
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.current = -1000;
    mouseY.current = -1000;
  }, []);

  const handleTouchStart = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      const touch = event.touches[0];
      if (touch) {
        mouseX.current = touch.clientX;
        mouseY.current = touch.clientY;
      }
    },
    []
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      mouseX.current = event.clientX;
      mouseY.current = event.clientY;
    },
    []
  );

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      mouseX.current = event.clientX;
      mouseY.current = event.clientY;
    },
    []
  );

  const handlePointerUp = useCallback(() => {
    mouseX.current = -1000;
    mouseY.current = -1000;
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handlePointerUp}
      onTouchStartCapture={handleTouchStart}
      onTouchMoveCapture={handleTouchMove}
      onTouchEndCapture={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerMoveCapture={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{ touchAction: "manipulation" }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        {/* Soft yellow center background component */}
        <GlowBackground className="absolute inset-0 -z-10 !min-h-0 mix-blend-screen opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent/5 -z-10" />

        {/* Floating Icons */}
        {FLOATING_ICONS_CONFIG.map((item, index) => (
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
          {/* Center content */}
          <div className="lg:col-span-10 text-center lg:text-left relative">
            {/* Decorative elements around title - START HIDDEN */}
            <div
              ref={decorStarsRef}
              className="flex items-center justify-center lg:justify-start gap-3 mb-4 sm:mb-6 opacity-0"
              style={{ willChange: "opacity" }}
            >
              
            </div>

            {/* Main headline - START HIDDEN */}
            <h1
              ref={titleRef}
              className="mb-4 sm:mb-6 leading-tight opacity-0"
              style={{ willChange: "opacity, transform" }}
            >
              {/* Trusted Badge - START HIDDEN */}
              <div
                ref={badgeRef}
                className="relative inline-flex items-center gap-2 md:gap-3 mb-6 opacity-0 py-1 px-1 rounded-full overflow-hidden"
                style={{ willChange: "opacity, transform" }}
              >
                {/* Shimmering Background */}
                <div className="absolute inset-0 bg-white/5 border border-white/5 backdrop-blur-lg rounded-full" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg]"
                  animate={{
                    x: ["-150%", "150%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                <div className="relative flex -space-x-2">
                  {["Felix", "Luna", "Milo", "Zara"].map((seed, i) => (
                    <img
                      key={i}
                      src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}&size=64`}
                      alt="User avatar"
                      className="w-6 h-6 rounded-full object-cover border border-[#121212] bg-[#282828] relative"
                      style={{ zIndex: 4 - i }}
                    />
                  ))}
                </div>
                <p
                  className="relative text-foreground/80 md:text-left pr-1"
                  style={{
                    fontSize: "clamp(0.8rem, 2.2vw, 0.95rem)",
                    letterSpacing: "0.03em",
                  }}
                >
                  <span className="text-foreground font-semibold">
                    Trusted by
                  </span>{" "}
                  Businesses
                </p>
              </div>

              <div
                ref={logoRef}
                className="mb-4 opacity-0"
                style={{ willChange: "opacity, transform" }}
              >
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
                blurAmount={3.5}
                borderColor="rgba(74, 222, 128, 0.74)"
                glowColor="rgba(74, 222, 128, 0.74)"
                animationDuration={0.6}
                pauseBetweenAnimations={0.5}
                wordClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground"
              />
            </h1>

            {/* Subheadline - START HIDDEN */}
            <p
              ref={subheadlineRef}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/70 max-w-4xl mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed opacity-0"
              style={{ willChange: "opacity, transform" }}
            >
              "We don't just make <span className="text-foreground font-semibold ">products</span>, we craft <span className="text-foreground font-semibold">experiences</span> with unmatched
              <span className="text-foreground font-semibold"> quality.</span>"
            </p>

            {/* CTA Buttons - START HIDDEN */}
            <div
              ref={ctaRef}
              className="flex flex-row gap-3 items-center justify-center lg:justify-start mb-12 opacity-0"
              style={{ willChange: "opacity", perspective: "1000px" }}
            >
              <button
                onClick={() => {
                  const event = new CustomEvent("navigateToSection", {
                    detail: { sectionId: "contact" },
                  });
                  window.dispatchEvent(event);
                }}
                className="group relative bg-accent hover:bg-accent/90 text-white pl-1.5 pr-4 sm:pr-5 py-1.5 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 hover:scale-105 hover:-translate-y-1 active:scale-95 active:translate-y-0 flex items-center gap-2 sm:gap-2.5 overflow-hidden"
                style={{
                  boxShadow:
                    "0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                }}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none"
                  style={{
                    transform: "translateZ(1px)",
                    maskImage:
                      "linear-gradient(135deg, white 0%, transparent 60%)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full" />

                <div
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black flex items-center justify-center transition-transform duration-300 group-hover:rotate-180 relative overflow-hidden"
                  style={{
                    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50" />
                  <ArrowDown
                    className="w-4 h-4 sm:w-4 sm:h-4 text-accent relative z-10"
                    strokeWidth={2.5}
                  />
                </div>
                <span className="whitespace-nowrap text-black font-semibold relative z-10">
                  Start Project
                </span>
              </button>

              <button
                onClick={() => {
                  const event = new CustomEvent("navigateToSection", {
                    detail: { sectionId: "work" },
                  });
                  window.dispatchEvent(event);
                }}
                className="group relative bg-[#212121] hover:bg-[#252525]  text-white pl-2 sm: pr-4 sm: py-2 sm:py-2 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 hover:scale-[1.03] active:scale-95 flex items-center gap-2 sm:gap-2.5 overflow-hidden"
              >
                <div
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-accent flex items-center justify-center transition-transform duration-300 group-hover:scale-110 relative overflow-hidden"
                >
                  <Eye
                    className="w-4 h-4 sm:w-4 sm:h-4 text-black relative z-10"
                    strokeWidth={2}
                  />
                </div>
                <span className="whitespace-nowrap text-foreground font-semibold relative z-10">
                  View Our Work
                </span>
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
  );
};

export default memo(Hero);
