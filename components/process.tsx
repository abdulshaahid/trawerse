"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: "01",
    title: "Discover",
    description: "We listen, research, and plan your project strategy.",
    icon: "✨",
  },
  {
    number: "02",
    title: "Design",
    description: "We craft clean, human-centered designs.",
    icon: "🎨",
  },
  {
    number: "03",
    title: "Develop",
    description: "We code scalable, high-performing sites.",
    icon: "💻",
  },
  {
    number: "04",
    title: "Deliver",
    description: "We launch, polish, and celebrate success.",
    icon: "🚀",
  },
]

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(".process-title", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      })

      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          },
          opacity: 0,
          y: 30,
          duration: 0.6,
          delay: i * 0.1,
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section data-animate className="py-32 relative overflow-hidden" ref={containerRef}>
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="process-title text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            <span className="gradient-text-rainbow">How We Build</span> Perfection
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Our proven process ensures every project exceeds expectations.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-accent to-transparent" />
              )}
              <div
                ref={(el) => {
                  cardsRef.current[i] = el
                }}
                className="relative z-10 p-8 rounded-2xl bg-card shadow-lg shadow-accent/10 hover:shadow-2xl hover:shadow-accent/20 transition-all hover:-translate-y-2"
              >
                <div className="text-5xl font-bold text-accent/30 mb-3 group-hover:text-accent/50 transition-colors">
                  {step.number}
                </div>
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-foreground/60 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
