"use client"

import React, { useEffect, useRef, useCallback, memo } from "react"
import { cn } from "@/lib/utils"

interface DotPatternProps {
  className?: string
  dotSize?: number
  dotSpacing?: number
  interactive?: boolean
  color?: string
}

interface Dot {
  x: number
  y: number
  originalX: number
  originalY: number
  vx: number
  vy: number
  shimmerOffset: number
}

const DotPattern: React.FC<DotPatternProps> = ({
  className,
  dotSize = 1.5,
  dotSpacing = 30,
  interactive = true,
  color = "77, 77, 77", // Default dark gray (RGB)
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePos = useRef({ x: -1000, y: -1000 })
  const animationFrameId = useRef<number | undefined>(undefined)
  const dotsRef = useRef<Dot[]>([])
  const timeRef = useRef(0)
  const isTouchDevice = useRef(false)

  const handlePointerMove = useCallback((e: PointerEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }, [])

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const touch = e.touches[0]
    if (touch) {
      const rect = canvas.getBoundingClientRect()
      mousePos.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      }
    }
  }, [])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    // Don't prevent default to allow normal scrolling
    const canvas = canvasRef.current
    if (!canvas) return
    
    const touch = e.touches[0]
    if (touch) {
      const rect = canvas.getBoundingClientRect()
      mousePos.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      }
    }
  }, [])

  const handleTouchEnd = useCallback(() => {
    // Smoothly move cursor off-screen when touch ends
    setTimeout(() => {
      mousePos.current = { x: -1000, y: -1000 }
    }, 300)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { 
      alpha: true,
      desynchronized: true, // Better performance
      willReadFrequently: false
    })
    if (!ctx) return

    // Detect mobile for performance optimizations
    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window
    const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4

    // Set canvas size with performance optimizations
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      // Use the canvas' CSS size (from fixed inset-0) to derive pixel dimensions
      const cssWidth = canvas.clientWidth || window.innerWidth
      const cssHeight = canvas.clientHeight || window.innerHeight
      // Reset transform before applying DPR scale to avoid compounding on resize/hot reload
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      canvas.width = Math.round(cssWidth * dpr)
      canvas.height = Math.round(cssHeight * dpr)
      // Let CSS control layout sizing; no need to set style width/height explicitly
      ctx.scale(dpr, dpr)
    }

    setCanvasSize()
    
    // Throttled resize handler
    let resizeTimeout: NodeJS.Timeout
    const throttledResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(setCanvasSize, 100)
    }
    
    window.addEventListener("resize", throttledResize, { passive: true })

    if (interactive) {
      // Detect if touch device
      isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      
      window.addEventListener("pointermove", handlePointerMove)
      
      // Add touch-specific handlers for mobile on window level (since canvas has pointer-events-none)
      if (isTouchDevice.current) {
        window.addEventListener("touchstart", handleTouchStart, { passive: true })
        window.addEventListener("touchmove", handleTouchMove, { passive: true })
        window.addEventListener("touchend", handleTouchEnd, { passive: true })
        window.addEventListener("touchcancel", handleTouchEnd, { passive: true })
      }
    }

    // Defer heavy initialization and animation start to idle time
    let canceled = false

    const start = () => {
      if (canceled) return

      // Check canvas support first (some older mobile browsers have issues)
      if (!ctx || !canvas) {
        console.warn('Canvas context not available, skipping dot pattern')
        return
      }

      // Responsive dot spacing - closer on mobile
      const isMobileViewInit = window.innerWidth < 640
      const responsiveSpacing = isMobileViewInit ? dotSpacing * 0.8 : dotSpacing

      // Initialize dots using viewport-sized canvas (avoid huge scrollHeight on iOS)
      const dpr = window.devicePixelRatio || 1
      const width = canvas.width / dpr
      const height = canvas.height / dpr
      const cols = Math.ceil(width / responsiveSpacing)
      const rows = Math.ceil(height / responsiveSpacing)
      
      // Reduce dots dramatically on mobile for performance
      const maxDots = isMobileViewInit ? 800 : 2000
      const totalDots = Math.min(cols * rows, maxDots)
      
      dotsRef.current = []
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * responsiveSpacing + responsiveSpacing / 2
          const y = row * responsiveSpacing + responsiveSpacing / 2
          dotsRef.current.push({
            x,
            y,
            originalX: x,
            originalY: y,
            vx: 0,
            vy: 0,
            shimmerOffset: Math.random() * Math.PI * 2,
          })
        }
      }

      // Animation loop with FPS throttling
      let lastFrameTime = 0
      const targetFPS = 30
      const frameInterval = 1000 / targetFPS
      
      const animate = (currentTime: number = 0) => {
        const elapsed = currentTime - lastFrameTime
        
        if (elapsed < frameInterval) {
          animationFrameId.current = requestAnimationFrame(animate)
          return
        }
        
        lastFrameTime = currentTime - (elapsed % frameInterval)
        
        const dpr = window.devicePixelRatio || 1
        const width = canvas.width / dpr
        const height = canvas.height / dpr
        ctx.clearRect(0, 0, width, height)
        
        const isMobileView = window.innerWidth < 640
        const baseOpacity = isMobileView ? 0.16 : 0.22

        dotsRef.current.forEach((dot) => {
          const opacity = baseOpacity
          
          if (interactive) {
            const dx = mousePos.current.x - dot.x
            const dy = mousePos.current.y - dot.y
            const distanceSq = dx * dx + dy * dy
            const maxDistance = isTouchDevice.current ? 200 : 150
            const maxDistanceSq = maxDistance * maxDistance

            if (distanceSq < maxDistanceSq) {
              const distance = Math.sqrt(distanceSq)
              const forceMultiplier = isTouchDevice.current ? 0.8 : 0.5
              const force = (1 - distance / maxDistance) * forceMultiplier
              const angle = Math.atan2(dy, dx)
              dot.vx -= Math.cos(angle) * force
              dot.vy -= Math.sin(angle) * force
            }

            dot.x += dot.vx
            dot.y += dot.vy

            const returnForce = 0.05
            dot.vx += (dot.originalX - dot.x) * returnForce
            dot.vy += (dot.originalY - dot.y) * returnForce

            dot.vx *= 0.95
            dot.vy *= 0.95
          }

          ctx.fillStyle = `rgba(${color}, ${opacity})`
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2)
          ctx.fill()
        })

        animationFrameId.current = requestAnimationFrame(animate)
      }

      animate()
    }

    // Start immediately on mobile for instant visibility
    if (isMobile) {
      // Immediate start on mobile
      start()
    } else {
      // Defer on desktop for performance
      if ('requestIdleCallback' in window) {
        ;(window as any).requestIdleCallback(() => !canceled && start(), { timeout: 1000 })
      } else {
        setTimeout(() => !canceled && start(), 50)
      }
    }

    return () => {
      window.removeEventListener("resize", throttledResize)
      canceled = true
      if (interactive) {
        window.removeEventListener("pointermove", handlePointerMove)
        if (isTouchDevice.current) {
          window.removeEventListener("touchstart", handleTouchStart)
          window.removeEventListener("touchmove", handleTouchMove)
          window.removeEventListener("touchend", handleTouchEnd)
          window.removeEventListener("touchcancel", handleTouchEnd)
        }
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [dotSize, dotSpacing, interactive, handlePointerMove, handleTouchStart, handleTouchMove, handleTouchEnd, color])

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "fixed inset-0 z-0 pointer-events-none",
        className
      )}
      style={{ 
        touchAction: "pan-y pan-x",
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        pointerEvents: 'none', // Allow events to pass through to elements below
      }}
    />
  )
}

export const DotPatternMemoized = memo(DotPattern)
export { DotPatternMemoized as DotPattern }
