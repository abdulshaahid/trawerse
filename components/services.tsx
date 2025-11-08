"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    title: "Custom Websites",
    description: "We design websites that actually convert.",
    icon: "🌐",
  },
  {
    title: "Branding & Identity",
    description: "Your brand deserves to look better than competitors.",
    icon: "✨",
  },
  {
    title: "Landing Pages",
    description: "High-converting landing pages that drive results.",
    icon: "🚀",
  },
  {
    title: "Company Emails & Domains",
    description: "Professional email setup and domain management.",
    icon: "📧",
  },
  {
    title: "Motion Design & Animations",
    description: "Smooth GSAP animations that delight users.",
    icon: "🎬",
  },
  {
    title: "SEO & Performance",
    description: "Optimized for search engines and speed.",
    icon: "⚙️",
  },
]

export default function Services() {
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
      <div className="absolute top-20 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            <span className="gradient-text-rainbow">What We Build</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            From startups to enterprises, we craft digital experiences that{" "}
            <span className="text-accent font-semibold">shine</span>.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              ref={(el) => {
                cardsRef.current[i] = el
              }}
              className="p-8 rounded-2xl bg-card shadow-lg shadow-accent/10 hover:shadow-2xl hover:shadow-accent/20 transition-all group hover:-translate-y-2"
            >
              <div className="text-6xl mb-6 group-hover:scale-125 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-foreground/60 leading-relaxed">{service.description}</p>
              <div className="mt-6 inline-flex items-center text-accent font-semibold text-sm group-hover:gap-2 transition-all">
                Learn more →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
