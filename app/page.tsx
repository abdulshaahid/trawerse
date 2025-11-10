"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, useMotionValue } from "framer-motion"
import { DotPattern } from "@/components/ui/dot-pattern"
import Header from "@/components/header"
import Hero from "@/components/hero"
import NewAbout from "@/components/new-about"
import SlideInSection from "@/components/slide-in-section"
import ServicesSection from "@/components/services-section"
import { MarqueeDemo } from "@/components/ui/marquee-demo"
import ProjectShowcase from "@/components/project-showcase"
import ScrollVelocity from "@/components/ui/scroll-velocity"
import { WhyChooseTrawerse } from "@/components/why-choose-trawerse"


gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

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

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    cursorX.set(event.clientX)
    cursorY.set(event.clientY)
  }

  return (
    <div ref={containerRef} className="relative w-full overflow-x-hidden" onMouseMove={handleMouseMove}>
      {/* Universal Dot Pattern Background - spans all sections */}
      <DotPattern dotSize={0.9} dotSpacing={18} interactive={true} color="180, 180, 180" />
      
      {/* Universal Ambient cursor light - spans all sections */}
      <motion.div
        className="pointer-events-none fixed w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 z-[5]"
        style={{
          left: cursorX,
          top: cursorY,
          background: 'radial-gradient(circle, rgba(100, 220, 150, 0.15) 0%, rgba(100, 220, 150, 0.09) 20%, rgba(100, 220, 150, 0.04) 40%, transparent 60%)',
          filter: 'blur(45px)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      <Header />
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
            </>
          }
        />
      </main>
    </div>
  )
}
