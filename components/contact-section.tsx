"use client"

import { motion } from "framer-motion"
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react"
import { useState } from "react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className="relative py-20 sm:py-32 overflow-hidden w-full">
      {/* Background gradient blobs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }} 
        whileInView={{ opacity: 1, scale: 1 }} 
        viewport={{ once: true }} 
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/3 rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }} 
        whileInView={{ opacity: 1, scale: 1 }} 
        viewport={{ once: true }} 
        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
      />

      <div className="relative mx-auto max-w-7xl px-3 sm:px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Title and Info */}
          <div className="space-y-8">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -100, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2
              }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold">
                <span className="bg-gradient-to-b from-gray-200 via-white to-gray-300 bg-clip-text text-transparent">
                  Contact{" "}
                </span>
                <span className="text-accent">
                  Us
                </span>
              </h2>
              <p className="text-white/70 text-lg md:text-xl max-w-lg">
                Let&apos;s turn your vision into reality. Whether you&apos;re starting from scratch or need to elevate your existing platform.
              </p>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -80, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.4
              }}
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#111111]/90 ">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-white/50 text-sm">Email</p>
                  <p className="text-white font-medium">hello@trawerse.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#111111]/90 ">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-white/50 text-sm">Phone</p>
                  <p className="text-white font-medium">+91 6282 669 441</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#111111]/90 ">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-white/50 text-sm">Location</p>
                  <p className="text-white font-medium">Kerala, India</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right side - Contact Form with Glass Effect */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.6
            }}
          >
            <div className="relative w-full overflow-hidden rounded-3xl bg-[#111111]/90 p-6 shadow-2xl">
              
              <form onSubmit={handleSubmit} className="relative space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-3xl bg-white/[0.05] border border-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-3xl bg-white/[0.05] border border-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-white/70 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-3xl bg-white/[0.05] border border-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-3xl bg-white/[0.05] border border-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none"
                    placeholder="Tell us about your project..."
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full px-6 py-3 rounded-3xl bg-accent hover:bg-accent/90 text-black font-semibold flex items-center justify-center gap-2 transition-all group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection;
