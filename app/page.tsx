"use client"

import { useEffect, useRef, useState, lazy, Suspense } from "react"
import dynamic from "next/dynamic"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, useMotionValue } from "framer-motion"
import { DotPattern } from "@/components/ui/dot-pattern"
import Header from "@/components/header"
import Hero from "@/components/hero"
import SlideInSection from "@/components/slide-in-section"
import FloatingContact from "@/components/floating-contact"

// Lazy load heavy components below the fold
const NewAbout = dynamic(() => import("@/components/new-about"), { ssr: true })
const ServicesSection = dynamic(() => import("@/components/services-section"), { ssr: true })
const MarqueeDemo = dynamic(() => import("@/components/ui/marquee-demo").then(mod => ({ default: mod.MarqueeDemo })), { ssr: false })
const ProjectShowcase = dynamic(() => import("@/components/project-showcase"), { ssr: false })
const ScrollVelocity = dynamic(() => import("@/components/ui/scroll-velocity"), { ssr: false })
const WhyChooseTrawerse = dynamic(() => import("@/components/why-choose-trawerse").then(mod => ({ default: mod.WhyChooseTrawerse })), { ssr: true })
const Testimonials = dynamic(() => import("@/components/testimonials").then(mod => ({ default: mod.Testimonials })), { ssr: false })
const ContactSection = dynamic(() => import("@/components/contact-section").then(mod => ({ default: mod.ContactSection })), { ssr: true })
const Footer = dynamic(() => import("@/components/ui/footer-section").then(mod => ({ default: mod.Footer })), { ssr: true })


gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const [isTouching, setIsTouching] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    // Initialize GSAP animations
    const ctx = gsap.context(() => {
      // Smooth scroll animations for sections
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
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Throttle mouse move for better performance
  const throttleTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (throttleTimeoutRef.current) return
    
    setIsDesktop(true)
    cursorX.set(event.clientX)
    cursorY.set(event.clientY)
    
    throttleTimeoutRef.current = setTimeout(() => {
      throttleTimeoutRef.current = null
    }, 16) // ~60fps
  }

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setIsDesktop(false)
    setIsTouching(true)
    const touch = event.touches[0]
    cursorX.set(touch.clientX)
    cursorY.set(touch.clientY)
  }

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length > 0) {
      const touch = event.touches[0]
      cursorX.set(touch.clientX)
      cursorY.set(touch.clientY)
    }
  }

  const handleTouchEnd = () => {
    setIsTouching(false)
  }

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
      <DotPattern dotSize={0.9} dotSpacing={18} interactive={true} color="180, 180, 180" />
      
      {/* Universal Ambient cursor light - spans all sections (desktop only) */}
      {isDesktop && (
        <motion.div
          className="pointer-events-none fixed w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 z-[5] will-change-transform"
          style={{
            left: cursorX,
            top: cursorY,
            background: 'radial-gradient(circle, rgba(100, 220, 150, 0.12) 0%, rgba(100, 220, 150, 0.06) 20%, rgba(100, 220, 150, 0.03) 40%, transparent 60%)',
            filter: 'blur(40px)',
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
              <ServicesSection />

              {/* Logos Section */}
              <MarqueeDemo />

              {/* Project Showcase Section */}
              <ProjectShowcase />

              {/* Scroll Velocity Section */}
              <ScrollVelocity
                texts={['#WECODEFORFUN', '#WECODEFORFUN']} 
                velocity={100} 
                className="velocity-text"
                damping={50}
                stiffness={400}
                numCopies={10}
                velocityMapping={{ input: [0, 1000], output: [0, 10] }}
              />

              {/* Why Choose Trawerse Section */}
              <WhyChooseTrawerse />

              {/* Testimonials Section */}
              <Testimonials />

              {/* Contact Section */}
              <ContactSection />

              {/* Footer Section */}
              <Footer />
            </>
          }
        />
      </main>
    </div>
  )
}
