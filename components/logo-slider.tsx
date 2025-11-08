"use client"

import { motion } from "framer-motion"

const logos = ["Flotilla", "Trawayl", "TechHub", "InnovateCo", "DesignStudio", "CodeFlow"]

export default function LogoSlider() {
  return (
    <section className="py-16 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-foreground/60 mb-12 text-sm uppercase tracking-wider">
          Trusted by startups and brands who love quality
        </p>

        <div className="overflow-hidden">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="flex gap-12 whitespace-nowrap"
          >
            {[...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                className="flex-shrink-0 text-lg font-semibold text-foreground/40 hover:text-accent transition-colors"
              >
                {logo}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
