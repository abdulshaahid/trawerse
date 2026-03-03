"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion"
import { Zap, TrendingUp, Boxes, Activity, ArrowUpRight } from "lucide-react"

interface Metric {
  id: string
  label: string
  value: number
  suffix: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  glowColor: string
  description: string
}

const metrics: Metric[] = [
  {
    id: "performance",
    label: "Performance",
    value: 99,
    suffix: "%",
    icon: Zap,
    color: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.4)",
    description: "Lighthouse score"
  },
  {
    id: "features",
    label: "Features",
    value: 150,
    suffix: "+",
    icon: Boxes,
    color: "#3b82f6",
    glowColor: "rgba(59, 130, 246, 0.4)",
    description: "Components built"
  },
  {
    id: "uptime",
    label: "Uptime",
    value: 99.9,
    suffix: "%",
    icon: TrendingUp,
    color: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.4)",
    description: "Service reliability"
  },
  {
    id: "speed",
    label: "Deploy",
    value: 2.1,
    suffix: "s",
    icon: Activity,
    color: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.4)",
    description: "Avg deploy time"
  }
]

// Animated counter component
function AnimatedNumber({ value, suffix, color, decimals = 0 }: { value: number; suffix: string; color: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const motionVal = useMotionValue(0)
  const rounded = useTransform(motionVal, (v) => decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString())

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionVal, value, {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
      })
      return () => controls.stop()
    }
  }, [isInView, motionVal, value])

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = v + suffix
      }
    })
    return () => unsubscribe()
  }, [rounded, suffix])

  return (
    <span
      ref={ref}
      className="text-xl font-bold tabular-nums tracking-tight"
      style={{ color }}
    >
      0{suffix}
    </span>
  )
}

// Radial progress ring
function RadialRing({ progress, color, glowColor, size = 52, strokeWidth = 3.5 }: {
  progress: number
  color: string
  glowColor: string
  size?: number
  strokeWidth?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  return (
    <div ref={ref} className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        {/* Animated progress ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset: circumference * (1 - progress / 100) } : { strokeDashoffset: circumference }}
          transition={{ duration: 1.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            filter: `drop-shadow(0 0 6px ${glowColor})`,
          }}
        />
      </svg>
      {/* Center glow pulse */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
        }}
        animate={{
          opacity: [0.15, 0.35, 0.15],
          scale: [0.8, 1.1, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

function MetricCard({ metric, delay }: { metric: Metric; delay: number }) {
  const Icon = metric.icon
  const displayProgress = metric.id === "speed" ? 95 : metric.id === "features" ? 100 : metric.value
  const decimals = metric.id === "uptime" ? 1 : metric.id === "speed" ? 1 : 0

  return (
    <motion.div
      className="group relative flex items-center gap-3 p-1.5 rounded-xl transition-colors"
      initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ 
        backgroundColor: "rgba(255,255,255,0.03)",
        x: 4,
        transition: { duration: 0.25 }
      }}
    >
      {/* Radial Ring */}
      <div className="relative flex-shrink-0">
        <RadialRing
          progress={displayProgress}
          color={metric.color}
          glowColor={metric.glowColor}
          size={38}
          strokeWidth={2.5}
        />
        {/* Icon in center */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ color: metric.color }}>
          <Icon className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-white/50 uppercase tracking-wider">{metric.label}</span>
          <motion.div
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            initial={false}
          >
            <ArrowUpRight className="w-3 h-3" style={{ color: metric.color }} strokeWidth={2} />
          </motion.div>
        </div>
        <div className="flex items-baseline gap-1.5 mt-0">
          <AnimatedNumber value={metric.value} suffix={metric.suffix} color={metric.color} decimals={decimals} />
          <span className="text-[10px] text-white/30">{metric.description}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function ScalabilityMetrics() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-1 py-1 pb-2 md:pb-1 space-y-0">
      {/* Mini header */}
      <motion.div 
        className="flex items-center gap-2 mb-0.5 px-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: "#10b981" }}
          animate={{
            opacity: [1, 0.4, 1],
            scale: [1, 0.85, 1],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="text-[10px] font-medium text-white/30 uppercase tracking-widest">Live metrics</span>
      </motion.div>

      {/* Metric cards */}
      {metrics.map((metric, index) => (
        <MetricCard
          key={metric.id}
          metric={metric}
          delay={0.15 + index * 0.1}
        />
      ))}
    </div>
  )
}
