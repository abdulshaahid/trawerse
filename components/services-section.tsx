"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Palette,
  Code,
  Layers,
  Database,
  LayoutDashboard,
  Settings,
} from "lucide-react";

// Service Card Sub-Component with Multi-Layer 3D Illusion
const Service = ({
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

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 30, mass: 0.5 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 30, mass: 0.5 });

  // Enhanced 3D rotation with smoother angles
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  // Multi-layer parallax movement
  const iconX = useTransform(mouseXSpring, [-0.5, 0.5], [-8, 8]);
  const iconY = useTransform(mouseYSpring, [-0.5, 0.5], [-8, 8]);
  const textX = useTransform(mouseXSpring, [-0.5, 0.5], [-4, 4]);
  const textY = useTransform(mouseYSpring, [-0.5, 0.5], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: -20, right: 20 }}
      dragElastic={0.2}
      dragSnapToOrigin
      dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
      dragDirectionLock
      whileDrag={{
        scale: 1.05,
        cursor: "grabbing",
        zIndex: 50,
        rotateZ: 1,
        boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.15)",
      }}
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
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative bg-[#121212] hover:bg-[#171717] space-y-4 rounded-2xl border border-[#1a1a1a] hover:border-white/5 p-4 transition-all duration-500 ease-out cursor-grab"
    >
      {/* Icon layer - deepest */}
      <motion.div
        className="flex size-fit items-center justify-center relative z-10"
        style={{
          transform: "translateZ(60px)",
          x: iconX,
          y: iconY,
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
          x: textX,
          y: textY,
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
};

// Main Exported Component
export default function ServicesSection() {
  return (
    <section>
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

          <motion.div
            className="-mx-6 px-6 [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_70%,transparent_100%)] sm:mx-auto sm:max-w-md md:-mx-6 md:ml-auto md:mr-0 overflow-visible"
            initial={{ opacity: 0, x: 60, rotateY: -20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 70,
              damping: 22,
            }}
            style={{ perspective: "1200px" }}
          >
            <motion.div
              className="bg-[#0d0d0d] rounded-3xl border border-white/5 p-3 shadow-lg md:pb-12 overflow-visible"
              initial={{ scale: 0.88, rotateX: 8, filter: "blur(8px)" }}
              whileInView={{ scale: 1, rotateX: 0, filter: "blur(0px)" }}
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
    </section>
  );
}
