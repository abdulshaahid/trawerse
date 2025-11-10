"use client"

import React, { useEffect, useRef, useCallback } from "react"
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

export function DotPattern({
  className,
  dotSize = 1.5,
  dotSpacing = 30,
  interactive = true,
  color = "77, 77, 77", // Default dark gray (RGB)
}: DotPatternProps) {
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

  const handleTouchMove = useCallback((e: TouchEvent) => {
    // Don't prevent default to allow normal scrolling
    const touch = e.touches[0]
    if (touch) {
      mousePos.current = {
        x: touch.clientX,
        y: touch.clientY,
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

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      // Use the larger of viewport height or document height to ensure full coverage
      const height = Math.max(window.innerHeight, document.documentElement.scrollHeight)
      canvas.width = window.innerWidth * dpr
      canvas.height = height * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)
    }

    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    if (interactive) {
      // Detect if touch device
      isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      
      window.addEventListener("pointermove", handlePointerMove)
      
      // Add touch-specific handlers for mobile on window level (since canvas has pointer-events-none)
      if (isTouchDevice.current) {
        window.addEventListener("touchmove", handleTouchMove, { passive: true })
        window.addEventListener("touchend", handleTouchEnd, { passive: true })
        window.addEventListener("touchcancel", handleTouchEnd, { passive: true })
      }
    }

    // Responsive dot spacing - closer on mobile
    const isMobile = window.innerWidth < 640
    const responsiveSpacing = isMobile ? dotSpacing * 0.8 : dotSpacing

    // Initialize dots with positions and velocities
    const height = Math.max(window.innerHeight, document.documentElement.scrollHeight)
    const cols = Math.ceil(window.innerWidth / responsiveSpacing)
    const rows = Math.ceil(height / responsiveSpacing)
    
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
          shimmerOffset: Math.random() * Math.PI * 2, // Random phase offset
        })
      }
    }

    // Animation loop
    const animate = () => {
      const height = Math.max(window.innerHeight, document.documentElement.scrollHeight)
      ctx.clearRect(0, 0, window.innerWidth, height)

      dotsRef.current.forEach((dot) => {
        if (interactive) {
          const dx = mousePos.current.x - dot.x
          const dy = mousePos.current.y - dot.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          // Larger interaction radius on mobile for better touch response
          const maxDistance = isTouchDevice.current ? 200 : 150

          if (distance < maxDistance) {
            // Push dots away from cursor/touch
            // Stronger force on mobile for more noticeable effect
            const forceMultiplier = isTouchDevice.current ? 0.8 : 0.5
            const force = (1 - distance / maxDistance) * forceMultiplier
            const angle = Math.atan2(dy, dx)
            dot.vx -= Math.cos(angle) * force
            dot.vy -= Math.sin(angle) * force
          }

          // Apply velocity
          dot.x += dot.vx
          dot.y += dot.vy

          // Spring back to original position
          const returnForce = 0.05
          dot.vx += (dot.originalX - dot.x) * returnForce
          dot.vy += (dot.originalY - dot.y) * returnForce

          // Damping
          dot.vx *= 0.95
          dot.vy *= 0.95
        }

        // Calculate opacity based on distance from original position
        const displacement = Math.sqrt(
          Math.pow(dot.x - dot.originalX, 2) + 
          Math.pow(dot.y - dot.originalY, 2)
        )
        let opacity = Math.min(0.22 + displacement / 50, 0.32)
        
        // Reduce opacity on mobile
        const isMobileView = window.innerWidth < 640
        if (isMobileView) {
          opacity *= 0.63
        }

        ctx.fillStyle = `rgba(${color}, ${opacity})`
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasSize)
      if (interactive) {
        window.removeEventListener("pointermove", handlePointerMove)
        if (isTouchDevice.current) {
          window.removeEventListener("touchmove", handleTouchMove)
          window.removeEventListener("touchend", handleTouchEnd)
          window.removeEventListener("touchcancel", handleTouchEnd)
        }
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [dotSize, dotSpacing, interactive, handlePointerMove, handleTouchMove, handleTouchEnd, color])

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
