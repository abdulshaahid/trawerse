"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    title: "Passion in Code",
    description: "Every line of code carries our obsession for detail.",
    number: "01",
    icon: "💻",
  },
  {
    title: "Precision in Design",
    description: "We craft interfaces that are both beautiful and functional.",
    number: "02",
    icon: "🎨",
  },
  {
    title: "Promise in Delivery",
    description: "We deliver on time, every time, with excellence.",
    number: "03",
    icon: "✨",
  },
]

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".value-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 20%",
            scrub: false,
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: i * 0.1,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance leading-tight">
            We Code for <span className="gradient-text">Fun</span>. We Design for{" "}
            <span className="gradient-text-accent">Passion</span>.
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl leading-relaxed">
            Every pixel we design and every line of code we write carries our obsession for detail and love for
            creativity. We don't just build websites—we build{" "}
            <span className="text-accent font-semibold">experiences</span> that matter.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {values.map((value, i) => (
            <div
              key={i}
              className="value-card p-8 rounded-2xl bg-card shadow-lg shadow-accent/10 hover:shadow-2xl hover:shadow-accent/20 transition-all group cursor-pointer hover:-translate-y-2"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{value.icon}</div>
              <div className="text-5xl font-bold text-accent/20 mb-4 group-hover:text-accent/40 transition-colors">
                {value.number}
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">{value.title}</h3>
              <p className="text-foreground/60 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
