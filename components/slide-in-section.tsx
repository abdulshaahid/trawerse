"use client"

import { useEffect, useState, useRef, useCallback, memo } from "react"

interface SlideInSectionProps {
  heroContent: React.ReactNode
  restContent: React.ReactNode
  className?: string
}

const SlideInSection = ({ heroContent, restContent, className }: SlideInSectionProps) => {
  const [scrolled, setScrolled] = useState(false)
  const newPageRef = useRef<HTMLDivElement>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionComplete, setTransitionComplete] = useState(false)
  const lastScrollY = useRef(0)
  const touchStartY = useRef(0)
  const touchStartTime = useRef(0)
  const isTouching = useRef(false)
  const pendingNavigation = useRef<string | null>(null)
  // Cooldown to avoid accidental return to hero immediately after entering new section
  const backToHeroAllowedAt = useRef(0)
  // Guard to force return to hero (e.g., on logo click) and suppress re-entry to new section
  const forceToHero = useRef(false)
  const scrollThreshold = 5
  const transitionDuration = 600

  // Scroll lock helpers (defined early so effects can use them)
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

  // Helper to get current header height as offset for smooth scrolling
  const getHeaderOffset = useCallback(() => {
    if (typeof document === 'undefined') return 84
    const el = document.querySelector('header') as HTMLElement | null
    return el?.offsetHeight ?? 84
  }, [])

  // Robust scroll-to helper with retries to land precisely (avoids overshoot/undershoot)
  const smoothScrollToId = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId)
    if (!el) return
    const computeTop = () => {
      const HEADER_OFFSET = getHeaderOffset() + 8
      return el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
    }
    const scrollOnce = (behavior: ScrollBehavior = 'smooth') => {
      const top = computeTop()
      window.scrollTo({ top, behavior })
    }
    // Initial smooth scroll, then correction passes
    scrollOnce('smooth')
    requestAnimationFrame(() => scrollOnce('smooth'))
    setTimeout(() => scrollOnce('smooth'), 140)
    // Final precise snap without animation to eliminate drift on slower devices
    setTimeout(() => scrollOnce('auto'), 520)
  }, [getHeaderOffset])

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

  // Always start at hero on first mount/refresh
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('sectionState', 'hero')
      window.scrollTo(0, 0)
    }
    setScrolled(false)
    setTransitionComplete(false)
  }, [])

  // While on hero (not transitioned), aggressively lock scroll so the page never moves down
  useEffect(() => {
    if (!scrolled && !transitionComplete) {
      lockScroll(0)
      // Additional aggressive scroll prevention
      const preventScroll = (e: Event) => {
        e.preventDefault()
        e.stopPropagation()
        window.scrollTo(0, 0)
        return false
      }
      
      // Prevent all scroll-related events on hero
      document.addEventListener('scroll', preventScroll, { passive: false, capture: true })
      document.addEventListener('wheel', preventScroll, { passive: false, capture: true })
      document.addEventListener('touchmove', preventScroll, { passive: false, capture: true })
      
      return () => {
        document.removeEventListener('scroll', preventScroll, { capture: true })
        document.removeEventListener('wheel', preventScroll, { capture: true })
        document.removeEventListener('touchmove', preventScroll, { capture: true })
      }
    } else {
      unlockScroll()
    }
  }, [scrolled, transitionComplete, lockScroll, unlockScroll])

  // Persist current section state for reloads
  useEffect(() => {
    if (typeof window === 'undefined') return
    sessionStorage.setItem('sectionState', transitionComplete ? (scrolled ? 'new' : 'hero') : (scrolled ? 'transitioning' : 'hero'))
  }, [scrolled, transitionComplete])

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
        // Prevent immediate bounce back to hero for fast consecutive scrolls
        backToHeroAllowedAt.current = Date.now() + 800
        
        // Handle pending navigation after transition
        if (pendingNavigation.current) {
          const targetId = pendingNavigation.current
          pendingNavigation.current = null
          
          // Wait for DOM to update and scroll
          requestAnimationFrame(() => {
            setTimeout(() => {
              smoothScrollToId(targetId)
            }, 100)
          })
        }
      }, transitionDuration)
    })
  }, [isTransitioning, scrolled, transitionDuration, lockScroll, unlockScroll])

  const transitionToHero = useCallback(() => {
    if (isTransitioning || !transitionComplete) return
    
    setIsTransitioning(true)
    // Lock at current position to avoid visual upward movement before animation
    lockScroll(window.scrollY)
    
    // Force reflow for iOS Safari to recognize the initial state
    requestAnimationFrame(() => {
      // Trigger the actual transition
      setScrolled(false)
      setTransitionComplete(false)
      
      setTimeout(() => {
        setIsTransitioning(false)
        unlockScroll()
        // Ensure scroll is truly at top and release guard
        window.scrollTo(0, 0)
        forceToHero.current = false
      }, transitionDuration)
    })
  }, [isTransitioning, transitionComplete, transitionDuration, lockScroll, unlockScroll])

  // Handle navigation to sections
  const navigateToSection = useCallback((sectionId: string) => {
    if (sectionId === 'home' || sectionId === 'hero') {
      // Go back to hero
      forceToHero.current = true
      // Cancel any pending navigation to other sections
      pendingNavigation.current = null
      if (!scrolled) {
        // Already at hero
        forceToHero.current = false
        return
      }
      if (transitionComplete && scrolled) {
        transitionToHero()
      } else if (scrolled && !isTransitioning) {
        // If we're scrolled but not yet marked complete, delay slightly
        setTimeout(() => transitionToHero(), 0)
      }
    } else {
      // Navigate to other sections
      if (!scrolled && !transitionComplete) {
        // Store pending navigation and trigger transition
        pendingNavigation.current = sectionId
        transitionToNewSection()
      } else {
        // Already in new section, precise scroll
        smoothScrollToId(sectionId)
      }
    }
  }, [scrolled, isTransitioning, transitionComplete, transitionToNewSection, transitionToHero, smoothScrollToId])

  useEffect(() => {
    // Separate event handlers for hero vs new section
    const handleHeroWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (!isTransitioning && !forceToHero.current && e.deltaY > 0) {
        transitionToNewSection()
      }
      return false
    }

    const handleHeroTouchStart = (e: TouchEvent) => {
      if (!isTransitioning && !forceToHero.current) {
        isTouching.current = true
        touchStartY.current = e.touches[0].clientY
        touchStartTime.current = Date.now()
      }
    }

    const handleHeroTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      e.stopPropagation()
      
      if (!isTouching.current || isTransitioning || forceToHero.current) return
      
      const touch = e.touches[0]
      const deltaY = touch.clientY - touchStartY.current
      
      // Trigger transition on upward swipe (scroll down gesture)
      if (deltaY < -10) {
        isTouching.current = false
        transitionToNewSection()
      }
      return false
    }

    const handleHeroTouchEnd = () => {
      isTouching.current = false
    }

    // Regular handlers for new section
    const handleNewSectionWheel = (e: WheelEvent) => {
      // Detect upward scroll at the top of new section to go back to hero
      if (
        window.scrollY <= 10 &&
        e.deltaY < -15 &&
        Date.now() >= backToHeroAllowedAt.current
      ) {
        e.preventDefault()
        transitionToHero()
      }
    }

    const handleNewSectionTouchStart = (e: TouchEvent) => {
      isTouching.current = true
      touchStartY.current = e.touches[0].clientY
      touchStartTime.current = Date.now()
    }

    const handleNewSectionTouchMove = (e: TouchEvent) => {
      if (!isTouching.current) return
      
      const touch = e.touches[0]
      const deltaY = touch.clientY - touchStartY.current
      const deltaTime = Date.now() - touchStartTime.current
      const velocity = Math.abs(deltaY / deltaTime)
      
      // Swipe down from new section back to hero
      if (
        window.scrollY <= 10 &&
        deltaY > 30 &&
        velocity > 0.3 &&
        Date.now() >= backToHeroAllowedAt.current
      ) {
        e.preventDefault()
        isTouching.current = false
        transitionToHero()
      }
    }

    const handleNewSectionTouchEnd = () => {
      isTouching.current = false
    }

    // Apply appropriate handlers based on current state
    if (!scrolled && !transitionComplete) {
      // Hero section - aggressive prevention
      window.addEventListener("wheel", handleHeroWheel, { passive: false, capture: true })
      window.addEventListener("touchstart", handleHeroTouchStart, { passive: true })
      window.addEventListener("touchmove", handleHeroTouchMove, { passive: false, capture: true })
      window.addEventListener("touchend", handleHeroTouchEnd, { passive: true })
      window.addEventListener("touchcancel", handleHeroTouchEnd, { passive: true })
    } else if (transitionComplete) {
      // New section - normal handling
      window.addEventListener("wheel", handleNewSectionWheel, { passive: false })
      window.addEventListener("touchstart", handleNewSectionTouchStart, { passive: true })
      window.addEventListener("touchmove", handleNewSectionTouchMove, { passive: false })
      window.addEventListener("touchend", handleNewSectionTouchEnd, { passive: true })
      window.addEventListener("touchcancel", handleNewSectionTouchEnd, { passive: true })
    }

    // Custom navigation event handler
    const handleNavigateEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ sectionId: string }>
      navigateToSection(customEvent.detail.sectionId)
    }

    window.addEventListener("navigateToSection", handleNavigateEvent as EventListener)
    
    return () => {
      // Remove all possible event listeners
      if (!scrolled && !transitionComplete) {
        window.removeEventListener("wheel", handleHeroWheel, { capture: true })
        window.removeEventListener("touchstart", handleHeroTouchStart)
        window.removeEventListener("touchmove", handleHeroTouchMove, { capture: true })
        window.removeEventListener("touchend", handleHeroTouchEnd)
        window.removeEventListener("touchcancel", handleHeroTouchEnd)
      } else if (transitionComplete) {
        window.removeEventListener("wheel", handleNewSectionWheel)
        window.removeEventListener("touchstart", handleNewSectionTouchStart)
        window.removeEventListener("touchmove", handleNewSectionTouchMove)
        window.removeEventListener("touchend", handleNewSectionTouchEnd)
        window.removeEventListener("touchcancel", handleNewSectionTouchEnd)
      }
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
          overscrollBehavior: 'none',
          WebkitOverflowScrolling: 'auto',
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
      {!scrolled && !transitionComplete && <div className="h-[150vh] w-full"></div>}
    </>
  )
}

export default memo(SlideInSection);