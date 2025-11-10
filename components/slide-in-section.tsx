"use client"

import { useEffect, useState, useRef, useCallback } from "react"

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
  const touchStartTime = useRef(0)
  const isTouching = useRef(false)
  const pendingNavigation = useRef<string | null>(null)
  const scrollThreshold = 50
  const transitionDuration = 600

  const lockScroll = useCallback((scrollPosition: number = 0) => {
    document.documentElement.style.overflow = 'hidden'
    // @ts-ignore - WebKit-specific property for iOS
    document.documentElement.style.WebkitOverflowScrolling = 'auto'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    document.body.style.top = `-${scrollPosition}px`
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
  }, [])

  const unlockScroll = useCallback(() => {
    const scrollY = document.body.style.top
    document.body.style.position = ''
    document.body.style.width = ''
    document.body.style.top = ''
    document.body.style.overflow = ''
    document.body.style.touchAction = ''
    document.documentElement.style.overflow = ''
    // @ts-ignore - WebKit-specific property for iOS
    document.documentElement.style.WebkitOverflowScrolling = 'touch'
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }
  }, [])

  const transitionToNewSection = useCallback(() => {
    if (isTransitioning || scrolled) return
    
    setIsTransitioning(true)
    lockScroll(window.scrollY)
    
    // Force reflow for iOS Safari to recognize the initial state
    requestAnimationFrame(() => {
      // Trigger the actual transition
      setScrolled(true)
      setTransitionComplete(false)
      
      setTimeout(() => {
        setIsTransitioning(false)
        setTransitionComplete(true)
        unlockScroll()
        window.scrollTo(0, 0)
        
        // Handle pending navigation after transition
        if (pendingNavigation.current) {
          const targetId = pendingNavigation.current
          pendingNavigation.current = null
          
          // Wait for DOM to update and scroll
          requestAnimationFrame(() => {
            setTimeout(() => {
              const element = document.getElementById(targetId)
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            }, 100)
          })
        }
      }, transitionDuration)
    })
  }, [isTransitioning, scrolled, transitionDuration, lockScroll, unlockScroll])

  const transitionToHero = useCallback(() => {
    if (isTransitioning || !transitionComplete) return
    
    setIsTransitioning(true)
    lockScroll(0)
    
    // Force reflow for iOS Safari to recognize the initial state
    requestAnimationFrame(() => {
      // Trigger the actual transition
      setScrolled(false)
      setTransitionComplete(false)
      
      setTimeout(() => {
        setIsTransitioning(false)
        unlockScroll()
      }, transitionDuration)
    })
  }, [isTransitioning, transitionComplete, transitionDuration, lockScroll, unlockScroll])

  // Handle navigation to sections
  const navigateToSection = useCallback((sectionId: string) => {
    if (sectionId === 'home' || sectionId === 'hero') {
      // Go back to hero
      if (transitionComplete) {
        transitionToHero()
      }
    } else {
      // Navigate to other sections
      if (!scrolled && !transitionComplete) {
        // Store pending navigation and trigger transition
        pendingNavigation.current = sectionId
        transitionToNewSection()
      } else {
        // Already in new section, just scroll
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }
    }
  }, [scrolled, transitionComplete, transitionToNewSection, transitionToHero])

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout

    const handleScroll = () => {
      if (isTransitioning || isTouching.current) return
      
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        const currentScrollY = window.scrollY

        // Scroll down to show new page (only from hero)
        if (!scrolled && currentScrollY > scrollThreshold) {
          transitionToNewSection()
        }
        
        lastScrollY.current = currentScrollY
      }, 50)
    }

    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning || isTouching.current) {
        if (e.cancelable) {
          e.preventDefault()
        }
        return
      }
      
      // Detect upward scroll at the top of new section to go back to hero
      if (transitionComplete && window.scrollY <= 10 && e.deltaY < -15) {
        if (e.cancelable) {
          e.preventDefault()
        }
        transitionToHero()
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (!isTransitioning) {
        isTouching.current = true
        touchStartY.current = e.touches[0].clientY
        touchStartTime.current = Date.now()
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isTransitioning) {
        return
      }
      
      const touchEndY = e.touches[0].clientY
      const deltaY = touchEndY - touchStartY.current
      const deltaTime = Date.now() - touchStartTime.current
      const velocity = Math.abs(deltaY / deltaTime)
      
      // Swipe down from hero to next section (deltaY < 0 means swiping up)
      if (!scrolled && !transitionComplete && deltaY < -40 && velocity > 0.3) {
        // Only preventDefault if the event is cancelable (iOS requirement)
        if (e.cancelable) {
          e.preventDefault()
        }
        isTouching.current = false
        transitionToNewSection()
      }
      
      // Swipe up from new section back to hero (deltaY > 0 means swiping down)
      // More lenient conditions: either a medium swipe or a fast swipe
      if (transitionComplete && window.scrollY <= 10 && 
          (deltaY > 40 || (deltaY > 25 && velocity > 0.4))) {
        // Only preventDefault if the event is cancelable (iOS requirement)
        if (e.cancelable) {
          e.preventDefault()
        }
        isTouching.current = false
        transitionToHero()
      }
    }

    const handleTouchEnd = () => {
      setTimeout(() => {
        isTouching.current = false
      }, 100)
    }

    // Custom navigation event handler
    const handleNavigateEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ sectionId: string }>
      navigateToSection(customEvent.detail.sectionId)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: false })
    window.addEventListener("touchend", handleTouchEnd, { passive: true })
    window.addEventListener("touchcancel", handleTouchEnd, { passive: true })
    window.addEventListener("navigateToSection", handleNavigateEvent as EventListener)
    
    return () => {
      clearTimeout(scrollTimeout)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
      window.removeEventListener("touchcancel", handleTouchEnd)
      window.removeEventListener("navigateToSection", handleNavigateEvent as EventListener)
      // Reset scroll lock
      unlockScroll()
    }
  }, [scrolled, isTransitioning, transitionComplete, transitionToNewSection, transitionToHero, unlockScroll, navigateToSection])

  return (
    <>
      {/* Hero section - always present, slides in/out */}
      <div
        className="fixed top-0 left-0 overflow-hidden h-[100dvh]"
        style={{
          width: '100vw',
          WebkitTransform: scrolled 
            ? "translate3d(-100%, 0, 0) scale(0.92)" 
            : "translate3d(0, 0, 0) scale(1)",
          transform: scrolled 
            ? "translate3d(-100%, 0, 0) scale(0.92)" 
            : "translate3d(0, 0, 0) scale(1)",
          opacity: scrolled ? 0 : 1,
          filter: scrolled ? 'blur(12px)' : 'blur(0px)',
          WebkitFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
          transformOrigin: 'center left',
          WebkitTransformOrigin: 'center left',
          zIndex: scrolled ? 0 : 10,
          pointerEvents: scrolled ? "none" : "auto",
          visibility: scrolled && transitionComplete ? 'hidden' : 'visible',
          WebkitTransition: `transform ${transitionDuration}ms cubic-bezier(0.19, 1, 0.22, 1), opacity ${transitionDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), -webkit-filter ${transitionDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), -webkit-transform ${transitionDuration}ms cubic-bezier(0.19, 1, 0.22, 1)`,
          transition: `transform ${transitionDuration}ms cubic-bezier(0.19, 1, 0.22, 1), opacity ${transitionDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), filter ${transitionDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
          willChange: isTransitioning ? 'transform, opacity, filter' : 'auto',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          WebkitOverflowScrolling: 'touch',
        } as React.CSSProperties}
      >
        {heroContent}
      </div>

      {/* New page section - slides in from right, becomes relative after transition */}
      <div
        ref={newPageRef}
        className={`${transitionComplete ? 'relative' : 'fixed'} ${transitionComplete ? '' : 'top-0 left-0'} min-h-screen ${className || ''}`}
        style={{
          width: transitionComplete ? '100%' : '100vw',
          WebkitTransform: transitionComplete 
            ? 'none' 
            : (scrolled ? "translate3d(0, 0, 0)" : "translate3d(100%, 0, 0)"),
          transform: transitionComplete 
            ? 'none' 
            : (scrolled ? "translate3d(0, 0, 0)" : "translate3d(100%, 0, 0)"),
          opacity: transitionComplete ? 1 : (scrolled ? 1 : 0),
          zIndex: scrolled && !transitionComplete ? 5 : 1,
          WebkitTransition: transitionComplete 
            ? 'none' 
            : `transform ${transitionDuration}ms cubic-bezier(0.19, 1, 0.22, 1), opacity ${transitionDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), -webkit-transform ${transitionDuration}ms cubic-bezier(0.19, 1, 0.22, 1)`,
          transition: transitionComplete 
            ? 'none' 
            : `transform ${transitionDuration}ms cubic-bezier(0.19, 1, 0.22, 1), opacity ${transitionDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
          willChange: isTransitioning ? 'transform, opacity' : 'auto',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          WebkitOverflowScrolling: 'touch',
          pointerEvents: scrolled || transitionComplete ? 'auto' : 'none',
        } as React.CSSProperties}
      >
        {(scrolled || transitionComplete) && restContent}
      </div>

      {/* Spacer to allow scroll trigger - only show when on hero */}
      {!scrolled && !transitionComplete && <div className="h-[200vh] w-full"></div>}
    </>
  )
}
