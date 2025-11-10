"use client";

import { useState } from "react";
import { MessageCircle, Mail, Phone, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: "https://wa.me/919876543210", // Replace with your WhatsApp number
    },
    {
      name: "Email Us",
      icon: Mail,
      href: "mailto:hello@trawerse.com",
    },
    {
      name: "Call Now",
      icon: Phone,
      href: "tel:+911234567890", // Replace with your phone number
    },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-1.5">
      {/* Contact Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-1.5"
          >
            {contactOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <motion.a
                  key={option.name}
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                  className="group flex items-center gap-1.5 bg-[#1a1a1a] hover:bg-[#202020] text-white pl-2 pr-3 py-1.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-7 h-7 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-black" />
                  </div>
                  <span className="text-xs font-semibold whitespace-nowrap">{option.name}</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-1.5 bg-[#1a1a1a] hover:bg-[#202020] text-white pl-2 pr-3.5 py-2 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-7 h-7 bg-accent rounded-full flex items-center justify-center flex-shrink-0"
        >
          <ArrowRight className="w-4 h-4 text-black" />
        </motion.div>
        <span className="font-bold text-xs whitespace-nowrap">
          {isOpen ? "Close" : "Contact"}
        </span>
      </motion.button>
    </div>
  );
}
