"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Briefcase, Wrench, User, Mail } from "lucide-react"
import { ExpandableTabs } from "@/components/ui/expandable-tabs"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navTabs = [
    { title: "Work", icon: Briefcase },
    { title: "Services", icon: Wrench },
    { title: "About", icon: User },
    { title: "Contact", icon: Mail },
  ]

  const handleTabChange = (index: number | null) => {
    if (index !== null) {
      const tab = navTabs[index]
      if (tab && tab.title) {
        const element = document.getElementById(tab.title.toLowerCase())
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    }
  }

  return (
    <header className="fixed top-0 w-full z-[100] py-4 transform-gpu" style={{ willChange: 'transform' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop: Single Unified Pill */}
        <div className="hidden md:flex justify-center">
          <ExpandableTabs 
            tabs={navTabs}
            onChange={handleTabChange}
            activeColor="text-accent"
            logo={
              <Link href="/" className="flex items-center px-2 hover:opacity-80 transition-opacity">
                <Image
                  src="/trawerse.svg"
                  alt="Trawerse"
                  width={48}
                  height={32}
                  className="w-30 h-6"
                />
              </Link>
            }
            rightContent={
              <button className="px-3 py-2 rounded-full bg-accent text-black font-semibold hover:shadow-lg  transition-all hover:scale-[1.02] active:scale-95">
                Start Project
              </button>
            }
          />
        </div>

        {/* Mobile: Single Expandable Pill with Logo */}
        <div className="md:hidden flex justify-center">
          <ExpandableTabs 
            tabs={navTabs}
            onChange={handleTabChange}
            activeColor="text-accent"
            logo={
              <Link href="/" className="flex items-center">
                <Image
                  src="/tw.svg"
                  alt="Trawerse"
                  width={28}
                  height={28}
                  className="w-7 h-7"
                />
              </Link>
            }
          />
        </div>
      </div>
    </header>
  )
}
