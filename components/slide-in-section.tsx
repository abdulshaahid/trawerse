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

  // While on hero (not transitioned), lock scroll so the page never moves down
  useEffect(() => {
    if (!scrolled && !transitionComplete) {
      lockScroll(0)
    } else {
      unlockScroll()
    }
    return () => {
      // Safety: ensure unlock on unmount
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
    const handleScroll = () => {
      if (isTransitioning || isTouching.current || forceToHero.current) return
      
      const currentScrollY = window.scrollY

      // On hero section, prevent scroll and trigger transition immediately
      if (!scrolled && !transitionComplete && currentScrollY > scrollThreshold && !forceToHero.current) {
        window.scrollTo(0, 0) // Prevent visible scroll
        transitionToNewSection()
      }
      
      lastScrollY.current = currentScrollY
    }

    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning || isTouching.current || forceToHero.current) {
        if (e.cancelable) {
          e.preventDefault()
        }
        return
      }
      
      // On hero section, prevent scroll and trigger transition immediately on downward scroll
      if (!scrolled && !transitionComplete && e.deltaY > 0 && !forceToHero.current) {
        if (e.cancelable) {
          e.preventDefault()
        }
        transitionToNewSection()
        return
      }
      
      // Detect upward scroll at the top of new section to go back to hero
      if (
        transitionComplete &&
        window.scrollY <= 10 &&
        e.deltaY < -15 &&
        Date.now() >= backToHeroAllowedAt.current
      ) {
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
      if (!isTouching.current || isTransitioning || forceToHero.current) return
      
      const touch = e.touches[0]
      const deltaY = touch.clientY - touchStartY.current
      const deltaTime = Date.now() - touchStartTime.current
      const velocity = Math.abs(deltaY / deltaTime)
      
      // On hero section, prevent any scroll and trigger on upward swipe
      if (!scrolled && !transitionComplete && !forceToHero.current) {
        // Prevent scroll on hero
        if (Math.abs(deltaY) > 5 && e.cancelable) {
          e.preventDefault()
        }
        
        // Swipe up to next section (deltaY < 0 means swiping up)
        if (deltaY < -20 && velocity > 0.2) {
          isTouching.current = false
          transitionToNewSection()
        }
      }
      
      // Swipe down from new section back to hero
      if (
        transitionComplete &&
        window.scrollY <= 10 &&
        deltaY > 30 &&
        velocity > 0.3 &&
        Date.now() >= backToHeroAllowedAt.current
      ) {
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