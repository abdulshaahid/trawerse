"use client"

import { useState, useEffect, useCallback, useMemo, memo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Briefcase, Wrench, User, Star } from "lucide-react"
import { ExpandableTabs } from "@/components/ui/expandable-tabs"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    let ticking = false
    let lastScrollY = 0
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Only update state if scroll position meaningfully changed
      if (Math.abs(currentScrollY - lastScrollY) < 5) return
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(currentScrollY > 10)
          lastScrollY = currentScrollY
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Memoize navTabs to prevent recreation on every render
  const navTabs = useMemo(() => [
    { title: "About", icon: User },
    { title: "Services", icon: Wrench },
    { title: "Work", icon: Briefcase },
    { title: "Features", icon: Star },
  ], [])

  // Memoize event handlers
  const handleTabChange = useCallback((index: number | null) => {
    if (index !== null) {
      const tab = navTabs[index]
      if (tab && tab.title) {
        // Dispatch custom navigation event
        const event = new CustomEvent('navigateToSection', {
          detail: { sectionId: tab.title.toLowerCase() }
        })
        window.dispatchEvent(event)
      }
    }
  }, [navTabs])

  const handleLogoClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    // Dispatch custom navigation event for home
    const event = new CustomEvent('navigateToSection', {
      detail: { sectionId: 'home' }
    })
    window.dispatchEvent(event)
  }, [])

  const handleStartProject = useCallback(() => {
    // Dispatch custom navigation event for contact section
    const event = new CustomEvent('navigateToSection', {
      detail: { sectionId: 'contact' }
    })
    window.dispatchEvent(event)
  }, [])

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
              <Link href="/" onClick={handleLogoClick} className="flex items-center px-2 hover:opacity-80 transition-opacity">
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
              <button 
                onClick={handleStartProject}
                className="px-3 py-2 rounded-full bg-accent text-black font-semibold hover:shadow-lg  transition-all hover:scale-[1.02] active:scale-95"
              >
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
              <Link href="/" onClick={handleLogoClick} className="flex items-center">
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

export default memo(Header)
