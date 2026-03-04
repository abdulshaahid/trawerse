"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Home, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function InteriorNavbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-4 md:top-6 inset-x-0 z-[100] flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`pointer-events-auto relative flex flex-col bg-black/60 backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-300 w-full md:w-auto ${
          open ? "rounded-3xl" : "rounded-3xl"
        } ${scrolled ? "shadow-[0_8px_32px_rgba(0,0,0,0.5)] bg-black/80" : "shadow-none"}`}
      >
        <div className="flex items-center justify-between px-2 py-2 w-full">
          {/* Left Actions */}
          <div className="flex items-center gap-1 md:gap-2 pr-3 md:pr-4 border-r border-white/10">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-white transition-all duration-300 px-3 py-2 md:py-2 rounded-full hover:bg-white/10 group"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">Back</span>
            </button>

            <Link
              href="/"
              className="flex items-center justify-center w-9 h-9 md:w-auto md:h-auto gap-1.5 text-sm font-medium text-muted-foreground hover:text-white transition-all duration-300 md:px-3 md:py-2 rounded-full hover:bg-white/10 group"
              aria-label="Home"
            >
              <Home className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1 pl-3 md:pl-4">
            {NAV_ITEMS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-white transition-all duration-300 rounded-full hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden pl-3 pr-1">
            <button
              onClick={() => setOpen(!open)}
              className="relative flex items-center justify-center w-10 h-10 text-muted-foreground hover:text-white transition-colors rounded-full hover:bg-white/10"
              aria-label="Toggle menu"
            >
              <Menu
                className={`absolute w-5 h-5 transition-all duration-300 ${
                  open ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
                }`}
              />
              <X
                className={`absolute w-5 h-5 transition-all duration-300 ${
                  open ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="mobile-dropdown"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-1 px-3 pb-4 pt-1 border-t border-white/5 mx-2">
                {NAV_ITEMS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 mt-1 text-[15px] font-medium text-muted-foreground hover:text-white hover:bg-white/10 rounded-xl transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
