'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Palette,
  Code,
  Layers,
  Database,
  LayoutDashboard,
  Settings,
} from 'lucide-react';

// Service Card Sub-Component with Multi-Layer 3D Illusion
const Service = ({ icon, name, description, delay = 0 }: { icon: React.ReactNode; name: string; description: string; delay?: number }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
    
    // Enhanced 3D rotation with larger angles
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17deg", "-17deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17deg", "17deg"]);
    
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
                cursor: 'grabbing', 
                zIndex: 50,
                rotateZ: 1,
                boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.15)"
            }}
            initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
                delay: delay / 1000,
                duration: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 15
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="group relative bg-[#121212] hover:bg-[#171717] space-y-4 rounded-2xl border border-[#1a1a1a] hover:border-white/5 p-4 transition-colors duration-300 cursor-grab"
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
                    rotate: isHovered ? [0, -8, 8, -8, 0] : 0,
                    scale: isHovered ? 1.15 : 1
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
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
                <h3 className="text-sm font-medium transition-all duration-300 group-hover:text-white group-hover:tracking-wide">
                    {name}
                </h3>
                <p className="text-muted-foreground line-clamp-2 text-sm transition-colors duration-300 group-hover:text-gray-300">
                    {description}
                </p>
            </motion.div>
        </motion.div>
    )
}

// Main Exported Component
export default function ServicesSection() {
    return (
        <section>
            <div className="py-24 md:py-32">
                <div className="mx-auto flex flex-col px-6 md:grid md:max-w-5xl md:grid-cols-2 md:gap-12">
                    {/* Heading for mobile - shows above service boxes */}
                    <motion.h2 
                        className="block md:hidden text-balance text-4xl font-semibold leading-tight mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        Our{" "}
                        <span className="text-accent">
                            Premium
                        </span>{" "}
                        Services
                    </motion.h2>

                    <motion.div 
                        className="order-last mt-12 flex flex-col justify-between md:order-first md:mt-0"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="space-y-6">
                            {/* Heading for desktop - hidden on mobile */}
                            <motion.h2 
                                className="hidden md:block text-balance text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                Our{" "}
                                <span className="text-accent">
                                    Premium
                                </span>{" "}
                                Services
                            </motion.h2>
                            
                            <motion.p 
                                className="text-muted-foreground text-base md:text-lg max-w-xl"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                            >
                                Connect seamlessly with <span className="text-accent font-semibold">cutting-edge</span> web technologies and services to <span className="text-accent font-semibold">elevate</span> your digital presence.
                            </motion.p>
                        
                            <motion.div 
                                className="grid grid-cols-[auto_1fr] items-start gap-4 pt-2"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                            >
                            <div className="bg-background flex aspect-square size-16 items-center justify-center rounded-lg border">
                                <Code className="size-9" />
                            </div>
                            <blockquote className="text-sm">
                                <p className="italic">"Trawerse delivers exceptional web solutions with cutting-edge technology and unmatched attention to detail."</p>
                                <div className="mt-2 flex gap-2">
                                    <cite className="font-semibold not-italic">Trawerse</cite>
                                    <p className="text-muted-foreground">Premium Web Development</p>
                                </div>
                            </blockquote>
                        </motion.div>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="-mx-6 px-6 [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_70%,transparent_100%)] sm:mx-auto sm:max-w-md md:-mx-6 md:ml-auto md:mr-0 overflow-visible"
                        initial={{ opacity: 0, x: 50, rotateY: -15 }}
                        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{ perspective: "1000px" }}
                    >
                        <motion.div 
                            className="bg-[#0d0d0d] rounded-3xl border border-white/5 p-3 shadow-lg md:pb-12 overflow-visible"
                            initial={{ scale: 0.9 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
                        >
                            <div className="grid grid-cols-2 gap-2 overflow-visible">
                                <Service
                                    icon={<Palette className="size-9" />}
                                    name="Web Design & Development"
                                    description="Custom websites built with modern technologies and best practices."
                                    delay={0}
                                />
                                <Service
                                    icon={<Layers className="size-9" />}
                                    name="UI/UX Design"
                                    description="Intuitive user experiences that delight and convert."
                                    delay={100}
                                />
                                <Service
                                    icon={<Code className="size-9" />}
                                    name="Web Applications"
                                    description="Scalable web apps built with cutting-edge frameworks."
                                    delay={200}
                                />
                                <Service
                                    icon={<Database className="size-9" />}
                                    name="CRM & Systems"
                                    description="Custom CRM and enterprise solutions for your business."
                                    delay={300}
                                />
                                <Service
                                    icon={<LayoutDashboard className="size-9" />}
                                    name="Dashboards"
                                    description="Data-driven dashboards with real-time insights."
                                    delay={400}
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
    )
}
