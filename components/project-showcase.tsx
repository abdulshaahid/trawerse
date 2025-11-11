"use client";

import { useMemo, useState, useEffect, memo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ExternalLink, Github, Link2, Sun, Copy, Zap, Plus, ShoppingCart, BarChart3, Smartphone, Sparkles, Rocket, Palette, ChevronDown, ChevronUp, X, User, Stethoscope, Clock } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  clientName: string;
  image: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  statusText: string;
  statusColor: string;
  glowText: string;
  icon: React.ComponentType<{ className?: string }> | string;
  iconColor: string;
  iconBgColor: string;
}

const projects: Project[] = [
  {
  id: "1",
  title: "Trawayl - Travel Package Marketplace",
  category: "Tech-travel",
  clientName: "Owned by Trawerse",
  image: "/assets/projects/trawayl.png",
  description:
    "Trawayl is a full-fledged travel package marketplace designed to connect travelers with verified local tour providers.",
  technologies: [
    "React",
    "Django",
    "PostgreSQL",
    "Docker",
    "AWS EC2",
    "Tailwind CSS"
  ],
  liveUrl: "https://trawayl.com",
  githubUrl: "Private Repository",
  statusText: "Live & Running",
  statusColor: "bg-lime-500",
  glowText: "Empowering travelers",
  icon: "https://trawayl.com/assets/trpd-C6HNp4ZR.svg",
  iconColor: "text-emerald-400",
  iconBgColor: "",
}
,
  {
  id: "2",
  title: "Cliper.click - Cross-Platform Clipboard & File Sharing",
  category: "Product by Trawerse",
  clientName: "Owned by Trawerse",
  image: "/assets/projects/cliper.png",
  description:
    "Cliper.click is a seamless cross-platform tool that lets users instantly share text, files, and clipboard content between devices using unique codes or QR links.",
  technologies: [
    "React",
    "Django",
    "PostgreSQL",
    "Docker",
    "CronJob",
    "Tailwind CSS"
  ],
  liveUrl: "https://cliper.click",
  githubUrl: "Private Repository",
  statusText: "Live & Running",
  statusColor: "bg-lime-500",
  glowText: "Connecting devices with a single click",
  icon: Link2,
  iconColor: "text-amber-400",
  iconBgColor: "bg-amber-500/20",
}
,
{
  id: "3",
  title: "Flotilla - EPC ",
  category: "Landing Page",
  clientName: "Flotilla Electro Mechanical EPC",
  image: "/assets/projects/flotilla.png",
  description:
    "A high-end landing page built for Flotilla, an Electro Mechanical EPC company based in the UAE",
  technologies: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion"
  ],
  liveUrl: "https://flotilla.ae",
  githubUrl: "Private Repository",
  statusText: "Live & Running",
  statusColor: "bg-lime-500",
  glowText: "Crafted for a bold engineering presence",
  icon: "https://flotilla.ae/flotilla.svg",
  iconColor: "",
  iconBgColor: "",
},
    {
  id: "4",
  title: "Avoid Sun - Location-Based Travel Comfort App",
  category: "Web Application",
  clientName: "Owned by Trawerse",
  image: "/assets/projects/sun.png",
  description:
    "Avoid Sun is a smart travel utility that helps users identify the sun-exposed side of their route based on live geolocation and direction data. ",
  technologies: [
    "Next.js",
    "Tailwind CSS",
    "Leaflet.js",
    "Geolocation API",
    "Framer Motion"
  ],
  liveUrl: "https://avoid-sun.vercel.app/",
  githubUrl: "Private Repository",
  statusText: "Live Prototype",
  statusColor: "bg-sky-500",
  glowText: "Helping travelers stay cool on the go",
  icon: Sun,
  iconColor: "text-orange-400",
  iconBgColor: "bg-orange-500/20",
},
{
  id: "5",
  title: "Stain - VS Code Productivity Extension",
  category: "VS Code Extension",
  clientName: "Owned by Trawerse",
  image: "/assets/projects/stain.png",
  description:
    "When working with large code files, it's easy to lose track of where you were.",
  technologies: [
    "TypeScript",
    "VS Code API",
    "Node.js"
  ],
  liveUrl: "https://marketplace.visualstudio.com/items?itemName=muhammedrashid.stain",
  githubUrl: "Private Repository",
  statusText: "Live on VS Code Marketplace",
  statusColor: "bg-lime-500",
  glowText: "Helping developers stay focused",
  icon: '/assets/projects/stainicon.png',
  iconColor: "text-violet-400",
  iconBgColor: "",
},
{
  id: "6",
  title: "Abdul Shaahid - Personal Portfolio",
  category: "Personal Website",
  clientName: "Owned by Abdul Shaahid",
  image: "/assets/projects/shah.png",
  description:
    "A sleek and minimal personal portfolio.",
  technologies: [
    "Next.js",
    "Tailwind CSS",
    "Framer Motion",
    "Vercel"
  ],
  liveUrl: "https://abdulshaahid.vercel.app",
  githubUrl: "Private Repository",
  statusText: "Live & Updated",
  statusColor: "bg-lime-500",
  glowText: "craftsmanship and code in harmony",
  icon: User,
  iconColor: "text-cyan-400",
  iconBgColor: "bg-cyan-500/20",
},
{
  id: "7",
  title: "Doctime - Online Doctor Consultation Platform",
  category: "Web Application",
  clientName: "Owned by Trawerse",
  image: "/assets/projects/doct.png",
  description:
    "Doctime is an innovative online platform transforming healthcare by connecting doctors and patients through seamless digital interaction.",
  technologies: [
    "React",
    "Django REST Framework",
    "PostgreSQL",
    "WebRTC",
    "Tailwind CSS"
  ],
  liveUrl: "https://doctime.trawerse.com",
  githubUrl: "Private Repository",
  statusText: "In Development",
  statusColor: "bg-yellow-500",
  glowText: "Reimagining healthcare through technology",
  icon: Stethoscope,
  iconColor: "text-rose-400",
  iconBgColor: "bg-rose-500/20",
},
{
  id: "8",
  title: "TimeMachine - Watch E-Commerce Platform",
  category: "E-Commerce",
  clientName: "Owned by Trawerse",
  image: "/assets/projects/time.png",
  description:
    "TimeMachine is a specialized e-commerce platform built for watch enthusiasts, featuring a clean interface, detailed product pages, coupon systems, digital wallet, and integrated multi-payment options.",
  technologies: [
    "Django",
    "Python",
    "PostgreSQL",
    "HTML",
    "CSS",
    "JavaScript"
  ],
  liveUrl: "https://timemachine.trawerse.com",
  githubUrl: "Private Repository",
  statusText: "In Development",
  statusColor: "bg-yellow-500",
  glowText: "Precision meets performance",
  icon: Clock,
  iconColor: "text-amber-400",
  iconBgColor: "bg-amber-500/20",
}

];

const MinimalProjectCard = memo(({ project, onClick }: { project: Project; onClick: () => void }) => {
  const timeText = useMemo(() => {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, "0");
    const hour12 = ((h + 11) % 12) + 1;
    const ampm = h >= 12 ? "PM" : "AM";
    return `${hour12}:${m}${ampm}`;
  }, []);

  return (
    <motion.div
      whileHover="hover"
      className="relative w-full cursor-pointer will-change-transform"
      onClick={onClick}
      initial="initial"
      animate="initial"
    >
      {/* Under Card - layered behind */}
      <motion.div 
        className="pointer-events-none absolute inset-x-0 top-[72%] -bottom-10 rounded-[28px] bg-accent/90 z-0"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        variants={{
          initial: { y: 0 },
          hover: { 
            y: 4,
            transition: { duration: 0.3, ease: "easeOut" }
          }
        }}
      >
        <motion.div 
          className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-2 text-center text-sm font-medium text-black"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Zap className="h-4 w-4" /> {project.glowText}
        </motion.div>
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        variants={{
          initial: { y: 0 },
          hover: { 
            y: -8,
            transition: { duration: 0.3, ease: "easeOut" }
          }
        }}
      >
        <Card className="relative z-10 mx-auto w-full h-[240px] flex flex-col rounded-[28px] border-0 bg-[radial-gradient(120%_120%_at_30%_10%,#1a1a1a_0%,#0f0f10_60%,#0b0b0c_100%)] text-white shadow-[0_8px_16px_-4px_rgba(0,0,0,0.4)]" style={{ overflow: 'visible' }}>
          {(project.id === "1" || project.id === "2") && (
            <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden z-20">
              {/* Ribbon */}
              <div className="absolute top-3 right-[-32px] w-32 text-center rotate-45 bg-accent shadow-lg">
                <span className="text-black ml-2 text-[9px] font-extrabold tracking-wider py-1.5 block">OUR PRODUCT</span>
              </div>
              {/* Shadow underneath */}
              <div className="absolute top-3 right-[-32px] w-32 rotate-45 bg-black/20 blur-sm" style={{ height: '26px' }}></div>
            </div>
          )}
        <CardContent className="p-5 sm:p-5 pt-4 sm:pt-4 flex flex-col justify-between h-full" style={{ overflow: 'visible' }}>
          <motion.div 
            className="flex-1 flex flex-col"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            {/* Status Bar */}
            <motion.div 
              className="mb-3 flex items-center justify-between text-sm text-neutral-300"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <div className="flex items-center gap-2">
                <span className={cn("inline-block h-2.5 w-2.5 rounded-full animate-pulse", project.statusColor)} />
                <span className="select-none">{project.statusText}</span>
              </div>
              
            </motion.div>

            {/* Icon and Info */}
            <motion.div 
              className="flex flex-wrap items-center gap-4 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.div
                className={cn("relative h-14 w-14 shrink-0 rounded-full  flex items-center justify-center", project.iconBgColor)}
                animate={{
                  rotate: [0, 8, -8, 0],
                  scale: [1, 1.05, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.15, rotate: 180 }}
              >
                {typeof project.icon === 'string' ? (
                  <img src={project.icon} alt="" className={cn("h-10 w-10", project.iconColor)} />
                ) : (
                  <project.icon className={cn("h-7 w-7", project.iconColor)} />
                )}
              </motion.div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-lg font-semibold tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-0.5 text-sm text-neutral-400">{project.category}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Buttons */}
          <motion.div 
            className="grid grid-cols-2 gap-3 mt-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="secondary"
                className="h-11 w-full justify-start gap-2 rounded-2xl bg-white/10 text-white hover:bg-white/15 text-sm transition-all"
              >
                <Plus className="h-4 w-4" /> View
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="secondary"
                className="h-11 w-full justify-start gap-2 rounded-2xl bg-white/10 text-white hover:bg-white/15 text-sm transition-all"
              >
                <Copy className="h-4 w-4" /> Details
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
      </motion.div>
    </motion.div>
  );
});

MinimalProjectCard.displayName = 'MinimalProjectCard';

function ProjectModal({ project, isOpen, onClose }: { project: Project; isOpen: boolean; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const timeText = useMemo(() => {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, "0");
    const hour12 = ((h + 11) % 12) + 1;
    const ampm = h >= 12 ? "PM" : "AM";
    return `${hour12}:${m}${ampm}`;
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(project.title);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} className="max-w-[95vw] sm:max-w-[85vw] lg:max-w-5xl xl:max-w-6xl max-h-[90vh] overflow-y-auto border-0 bg-transparent p-4 sm:p-6">
        <DialogTitle className="sr-only">{project.title}</DialogTitle>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ 
            duration: 0.5, 
            ease: [0.34, 1.56, 0.64, 1],
            type: "spring",
            stiffness: 150,
            damping: 20
          }}
        >
          <Card className="relative mx-auto w-full rounded-[28px] border-0 bg-[radial-gradient(ellipse_at_top_left,#1e1e1e_0%,#151515_50%,#0f0f0f_100%)] text-white shadow-2xl" style={{ overflow: 'visible' }}>
            {(project.id === "1" || project.id === "2") && (
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 overflow-hidden z-20"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.6, duration: 0.5, type: "spring", stiffness: 150 }}
              >
                {/* Ribbon */}
                <div className="absolute top-4 right-[-38px] w-40 text-center rotate-45 bg-accent shadow-xl">
                  <span className="text-black ml-3 text-[11px] font-extrabold tracking-wider py-2 block">OUR PRODUCT</span>
                </div>
                {/* Shadow underneath */}
                <div className="absolute top-4 right-[-38px] w-40 rotate-45 bg-black/20 blur-sm" style={{ height: '32px' }}></div>
              </motion.div>
            )}
            <CardContent className="px-4 py-1 sm:px-6 py-1" style={{ overflow: 'visible' }}>
              {/* Grid Layout: Image and Content */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
                {/* Image - 3D Interactive */}
                <div className="lg:col-span-2" style={{ perspective: "1000px" }}>
                  <motion.div
                    className="relative w-full aspect-[4/3] rounded-xl overflow-hidden cursor-grab active:cursor-grabbing"
                    initial={{ opacity: 0, x: -30, rotateY: -15 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ delay: 0.1, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    dragElastic={0.1}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => {
                      setIsHovering(false);
                      setMousePosition({ x: 0.5, y: 0.5 });
                    }}
                    style={{
                      rotateY: isHovering ? (mousePosition.x - 0.5) * 20 : 0,
                      rotateX: isHovering ? (mousePosition.y - 0.5) * -20 : 0,
                      transformStyle: "preserve-3d",
                      border: "none",
                      outline: "none",
                    }}
                  >
                    {/* Image */}
                    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(74,222,128,0.3)]" style={{ border: "none", outline: "none" }}>
                      <Image 
                        src={project.image} 
                        alt={project.title} 
                        fill 
                        sizes="(max-width: 1024px) 100vw, 400px" 
                        className="object-cover"
                        style={{ transform: "translateZ(20px)", border: "none", outline: "none" }}
                      />
                      
                      {/* Shine effect on hover */}
                      {isHovering && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"
                          style={{
                            left: `${mousePosition.x * 100}%`,
                            top: `${mousePosition.y * 100}%`,
                            transform: "translate(-50%, -50%)",
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                      
                      {/* Icon in top left corner */}
                      <motion.div
                        className={cn("absolute top-3 left-3 h-12 w-12 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm", project.iconBgColor || "bg-white/10")}
                        initial={{ opacity: 0, scale: 0.5, rotate: 180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3, duration: 0.5, type: "spring", stiffness: 200 }}
                      >
                        {typeof project.icon === 'string' ? (
                          <img src={project.icon} alt="" className="h-9 w-9" />
                        ) : (
                          <project.icon className={cn("h-6 w-6", project.iconColor)} />
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <motion.div 
                  className="lg:col-span-3 flex flex-col"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {/* Title */}
                  <motion.h3 
                    className="text-xl sm:text-2xl font-bold tracking-tight mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    {project.title}
                  </motion.h3>
                  
                  {/* Category and Client */}
                  <motion.div 
                    className="flex flex-wrap items-center gap-2 mb-3 text-xs sm:text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                  >
                    <span className="px-2 py-0.5 bg-accent/20 text-accent rounded-full font-medium border border-accent/30">
                      {project.category}
                    </span>
                    <span className="text-neutral-400">• {project.clientName}</span>
                  </motion.div>

                  {/* Description */}
                  <motion.p 
                    className="text-neutral-300 text-sm leading-relaxed mb-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                  >
                    {project.description}
                  </motion.p>

                  {/* Status and Time */}
                  <motion.div 
                    className="flex items-center gap-4 text-xs text-neutral-400 mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className={cn("inline-block h-2 w-2 rounded-full animate-pulse", project.statusColor)} />
                      <span>{project.statusText}</span>
                    </div>
                   
                  </motion.div>

                  {/* Technologies */}
                  <motion.div 
                    className="mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                  >
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, i) => (
                        <motion.span 
                          key={i} 
                          className="px-2 py-1 bg-white/10 text-white rounded-md text-xs font-medium hover:bg-white/20 transition-colors"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7 + (i * 0.05), duration: 0.3 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div 
                    className="flex flex-wrap gap-2 mt-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                  >
                    {project.liveUrl && (
                      <motion.div
                        className="flex-1 min-w-[100px]"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.85, duration: 0.3, type: "spring", stiffness: 200 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button 
                          variant="secondary" 
                          size="sm"
                          className="w-full gap-2 rounded-xl bg-accent text-black hover:bg-accent/90 font-semibold transition-all" 
                          asChild
                        >
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3" /> Live
                          </a>
                        </Button>
                      </motion.div>
                    )}
                    <motion.div
                      className="flex-1 min-w-[100px]"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9, duration: 0.3, type: "spring", stiffness: 200 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        variant="secondary" 
                        size="sm"
                        className="w-full gap-2 rounded-xl bg-white/10 text-white hover:bg-white/15 transition-all" 
                        onClick={onClose}
                      >
                        <X className="h-3 w-3" /> Close
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

export default function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const limit = isMobile ? 3 : 6;
  const visibleProjects = showAll 
    ? projects 
    : projects.slice(0, limit);
  // Show button if there are more than 3 projects (mobile limit) to handle SSR properly
  const hasMore = projects.length > 3;

  // Memoize card click handler
  const handleCardClick = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  // Handle toggle with scroll preservation
  const handleToggle = useCallback(() => {
    if (showAll && sectionRef.current) {
      // Store current position relative to section
      const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
      setShowAll(false);
      // Restore scroll position after state update
      requestAnimationFrame(() => {
        window.scrollTo({ top: sectionTop - 100, behavior: 'smooth' });
      });
    } else {
      setShowAll(true);
    }
  }, [showAll]);

  // Memoize static cards to prevent re-render
  const staticCards = useMemo(() => {
    return projects.slice(0, limit).map((project) => (
      <div key={`static-${project.id}`}>
        <MinimalProjectCard project={project} onClick={() => handleCardClick(project)} />
      </div>
    ));
  }, [limit, handleCardClick]); // Only re-render if limit changes (screen size change)

  return (
    <motion.section 
      id="work"
      ref={sectionRef}
      className="relative pt-18 pb-28 md:pt-40 md:pb-32 overflow-hidden"
      initial={{ opacity: 0, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="absolute inset-0 -z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          viewport={{ once: true }} 
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" 
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          viewport={{ once: true }} 
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" 
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-16 space-y-4">
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold overflow-hidden"
            initial={{ opacity: 0, x: -100, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ 
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.2
            }}
          >
            <span className="bg-gradient-to-b from-gray-200 via-white to-gray-300 bg-clip-text text-transparent">
              Our{" "}
            </span>
            <span className="text-accent">
              Projects
            </span>
          </motion.h2>
          <motion.p 
            className="text-white/70 text-lg md:text-xl max-w-2xl"
            initial={{ opacity: 0, x: -80, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ 
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.4
            }}
          >
            Explore our portfolio of exceptional digital experiences
          </motion.p>
        </div>
        <div className="relative pb-16">
          <div 
            className={cn(
              "grid grid-cols-1 md:pt-2 md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-15 md:gap-y-18 will-change-contents",
              !showAll && "[mask-image:linear-gradient(to_bottom,#000_75%,transparent_100%)]"
            )}
          >
            {/* Always visible cards - memoized to prevent re-renders */}
            {staticCards}
            
            {/* Conditionally shown cards with animation */}
            <AnimatePresence initial={false} mode="popLayout">
              {showAll && projects.slice(limit).map((project, index) => (
                <motion.div
                  key={`dynamic-${project.id}`}
                  layout="position"
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: 1
                  }}
                  exit={{ 
                    opacity: 0, 
                    y: -20,
                    scale: 0.95
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                    ease: [0.4, 0, 0.2, 1],
                    layout: { duration: 0.3 }
                  }}
                  className="will-change-transform"
                >
                  <MinimalProjectCard project={project} onClick={() => handleCardClick(project)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Show More/Less Button */}
          {hasMore && (
            <motion.div 
              className={cn(
                "absolute left-1/2 -translate-x-1/2 translate-y-1/2 z-20",
                showAll && "mt-20"
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.button
                key={showAll ? "less" : "more"}
                onClick={handleToggle}
                className="text-white/80 font-semibold flex items-center gap-2 will-change-transform"
                whileHover={{ scale: 1.05, y: showAll ? 2 : -2 }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  y: showAll ? [0, -6, 0] : [0, 6, 0],
                  opacity: 1,
                  scale: 1
                }}
                transition={{ 
                  y: { duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatType: "loop" },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 }
                }}
                initial={{ opacity: 0, scale: 0.8 }}
              >
                {showAll ? (
                  <>
                    <span className="text-sm uppercase tracking-wider">Show Less</span>
                    <ChevronUp className="h-5 w-5" strokeWidth={2.5} />
                  </>
                ) : (
                  <>
                    <span className="text-sm uppercase tracking-wider">Show More</span>
                    <ChevronDown className="h-5 w-5" strokeWidth={2.5} />
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
      {selectedProject && <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />}
    </motion.section>
  );
}
