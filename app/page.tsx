"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValue } from "framer-motion";
import { DotPattern } from "@/components/ui/dot-pattern";
import NewAbout from "@/components/new-about";
import ServicesSection from "@/components/services-section";
import { WhyChooseTrawerse } from "@/components/why-choose-trawerse";
import ProjectShowcase from "@/components/project-showcase";
import Header from "@/components/header";
import Hero from "@/components/hero";
import SlideInSection from "@/components/slide-in-section";
import FloatingContact from "@/components/floating-contact";

// Lazy load heavy components below the fold with optimized loading strategies
const MarqueeDemo = dynamic(() => import("@/components/ui/marquee-demo"), {
  ssr: false,
  loading: () => <div className="h-32" />,
});
const ScrollVelocity = dynamic(() => import("@/components/ui/scroll-velocity"), {
  ssr: false,
  loading: () => <div className="h-24" />,
});
const Testimonials = dynamic(() => import("@/components/testimonials"), {
  ssr: false,
  loading: () => <div className="min-h-[60vh]" />,
});
const ContactSection = dynamic(() => import("@/components/contact-section"), {
  ssr: false,
  loading: () => <div className="min-h-screen" />,
});
const Footer = dynamic(() => import("@/components/ui/footer-section"), {
  ssr: false,
  loading: () => <div className="h-64" />,
});

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Lazy load GSAP only when needed for scroll animations
    let ctx: any;
    const initGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Smooth scroll animations for sections with GPU-accelerated properties
        gsap.utils.toArray<HTMLElement>("[data-animate]").forEach((element) => {
          gsap.from(element, {
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              end: "top 20%",
              scrub: false,
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            force3D: true,
          });
        });
      }, containerRef);
    };

    // Defer GSAP initialization to idle time
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => initGSAP());
    } else {
      setTimeout(() => initGSAP(), 100);
    }

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  // Throttle mouse move for better performance using useCallback (desktop only)
  const throttleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (isMobile || throttleTimeoutRef.current) return;

      setIsDesktop(true);
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);

      throttleTimeoutRef.current = setTimeout(() => {
        throttleTimeoutRef.current = null;
      }, 16); // ~60fps
    },
    [cursorX, cursorY, isMobile]
  );

  const handleTouchStart = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      setIsDesktop(false);
      // Don't track touch position for ambient light on mobile
    },
    []
  );

  const handleTouchMove = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      // Don't track touch movement for ambient light on mobile
    },
    []
  );

  const handleTouchEnd = useCallback(() => {}, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-x-hidden"
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Universal Dot Pattern Background - spans all sections */}
      <DotPattern
        dotSize={0.9}
        dotSpacing={18}
        interactive={true}
        color="180, 180, 180"
      />

      {/* Universal Ambient cursor light - spans all sections (desktop only) */}
      {isDesktop && !isMobile && (
        <motion.div
          className="pointer-events-none fixed w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 z-[5] will-change-transform"
          style={{
            left: cursorX,
            top: cursorY,
            background:
              "radial-gradient(circle, rgba(100, 220, 150, 0.12) 0%, rgba(100, 220, 150, 0.06) 20%, rgba(100, 220, 150, 0.03) 40%, transparent 60%)",
            filter: "blur(40px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}

      <Header />
      <FloatingContact />
      <main className="relative z-10">
        <SlideInSection
          heroContent={<Hero />}
          restContent={
            <>
              {/* New About Section */}
              <NewAbout />

              {/* Services Section */}
              <div
                style={{
                  position: "relative",
                  contentVisibility: "auto",
                  containIntrinsicSize: "800px 600px",
                  contain: "layout paint style",
                }}
              >
                <ServicesSection />
              </div>

              {/* Logos Section */}
              <div
                style={{
                  position: "relative",
                  contentVisibility: "auto",
                  containIntrinsicSize: "160px 200px",
                  contain: "layout paint style",
                }}
              >
                <MarqueeDemo />
              </div>

              {/* Project Showcase Section */}
              <div
                style={{
                  position: "relative",
                  contentVisibility: "auto",
                  containIntrinsicSize: "1200px 800px",
                  contain: "layout paint style",
                }}
              >
                <ProjectShowcase />
              </div>

              {/* Scroll Velocity Section */}
              <div
                style={{
                  position: "relative",
                  contentVisibility: "auto",
                }}
              >
                <ScrollVelocity
                  texts={["#WECODEFORFUN", "#WECODEFORFUN"]}
                  velocity={100}
                  className="velocity-text"
                  damping={50}
                  stiffness={400}
                  numCopies={10}
                  velocityMapping={{ input: [0, 1000], output: [0, 10] }}
                />
              </div>

              {/* Why Choose Trawerse Section */}
              <div
                style={{
                  position: "relative",
                  contentVisibility: "auto",
                  containIntrinsicSize: "800px 600px",
                  contain: "layout paint style",
                }}
              >
                <WhyChooseTrawerse />
              </div>

              {/* Testimonials Section */}
              <div
                style={{
                  position: "relative",
                  contentVisibility: "auto",
                  containIntrinsicSize: "700px 600px",
                  contain: "layout paint style",
                }}
              >
                <Testimonials />
              </div>

              {/* Contact Section */}
              <div
                style={{
                  position: "relative",
                  contentVisibility: "auto",
                  containIntrinsicSize: "900px 600px",
                  contain: "layout paint style",
                }}
              >
                <ContactSection />
              </div>

              {/* Footer Section */}
              <div
                style={{
                  position: "relative",
                  contentVisibility: "auto",
                  containIntrinsicSize: "400px 600px",
                  contain: "layout paint style",
                }}
              >
                <Footer />
              </div>
            </>
          }
        />
      </main>
    </div>
  );
}
