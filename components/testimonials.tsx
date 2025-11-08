"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, Flotilla",
    quote: "Trawerse made our website look world-class. Every detail was handled with care.",
    avatar: "👩‍💼",
  },
  {
    name: "Alex Chen",
    role: "Founder, Trawayl",
    quote: "The team understood our vision perfectly and delivered beyond expectations.",
    avatar: "👨‍💼",
  },
  {
    name: "Emma Davis",
    role: "Marketing Lead, TechHub",
    quote: "Professional, creative, and incredibly responsive. Highly recommended!",
    avatar: "👩‍🦰",
  },
]

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(".testimonials-title", {
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
    <section data-animate className="py-20" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="testimonials-title text-4xl sm:text-5xl font-bold text-foreground mb-4">
            <span className="gradient-text">What Our Clients Say</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              ref={(el) => {
                cardsRef.current[i] = el
              }}
              className="p-8 rounded-2xl bg-card shadow-lg shadow-accent/10 hover:shadow-2xl hover:shadow-accent/20 transition-all hover:-translate-y-1"
            >
              <p className="text-foreground/70 mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                  <h3 className="font-bold text-foreground">{testimonial.name}</h3>
                  <p className="text-sm text-foreground/60">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
