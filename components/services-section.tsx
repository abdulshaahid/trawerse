"use client";

import React, { useState, useCallback, useMemo, memo, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMousePosition } from "@/lib/mouse-context";
import {
  Palette,
  Code,
  Layers,
  Database,
  LayoutDashboard,
  Settings,
} from "lucide-react";

// Optimized Service Card with CSS-based animations
const Service = memo(({
  icon,
  name,
  description,
  delay = 0,
}: {
  icon: React.ReactNode;
  name: string;
  description: string;
  delay?: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { position: mousePos, isTouch } = useMousePosition('service-card');
  
  // Memoized device detection
  const isMobile = useMemo(() => 
    typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window), 
    []
  );

  // Optimized mouse tracking with CSS custom properties
  useEffect(() => {
    if (!cardRef.current || isMobile) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceThreshold = 200;
    const distance = Math.sqrt(
      Math.pow(mousePos.x - centerX, 2) + Math.pow(mousePos.y - centerY, 2)
    );
    
    if (distance < distanceThreshold && !isTouch) {
      const xPct = Math.max(-0.5, Math.min(0.5, (mousePos.x - centerX) / rect.width));
      const yPct = Math.max(-0.5, Math.min(0.5, (mousePos.y - centerY) / rect.height));
      
      // Use CSS custom properties instead of Framer Motion transforms
      card.style.setProperty('--mouse-x', `${xPct * 12}deg`);
      card.style.setProperty('--mouse-y', `${yPct * -12}deg`);
      card.style.setProperty('--translate-x', `${xPct * 8}px`);
      card.style.setProperty('--translate-y', `${yPct * 8}px`);
      setIsHovered(true);
    } else {
      card.style.setProperty('--mouse-x', '0deg');
      card.style.setProperty('--mouse-y', '0deg');
      card.style.setProperty('--translate-x', '0px');
      card.style.setProperty('--translate-y', '0px');
      setIsHovered(false);
    }
  }, [mousePos, isMobile, isTouch]);

  return (
    <motion.div
      ref={cardRef}
      initial={{
        opacity: 0,
        y: 60,
        scale: 0.85,
        rotateX: -15,
        filter: "blur(10px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        delay: delay / 1000,
        duration: 0.8,
        type: "spring",
        stiffness: 80,
        damping: 20,
        mass: 1,
      }}
      style={{
        transform: isMobile 
          ? 'none' 
          : 'rotateX(var(--mouse-y, 0deg)) rotateY(var(--mouse-x, 0deg))',
        transformStyle: "preserve-3d",
        willChange: 'transform',
        transition: 'transform 0.3s ease-out',
      }}
      className="group relative bg-[#121212] hover:bg-[#171717] space-y-4 rounded-2xl border border-[#1a1a1a] hover:border-white/5 p-4 transition-all duration-500 ease-out cursor-default"
    >
      {/* Icon layer - deepest */}
      <motion.div
        className="flex size-fit items-center justify-center relative z-10"
        style={{
          transform: "translateZ(60px) translateX(var(--translate-x, 0px)) translateY(var(--translate-y, 0px))",
          willChange: 'transform',
        }}
        animate={{
          rotate: isHovered ? 5 : 0,
          scale: isHovered ? 1.12 : 1,
        }}
        transition={{
          duration: 0.5,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      >
        {icon}
      </motion.div>

      {/* Text layer - middle */}
      <motion.div
        className="space-y-1 relative z-20"
        style={{
          transform: "translateZ(40px)",
          willChange: 'transform',
        }}
      >
        <h3 className="text-sm font-medium transition-all duration-500 ease-out group-hover:text-white group-hover:tracking-wide">
          {name}
        </h3>
        <p className="text-muted-foreground line-clamp-2 text-sm transition-colors duration-500 ease-out group-hover:text-gray-300">
          {description}
        </p>
      </motion.div>
    </motion.div>
  );
});

Service.displayName = 'Service';

// Main Exported Component
const ServicesSection = () => {
  return (
    <section id="services">
      <div className="pt-12 pb-12 md:pt-32 md:pb-16">
        <div className="mx-auto flex flex-col px-6 md:grid md:max-w-5xl md:grid-cols-2 md:gap-12">
          {/* Heading for mobile - shows above service boxes */}
          <motion.h2
            className="block md:hidden text-center text-white/90 text-balance text-4xl font-semibold leading-tight mb-8"
            initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              delay: 0.1,
              duration: 0.7,
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
          >
            Our <span className="text-accent">Premium</span> Services
          </motion.h2>

          <motion.div
            className="order-last mt-12 flex flex-col justify-between md:order-first md:mt-0"
            initial={{ opacity: 0, x: -60, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.9,
              type: "spring",
              stiffness: 70,
              damping: 22,
            }}
          >
            <div className="space-y-6">
              {/* Heading for desktop - hidden on mobile */}
              <motion.h2
                className="hidden md:block text-white/90 text-balance text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl"
                initial={{
                  opacity: 0,
                  y: 30,
                  scale: 0.95,
                  filter: "blur(8px)",
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{
                  delay: 0.15,
                  duration: 0.7,
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
              >
                Our <span className="text-accent">Premium</span> Services
              </motion.h2>

              <motion.p
                className="text-muted-foreground text-base md:text-lg max-w-xl"
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{
                  delay: 0.25,
                  duration: 0.65,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                Connect seamlessly with{" "}
                <span className="text-accent font-semibold">cutting-edge</span>{" "}
                web technologies and services to{" "}
                <span className="text-accent font-semibold">elevate</span> your
                digital presence.
              </motion.p>

              <motion.div
                className="grid grid-cols-[auto_1fr] items-start gap-4 pt-2"
                initial={{
                  opacity: 0,
                  y: 20,
                  scale: 0.95,
                  filter: "blur(6px)",
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{
                  delay: 0.35,
                  duration: 0.65,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <div className="bg-background flex aspect-square size-16 items-center justify-center rounded-lg border">
                  <Code className="size-9" />
                </div>
                <blockquote className="text-sm">
                  <p className="italic">
                    "Trawerse delivers exceptional web solutions with
                    cutting-edge technology and unmatched attention to detail."
                  </p>
                  <div className="mt-2 flex gap-2">
                    <cite className="font-semibold not-italic">Trawerse</cite>
                    <p className="text-muted-foreground">
                      Premium Web Development
                    </p>
                  </div>
                </blockquote>
              </motion.div>
            </div>
          </motion.div>

          <div
            className="-mx-6 px-6 sm:mx-auto sm:max-w-md md:-mx-6 md:ml-auto md:mr-0 overflow-visible"
            style={{
              perspective: "1200px",
              WebkitMaskImage:
                'radial-gradient(ellipse 100% 100% at 50% 0%, #000 70%, transparent 100%)',
              maskImage:
                'radial-gradient(ellipse 100% 100% at 50% 0%, #000 70%, transparent 100%)',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: 60, rotateY: -20 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 70,
                damping: 22,
              }}
              style={{ willChange: 'transform', transformOrigin: 'center center', transformStyle: 'preserve-3d' }}
            >
              <motion.div
                className="bg-[#0d0d0d] rounded-3xl border border-white/5 p-3 shadow-lg md:pb-12 overflow-visible"
                initial={{ scale: 0.88, rotateX: 8 }}
                whileInView={{ scale: 1, rotateX: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  delay: 0.2,
                  duration: 0.9,
                  type: "spring",
                  stiffness: 80,
                  damping: 22,
                }}
              >
              <div className="grid grid-cols-2 gap-2 overflow-visible">
                <Service
                  icon={<Palette className="size-9" />}
                  name="Web Design & Development"
                  description="Custom websites built with modern technologies and best practices."
                  delay={100}
                />
                <Service
                  icon={<Layers className="size-9" />}
                  name="UI/UX Design"
                  description="Intuitive user experiences that delight and convert."
                  delay={180}
                />
                <Service
                  icon={<Code className="size-9" />}
                  name="Web Applications"
                  description="Scalable web apps built with cutting-edge frameworks."
                  delay={260}
                />
                <Service
                  icon={<Database className="size-9" />}
                  name="CRM & Systems"
                  description="Custom CRM and enterprise solutions for your business."
                  delay={340}
                />
                <Service
                  icon={<LayoutDashboard className="size-9" />}
                  name="Dashboards"
                  description="Data-driven dashboards with real-time insights."
                  delay={420}
                />
                <Service
                  icon={<Settings className="size-9" />}
                  name="Hosting & Maintenance"
                  description="Reliable hosting with ongoing support and maintenance."
                  delay={500}
                />
              </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(ServicesSection)
