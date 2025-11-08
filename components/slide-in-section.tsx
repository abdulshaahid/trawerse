"use client"

import { useEffect, useState, useRef } from "react"

interface SlideInSectionProps {
  heroContent: React.ReactNode
  restContent: React.ReactNode
  className?: string
}

export default function SlideInSection({ heroContent, restContent, className }: SlideInSectionProps) {
  const [scrolled, setScrolled] = useState(false)
  const newPageRef = useRef<HTMLDivElement>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionComplete, setTransitionComplete] = useState(false)
  const lastScrollY = useRef(0)
  const touchStartY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      if (isTransitioning) return
      
      const currentScrollY = window.scrollY

      // Scroll down to show new page (only from hero)
      if (!scrolled && currentScrollY > 50) {
        setIsTransitioning(true)
        setScrolled(true)
        setTransitionComplete(false)
        
        // Lock scroll during transition
        document.documentElement.style.overflow = 'hidden'
        document.body.style.position = 'fixed'
        document.body.style.width = '100%'
        document.body.style.top = `-${currentScrollY}px`
        
        setTimeout(() => {
          setIsTransitioning(false)
          setTransitionComplete(true)
          // Unlock scroll and reset to top
          document.body.style.position = ''
          document.body.style.width = ''
          document.body.style.top = ''
          document.documentElement.style.overflow = ''
          window.scrollTo(0, 0)
        }, 250)
      }
      
      lastScrollY.current = currentScrollY
    }

    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning) return
      
      // Detect upward scroll at the top of new section to go back to hero
      if (transitionComplete && window.scrollY === 0 && e.deltaY < 0) {
        e.preventDefault()
        
        setIsTransitioning(true)
        setScrolled(false)
        setTransitionComplete(false)
        
        // Lock scroll during transition
        document.documentElement.style.overflow = 'hidden'
        document.body.style.position = 'fixed'
        document.body.style.width = '100%'
        document.body.style.top = '0px'
        
        setTimeout(() => {
          setIsTransitioning(false)
          // Unlock scroll
          document.body.style.position = ''
          document.body.style.width = ''
          document.body.style.top = ''
          document.documentElement.style.overflow = ''
        }, 250)
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isTransitioning) return
      
      const touchEndY = e.touches[0].clientY
      const deltaY = touchEndY - touchStartY.current
      
      // Detect upward swipe (deltaY > 0 means swiping down, which scrolls up)
      if (transitionComplete && window.scrollY === 0 && deltaY > 30) {
        e.preventDefault()
        
        setIsTransitioning(true)
        setScrolled(false)
        setTransitionComplete(false)
        
        // Lock scroll during transition
        document.documentElement.style.overflow = 'hidden'
        document.body.style.position = 'fixed'
        document.body.style.width = '100%'
        document.body.style.top = '0px'
        
        setTimeout(() => {
          setIsTransitioning(false)
          // Unlock scroll
          document.body.style.position = ''
          document.body.style.width = ''
          document.body.style.top = ''
          document.documentElement.style.overflow = ''
        }, 250)
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: false })
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      // Reset scroll lock
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
      document.documentElement.style.overflow = ''
    }
  }, [scrolled, isTransitioning, transitionComplete])

  return (
    <>
      {/* Hero section - always present, slides in/out */}
      <div
        className="fixed top-0 left-0 h-screen overflow-hidden"
        style={{
          width: 'calc(100vw + 2px)',
          transform: scrolled 
            ? "translate3d(-100vw, 0, 0) scale(0.92) rotateY(8deg)" 
            : "translate3d(0, 0, 0) scale(1) rotateY(0deg)",
          opacity: scrolled ? 0.2 : 1,
          filter: scrolled ? 'blur(5px) brightness(0.8)' : 'blur(0px) brightness(1)',
          transformOrigin: 'center right',
          zIndex: scrolled ? 0 : 10,
          pointerEvents: scrolled ? "none" : "auto",
          visibility: scrolled && transitionComplete ? 'hidden' : 'visible',
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1), filter 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: scrolled ? 'transform, opacity, filter' : 'auto',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
          WebkitFontSmoothing: 'antialiased',
          border: 'none',
          outline: 'none',
          perspective: '1000px',
        }}
      >
        {heroContent}
      </div>

      {/* New page section - slides in from right, becomes relative after transition */}
      <div
        ref={newPageRef}
        className={`${transitionComplete ? 'relative' : 'fixed'} ${transitionComplete ? '' : 'top-0'} min-h-screen ${className || ''}`}
        style={{
          width: transitionComplete ? '100%' : 'calc(100vw + 2px)',
          transform: transitionComplete 
            ? 'none' 
            : (scrolled ? "translate3d(0, 0, 0) scale(1) rotateY(0deg)" : "translate3d(100vw, 0, 0) scale(0.90) rotateY(-8deg)"),
          opacity: transitionComplete ? 1 : (scrolled ? 1 : 0.6),
          filter: transitionComplete ? 'none' : (scrolled ? 'blur(0px) brightness(1)' : 'blur(3px) brightness(1.1)'),
          transformOrigin: 'center left',
          left: transitionComplete ? 'auto' : '-1px',
          zIndex: scrolled && !transitionComplete ? 5 : 1,
          transition: transitionComplete 
            ? 'none' 
            : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1), filter 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: transitionComplete ? 'auto' : 'transform, opacity, filter',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
          WebkitFontSmoothing: 'antialiased',
          border: 'none',
          outline: 'none',
          perspective: '1000px',
        }}
      >
        {restContent}
      </div>

      {/* Spacer to allow scroll trigger - only show when on hero */}
      {!scrolled && !transitionComplete && <div className="h-[200vh] w-full"></div>}
    </>
  )
}
