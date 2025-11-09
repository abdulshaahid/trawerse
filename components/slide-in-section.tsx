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
  const scrollThreshold = 50
  const transitionDuration = 400

  useEffect(() => {
    const handleScroll = () => {
      if (isTransitioning) return
      
      const currentScrollY = window.scrollY

      // Scroll down to show new page (only from hero)
      if (!scrolled && !isTransitioning && currentScrollY > scrollThreshold) {
        setIsTransitioning(true)
        setScrolled(true)
        setTransitionComplete(false)
        
        // Lock scroll during transition
        const scrollPosition = window.scrollY
        document.documentElement.style.overflow = 'hidden'
        document.body.style.position = 'fixed'
        document.body.style.width = '100%'
        document.body.style.top = `-${scrollPosition}px`
        
        // Use requestAnimationFrame for smoother transition
        requestAnimationFrame(() => {
          setTimeout(() => {
            setIsTransitioning(false)
            setTransitionComplete(true)
            // Unlock scroll and reset to top
            document.body.style.position = ''
            document.body.style.width = ''
            document.body.style.top = ''
            document.documentElement.style.overflow = ''
            window.scrollTo(0, 0)
          }, transitionDuration)
        })
      }
      
      lastScrollY.current = currentScrollY
    }

    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning) {
        e.preventDefault()
        return
      }
      
      // Detect upward scroll at the top of new section to go back to hero
      if (transitionComplete && window.scrollY <= 5 && e.deltaY < -10) {
        e.preventDefault()
        
        setIsTransitioning(true)
        setScrolled(false)
        setTransitionComplete(false)
        
        // Lock scroll during transition
        document.documentElement.style.overflow = 'hidden'
        document.body.style.position = 'fixed'
        document.body.style.width = '100%'
        document.body.style.top = '0px'
        
        requestAnimationFrame(() => {
          setTimeout(() => {
            setIsTransitioning(false)
            // Unlock scroll
            document.body.style.position = ''
            document.body.style.width = ''
            document.body.style.top = ''
            document.documentElement.style.overflow = ''
          }, transitionDuration)
        })
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (!isTransitioning) {
        touchStartY.current = e.touches[0].clientY
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isTransitioning) {
        e.preventDefault()
        return
      }
      
      const touchEndY = e.touches[0].clientY
      const deltaY = touchEndY - touchStartY.current
      
      // Detect upward swipe (deltaY > 0 means swiping down, which scrolls up)
      if (transitionComplete && window.scrollY <= 5 && deltaY > 50) {
        e.preventDefault()
        
        setIsTransitioning(true)
        setScrolled(false)
        setTransitionComplete(false)
        
        // Lock scroll during transition
        document.documentElement.style.overflow = 'hidden'
        document.body.style.position = 'fixed'
        document.body.style.width = '100%'
        document.body.style.top = '0px'
        
        requestAnimationFrame(() => {
          setTimeout(() => {
            setIsTransitioning(false)
            // Unlock scroll
            document.body.style.position = ''
            document.body.style.width = ''
            document.body.style.top = ''
            document.documentElement.style.overflow = ''
          }, transitionDuration)
        })
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
            ? "translate3d(-100%, 0, 0) scale(0.95)" 
            : "translate3d(0, 0, 0) scale(1)",
          opacity: scrolled ? 0 : 1,
          filter: scrolled ? 'blur(8px)' : 'blur(0px)',
          transformOrigin: 'center left',
          zIndex: scrolled ? 0 : 10,
          pointerEvents: scrolled ? "none" : "auto",
          visibility: scrolled && transitionComplete ? 'hidden' : 'visible',
          transition: `transform ${transitionDuration}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1), filter ${transitionDuration}ms ease-out`,
          willChange: isTransitioning ? 'transform, opacity, filter' : 'auto',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'antialiased',
        }}
      >
        {heroContent}
      </div>

      {/* New page section - slides in from right, becomes relative after transition */}
      <div
        ref={newPageRef}
        className={`${transitionComplete ? 'relative' : 'fixed'} ${transitionComplete ? '' : 'top-0 left-0'} min-h-screen ${className || ''}`}
        style={{
          width: transitionComplete ? '100%' : '100vw',
          transform: transitionComplete 
            ? 'none' 
            : (scrolled ? "translate3d(0, 0, 0)" : "translate3d(100%, 0, 0)"),
          opacity: transitionComplete ? 1 : (scrolled ? 1 : 0),
          zIndex: scrolled && !transitionComplete ? 5 : 1,
          transition: transitionComplete 
            ? 'none' 
            : `transform ${transitionDuration}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${transitionDuration}ms ease-out`,
          willChange: isTransitioning ? 'transform, opacity' : 'auto',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          pointerEvents: scrolled || transitionComplete ? 'auto' : 'none',
        }}
      >
        {(scrolled || transitionComplete) && restContent}
      </div>

      {/* Spacer to allow scroll trigger - only show when on hero */}
      {!scrolled && !transitionComplete && <div className="h-[200vh] w-full"></div>}
    </>
  )
}
