"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  Sparkles,
  Zap,
  Target,
  Users,
  Rocket,
  Award,
  ArrowRight,
  Star,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CurvedLoop from "@/components/ui/CurvedLoop";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "150+", label: "Projects Delivered", icon: Rocket },
  { value: "98%", label: "Client Satisfaction", icon: Award },
  { value: "50+", label: "Happy Clients", icon: Users },
  { value: "24/7", label: "Support Available", icon: Zap },
];

const features = [
  {
    icon: Target,
    title: "Pixel Perfect",
    description:
      "Every pixel matters. We craft designs with meticulous attention to detail.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Performance is key. Our websites load instantly and run smoothly.",
  },
  {
    icon: Sparkles,
    title: "Modern Stack",
    description:
      "We use cutting-edge technologies to build future-proof solutions.",
  },
];

export default function NewAbout() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const featuresInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.8, 1, 1, 0.8]
  );

  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  useEffect(() => {
    if (!sectionRef.current) return;

    let ctx: gsap.Context | undefined;

    // Wait for component to mount and render
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        // Removed separate text animations - using container animation only
      }, sectionRef);
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-20 md:py-32 overflow-visible"
    >
      {/* Gradient background effects */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          style={{ y: smoothY }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        />
        {/* Animated grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(74,222,128,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(74,222,128,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Glassmorphism Container */}
          <motion.div
            className="max-w-7xl mx-auto"
            variants={{
              hidden: {
                y:
                  typeof window !== "undefined" && window.innerWidth < 768
                    ? 500
                    : 300,
                scale: 0.85,
                filter: "blur(12px)",
              },
              visible: {
                y:
                  typeof window !== "undefined" && window.innerWidth < 768
                    ? -6
                    : 0,
                scale: 1,
                filter: "blur(0px)",
              },
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative backdrop-blur-2xl bg-gradient-to-br from-black/80 via-black/70 to-black/60 rounded-3xl md:rounded-[2.5rem] px-4 py-12 sm:px-10 sm:py-18 md:px-8 md:py-20 lg:px-10 lg:py-20 xl:px-10 xl:py-20 shadow-2xl shadow-black/50">
              {/* Multiple glass layers for depth */}
              <div className="absolute inset-0 rounded-3xl md:rounded-[2.5rem] bg-gradient-to-br from-accent/10 via-transparent to-accent/5 pointer-events-none" />
              <div className="absolute inset-0 rounded-3xl md:rounded-[2.5rem] bg-[radial-gradient(circle_at_top_right,rgba(74,222,128,0.15),transparent_50%)] pointer-events-none" />

              {/* Pulsing ambient light effects */}
              <motion.div
                className="absolute top-0 left-0 w-32 h-32 md:w-40 md:h-40 rounded-full bg-accent/20 blur-3xl pointer-events-none"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-32 h-32 md:w-40 md:h-40 rounded-full bg-accent/20 blur-3xl pointer-events-none"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
              />

              {/* Content */}
              <div className="relative z-10 space-y-6 sm:space-y-8 md:space-y-6">
                {/* Title */}
                <div ref={titleRef} className="text-center">
                  <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold text-foreground leading-[1.1] tracking-tight">
                    We Build{" "}
                    <span className="text-accent relative inline-block">
                      Exceptional
                      <svg
                        className="absolute -bottom-1 left-0 w-full"
                        height="6"
                        viewBox="0 0 200 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 4C50 2 100 2 199 4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    <br className="hidden sm:block" />
                    Digital Experiences
                  </h2>
                </div>

                {/* Description */}
                <div
                  ref={descRef}
                  className="space-y-4 sm:space-y-7 md:space-y-8 max-w-3xl xl:max-w-5xl mx-auto text-center"
                >
                  <p className="text-base sm:text-lg md:text-xl lg:text-xl text-foreground/80 leading-relaxed">
                    At Trawerse, we craft stunning, high-performance websites
                    that deliver results. We’re digital craftsmen, blending
                    design and technology to build experiences that stand out
                    and perform. Every pixel is crafted to tell your story and
                    elevate your brand.
                  </p>
                  <p className="text-base sm:text-lg md:text-xl lg:text-xl text-foreground/85 leading-relaxed"></p>
                  <p className="text-base sm:text-lg md:text-xl lg:text-xl text-foreground/85 leading-relaxed"></p>
                  <div className="w-14 sm:w-14 md:w-16 h-0.5 bg-accent/50 mx-auto rounded-full" />
                  <p className="text-base sm:text-lg md:text-xl lg:text-xl text-foreground/80 leading-relaxed"></p>
                  <p className="text-base sm:text-lg md:text-xl lg:text-xl text-foreground/90 leading-relaxed font-medium">
                    At Trawerse, innovation isn't a buzzword — it's our culture.
                  </p>
                  <p className="text-base sm:text-lg md:text-xl lg:text-xl text-accent/90 leading-relaxed font-semibold">
                    We build. We refine. We perfect.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg lg:text-lg text-foreground/70 leading-relaxed italic">
                    Because your brand deserves nothing less than extraordinary.
                  </p>
                </div>
              </div>

              {/* Bottom accent line */}
            </div>
          </motion.div>
        </div>

        {/* Curved Loop Marquee - Full Width */}
        <motion.div
          className="absolute bottom-14 md:bottom-20 lg:bottom-14 left-0 right-0 w-full px-0 overflow-visible origin-center"
          variants={{
            hidden: {
              y:
                typeof window !== "undefined" && window.innerWidth < 768
                  ? 400
                  : 200,
              opacity: 0,
              scale: 0.8,
              filter: "blur(10px)",
            },
            visible: { y: 0, opacity: 1, scale: 1, filter: "blur(0px)" },
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="scale-50 sm:scale-65 md:scale-100">
            <CurvedLoop
              marqueeText="Trawerse ✦ Premium Web Development ✦ Crafting Digital Excellence ✦ Modern Design ✦ High Performance ✦"
              speed={7}
              curveAmount={100}
              direction="left"
              interactive={true}
              className="text-accent/80 text-sm sm:text-base md:text-4xl lg:text-5xl xl:text-6xl font-bold"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
