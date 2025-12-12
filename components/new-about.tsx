"use client";

import { useRef, memo, useMemo } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import CurvedLoop from "@/components/ui/CurvedLoop";

// Memoized animation variants with constant initial values to avoid SSR mismatch
const containerVariants = {
  hidden: {
    y: 300,
    scale: 0.9,
  },
  visible: {
    y: 0,
    scale: 1,
  },
};

const curvedLoopVariants = {
  hidden: {
    y: 200,
    opacity: 0,
    scale: 0.85,
  },
  visible: { y: 0, opacity: 1, scale: 1 },
};

const NewAbout = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

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

  const smoothY = useSpring(y, { stiffness: 80, damping: 25, mass: 0.8 });

  // Compute viewport width safely for SSR
  const vw = useMemo(() => (typeof window !== 'undefined' ? window.innerWidth : 1200), []);


  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center pt-20 pb-32 sm:pb-36 md:py-32 overflow-visible"
    >
      {/* Gradient background effects */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          style={{ y: smoothY, willChange: 'transform' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]), willChange: 'transform' }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        />
     
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
            variants={containerVariants}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 80,
              damping: 20
            }}
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="relative backdrop-blur-2xl bg-gradient-to-b from-black/95 via-black/85 via-70% to-transparent rounded-3xl md:rounded-[2.5rem] px-4 py-12 sm:px-10 sm:py-18 md:px-8 md:py-20 lg:px-10 lg:py-20 xl:px-10 xl:py-20 shadow-2xl shadow-black/50">
              {/* Multiple glass layers for depth */}
              <div className="absolute inset-0 rounded-3xl md:rounded-[2.5rem] bg-gradient-to-b from-accent/10 via-accent/5 via-70% to-transparent pointer-events-none" />
              <div className="absolute inset-0 rounded-3xl md:rounded-[2.5rem] bg-[radial-gradient(circle_at_top,rgba(74,222,128,0.12),transparent_60%)] pointer-events-none" />

              {/* Moving ambient light effects - Left to Right Smooth */}
              <motion.div
                className="absolute top-1/4 left-0 w-72 h-72 md:w-96 md:h-96 rounded-full bg-accent/18 blur-3xl pointer-events-none"
                style={{ willChange: 'transform, opacity' }}
                initial={{ x: -100, opacity: 0 }}
                animate={{
                  x: [-100, vw],
                  opacity: [0, 0.18, 0.18, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute top-1/2 left-0 w-80 h-80 md:w-[400px] md:h-[400px] rounded-full bg-accent/15 blur-3xl pointer-events-none"
                style={{ willChange: 'transform, opacity' }}
                initial={{ x: -120, opacity: 0 }}
                animate={{
                  x: [-120, vw],
                  opacity: [0, 0.15, 0.15, 0],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 5,
                }}
              />
              <motion.div
                className="absolute top-1/3 left-0 w-64 h-64 md:w-80 md:h-80 rounded-full bg-accent/20 blur-3xl pointer-events-none"
                style={{ willChange: 'transform, opacity' }}
                initial={{ x: -80, opacity: 0 }}
                animate={{
                  x: [-80, vw],
                  opacity: [0, 0.20, 0.20, 0],
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 10,
                }}
              />
              <motion.div
                className="absolute bottom-1/3 left-0 w-72 h-72 md:w-96 md:h-96 rounded-full bg-accent/16 blur-3xl pointer-events-none"
                style={{ willChange: 'transform, opacity' }}
                initial={{ x: -100, opacity: 0 }}
                animate={{
                  x: [-100, vw],
                  opacity: [0, 0.16, 0.16, 0],
                }}
                transition={{
                  duration: 22,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 15,
                }}
              />

              {/* Content */}
              <div className="relative z-10 space-y-6 sm:space-y-8 md:space-y-6">
                {/* Title */}
                <div ref={titleRef} className="text-center">
                  <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold leading-[1.1] tracking-tight">
                    <span className="bg-gradient-to-b from-gray-200 via-white to-gray-300 bg-clip-text text-transparent [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]">
                      We Build{" "}
                    </span>
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
                    <span className="bg-gradient-to-b from-gray-200 via-white to-gray-100 bg-clip-text text-transparent [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]">
                      Digital Experiences
                    </span>
                  </h2>
                </div>

                {/* Description */}
                <div
                  ref={descRef}
                  className="space-y-4 sm:space-y-7 md:space-y-8 max-w-3xl xl:max-w-5xl mx-auto text-center"
                >
                  <p className="text-base sm:text-lg md:text-xl lg:text-xl text-foreground/80 leading-relaxed">
                    At Trawerse, we craft stunning, high-performance websites
                    that deliver results. We're digital craftsmen, blending
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
          className="absolute bottom-20 sm:bottom-24 md:bottom-20 lg:bottom-14 left-0 right-0 w-full px-0 overflow-visible origin-center"
          variants={curvedLoopVariants}
          transition={{ 
            duration: 0.8,
            delay: 0.15,
            type: "spring",
            stiffness: 80,
            damping: 20
          }}
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="scale-50 sm:scale-65 md:scale-100">
            <CurvedLoop
              marqueeText="Trawerse ✦ Premium Web Development ✦ Crafting Digital Excellence ✦ Modern Design ✦ High Performance ✦"
              speed={4}
              curveAmount={100}
              direction="left"
              className="text-accent/80 text-sm sm:text-base md:text-4xl lg:text-5xl xl:text-6xl font-bold"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default memo(NewAbout);