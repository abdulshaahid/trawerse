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

  const handlePointerMove = useCallback((e: PointerEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }

    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    if (interactive) {
      window.addEventListener("pointermove", handlePointerMove)
    }

    // Responsive dot spacing - closer on mobile
    const isMobile = window.innerWidth < 640
    const responsiveSpacing = isMobile ? dotSpacing * 0.8 : dotSpacing

    // Initialize dots with positions and velocities
    const cols = Math.ceil(window.innerWidth / responsiveSpacing)
    const rows = Math.ceil(window.innerHeight / responsiveSpacing)
    
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
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      dotsRef.current.forEach((dot) => {
        if (interactive) {
          const dx = mousePos.current.x - dot.x
          const dy = mousePos.current.y - dot.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 150

          if (distance < maxDistance) {
            // Push dots away from cursor
            const force = (1 - distance / maxDistance) * 0.5
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
        let opacity = Math.min(0.25 + displacement / 50, 0.35)
        
        // Reduce opacity on mobile
        const isMobileView = window.innerWidth < 640
        if (isMobileView) {
          opacity *= 0.72
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
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [dotSize, dotSpacing, interactive, handlePointerMove, color])

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "pointer-events-none fixed inset-0 z-0",
        className
      )}
      style={{ 
        touchAction: "none",
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
      }}
    />
  )
}
