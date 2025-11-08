"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-2">Trawerse</h3>
            <p className="text-background/70">Built with passion @Trawerse. We craft premium digital experiences.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex gap-8 justify-end"
          >
            {["Home", "Work", "Services", "Contact"].map((link) => (
              <Link
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-background/70 hover:text-background transition-colors"
              >
                {link}
              </Link>
            ))}
          </motion.div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-background/60 text-sm">
          <p>© 2025 Trawerse. All rights reserved. Built with passion and precision.</p>
        </div>
      </div>
    </footer>
  )
}
