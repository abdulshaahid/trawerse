"use client"

import { motion } from "framer-motion"

export default function Culture() {
  return (
    <section data-animate className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="h-96 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl flex items-center justify-center"
          >
            <div className="text-7xl">☕</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">We Code for Fun</h2>
            <p className="text-lg text-foreground/70 mb-6">
              We believe websites should feel alive — just like the people who build them. Our team is passionate about
              creating digital experiences that inspire, engage, and delight.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-2xl">🎯</div>
                <div>
                  <h3 className="font-bold text-foreground">Quality First</h3>
                  <p className="text-foreground/60">Every project is treated as our own</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl">🚀</div>
                <div>
                  <h3 className="font-bold text-foreground">Innovation</h3>
                  <p className="text-foreground/60">We stay ahead of the curve</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl">❤️</div>
                <div>
                  <h3 className="font-bold text-foreground">Passion</h3>
                  <p className="text-foreground/60">We love what we do</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
