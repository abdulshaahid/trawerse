"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "Flotilla",
    description: "Industrial EPC website with advanced features",
    category: "Enterprise",
  },
  {
    title: "Trawayl",
    description: "Travel booking marketplace platform",
    category: "SaaS",
  },
  {
    title: "TechHub",
    description: "Tech community and learning platform",
    category: "Community",
  },
]

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          },
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
          delay: i * 0.1,
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section data-animate className="py-32 relative overflow-hidden" ref={containerRef}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            <span className="gradient-text-rainbow">Our Work Speaks</span> for Itself
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Explore the projects that showcase our expertise and creativity.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div
              key={i}
              ref={(el) => {
                cardsRef.current[i] = el
              }}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-lg shadow-accent/10 hover:shadow-2xl hover:shadow-accent/20 p-8 cursor-pointer hover:-translate-y-2 transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="text-sm font-semibold text-accent mb-3 uppercase tracking-wider">
                  {project.category}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{project.title}</h3>
                <p className="text-foreground/60 mb-6 leading-relaxed">{project.description}</p>
                <div className="inline-flex items-center text-accent font-semibold group-hover:gap-2 transition-all">
                  View Project →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
