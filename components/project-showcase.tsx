"use client";

import { useMemo, useState, useEffect, memo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ExternalLink, Github, Clock, Copy, Zap, Plus, ShoppingCart, BarChart3, Smartphone, Sparkles, Rocket, Palette, ChevronDown, ChevronUp } from "lucide-react";

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
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBgColor: string;
}

const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    category: "Web Development",
    clientName: "RetailCo Inc.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=800&fit=crop",
    description: "A full-featured e-commerce platform with product catalog, shopping cart, secure checkout, and admin dashboard.",
    technologies: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    statusText: "Live & Running",
    statusColor: "bg-lime-500",
    glowText: "Serving 10K+ customers daily",
    icon: ShoppingCart,
    iconColor: "text-emerald-400",
    iconBgColor: "bg-emerald-500/20",
  },
  {
    id: "2",
    title: "SaaS Dashboard",
    category: "UI/UX Design",
    clientName: "DataFlow Labs",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
    description: "Analytics dashboard featuring real-time data visualization, customizable widgets, and advanced reporting.",
    technologies: ["React", "D3.js", "Node.js", "PostgreSQL"],
    liveUrl: "https://example.com",
    statusText: "In Production",
    statusColor: "bg-green-500",
    glowText: "Processing 1M+ data points daily",
    icon: BarChart3,
    iconColor: "text-blue-400",
    iconBgColor: "bg-blue-500/20",
  },
  {
    id: "3",
    title: "Mobile Banking App",
    category: "Mobile Development",
    clientName: "SecureBank",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop",
    description: "Secure banking application with account management, fund transfers, bill payments, and transaction history.",
    technologies: ["React Native", "Firebase", "Redux", "Biometrics"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    statusText: "Active",
    statusColor: "bg-blue-500",
    glowText: "100K+ downloads",
    icon: Smartphone,
    iconColor: "text-cyan-400",
    iconBgColor: "bg-cyan-500/20",
  },
  {
    id: "4",
    title: "AI Content Generator",
    category: "AI & Machine Learning",
    clientName: "ContentAI Corp",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop",
    description: "AI-powered platform for blog posts, social media content, email templates, and SEO optimization.",
    technologies: ["Python", "OpenAI", "FastAPI", "React"],
    liveUrl: "https://example.com",
    statusText: "Scaling",
    statusColor: "bg-purple-500",
    glowText: "5K+ content pieces generated",
    icon: Sparkles,
    iconColor: "text-purple-400",
    iconBgColor: "bg-purple-500/20",
  },
  {
    id: "5",
    title: "Fitness Tracking App",
    category: "Health & Fitness",
    clientName: "FitLife Pro",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=800&fit=crop",
    description: "Comprehensive fitness tracking with workout logging, nutrition tracking, progress analytics.",
    technologies: ["Flutter", "Firebase", "HealthKit", "Charts"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    statusText: "Growing",
    statusColor: "bg-orange-500",
    glowText: "50K+ active users",
    icon: Rocket,
    iconColor: "text-orange-400",
    iconBgColor: "bg-orange-500/20",
  },
  {
    id: "6",
    title: "Real Estate Platform",
    category: "Web Development",
    clientName: "HomeFinder",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop",
    description: "Modern platform with property listings, virtual tours, mortgage calculators, and agent management.",
    technologies: ["Next.js", "MongoDB", "Mapbox", "Cloudinary"],
    liveUrl: "https://example.com",
    statusText: "Launched",
    statusColor: "bg-cyan-500",
    glowText: "2K+ properties listed",
    icon: Palette,
    iconColor: "text-pink-400",
    iconBgColor: "bg-pink-500/20",
  },
  {
    id: "7",
    title: "AI Content Generator",
    category: "SaaS Platform",
    clientName: "ContentAI",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop",
    description: "AI-powered content generation tool with templates, SEO optimization, and multi-language support.",
    technologies: ["Vue.js", "Python", "OpenAI", "Redis"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    statusText: "Beta",
    statusColor: "bg-purple-500",
    glowText: "1M+ words generated",
    icon: Sparkles,
    iconColor: "text-purple-400",
    iconBgColor: "bg-purple-500/20",
  },
  {
    id: "8",
    title: "Restaurant Booking System",
    category: "Web Application",
    clientName: "DineEasy",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop",
    description: "Complete restaurant management with online reservations, table management, and customer reviews.",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
    liveUrl: "https://example.com",
    statusText: "Active",
    statusColor: "bg-green-500",
    glowText: "500+ restaurants",
    icon: ShoppingCart,
    iconColor: "text-green-400",
    iconBgColor: "bg-green-500/20",
  },
  {
    id: "9",
    title: "Crypto Trading Dashboard",
    category: "FinTech",
    clientName: "CryptoVault",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&h=800&fit=crop",
    description: "Real-time cryptocurrency trading platform with advanced charts, portfolio tracking, and price alerts.",
    technologies: ["Next.js", "GraphQL", "WebSockets", "TradingView"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    statusText: "Live Trading",
    statusColor: "bg-blue-500",
    glowText: "$10M+ daily volume",
    icon: BarChart3,
    iconColor: "text-blue-400",
    iconBgColor: "bg-blue-500/20",
  },
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
        <Card className="relative z-10 mx-auto w-full h-[240px] flex flex-col overflow-hidden rounded-[28px] border-0 bg-[radial-gradient(120%_120%_at_30%_10%,#1a1a1a_0%,#0f0f10_60%,#0b0b0c_100%)] text-white shadow-[0_8px_16px_-4px_rgba(0,0,0,0.4)]">
        <CardContent className="p-5 sm:p-5 pt-4 sm:pt-4 flex flex-col justify-between h-full">
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
              <div className="flex items-center gap-2 opacity-80">
                <Clock className="h-4 w-4" />
                <span className="tabular-nums">{timeText}</span>
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
                <project.icon className={cn("h-7 w-7", project.iconColor)} />
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
          <Card className="mx-auto w-full overflow-hidden rounded-[28px] border-0 bg-[radial-gradient(ellipse_at_top_left,#1e1e1e_0%,#151515_50%,#0f0f0f_100%)] text-white shadow-2xl">
            <CardContent className="px-4 py-1 sm:px-6 py-1">
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
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      <span>{timeText}</span>
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
                    {project.githubUrl && (
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
                          asChild
                        >
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-3 w-3" /> Code
                          </a>
                        </Button>
                      </motion.div>
                    )}
                    <motion.div
                      className="flex-1 min-w-[100px]"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.95, duration: 0.3, type: "spring", stiffness: 200 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={handleCopy} 
                        className="w-full gap-2 rounded-xl bg-white/10 text-white hover:bg-white/15 transition-all"
                      >
                        <Copy className="h-3 w-3" /> {copied ? "✓" : "Copy"}
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
