"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Zap, TrendingUp, Boxes, Infinity } from "lucide-react"

interface Metric {
  id: string
  label: string
  value: number
  maxValue: number
  icon: React.ComponentType<{ className?: string }>
  color: string
  suffix: string
}

const metrics: Metric[] = [
  {
    id: "performance",
    label: "Performance",
    value: 99,
    maxValue: 100,
    icon: Zap,
    color: "#10b981",
    suffix: "%"
  },
  {
    id: "features",
    label: "Features",
    value: 150,
    maxValue: 150,
    icon: Boxes,
    color: "#3b82f6",
    suffix: "+"
  },
  {
    id: "uptime",
    label: "Uptime",
    value: 99.9,
    maxValue: 100,
    icon: TrendingUp,
    color: "#a855f7",
    suffix: "%"
  },
  {
    id: "scalability",
    label: "Scalability",
    value: 100,
    maxValue: 100,
    icon: Infinity,
    color: "#f59e0b",
    suffix: "∞"
  }
]

const MetricBar = ({ metric, delay }: { metric: Metric; delay: number }) => {
  const [isVisible, setIsVisible] = useState(false)
  const Icon = metric.icon
  const percentage = (metric.value / metric.maxValue) * 100

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay / 1000, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="group"
    >
      <div className="flex items-center gap-3">
        <div 
          className="flex items-center justify-center w-7 h-7 rounded-md bg-zinc-900 dark:bg-zinc-800 transition-transform group-hover:scale-110"
          style={{ color: metric.color }}
        >
          <Icon className="w-4 h-4" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-sm font-medium text-foreground/70 truncate">{metric.label}</span>
            <motion.span
              className="text-sm font-bold tabular-nums"
              style={{ color: metric.color }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: (delay + 200) / 1000, type: "spring", stiffness: 300, damping: 15 }}
            >
              {metric.id === "uptime" ? metric.value.toFixed(1) : metric.value}{metric.suffix}
            </motion.span>
          </div>
          
          <div className="relative h-2 bg-zinc-900/40 dark:bg-zinc-800/40 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ 
                background: `linear-gradient(90deg, ${metric.color}bb, ${metric.color})`,
                boxShadow: `0 0 8px ${metric.color}55`
              }}
              initial={{ width: 0 }}
              animate={{ width: isVisible ? `${percentage}%` : 0 }}
              transition={{ 
                delay: delay / 1000,
                duration: 1.2,
                ease: [0.34, 1.56, 0.64, 1]
              }}
            />
            
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 opacity-40"
              style={{
                background: `linear-gradient(90deg, transparent, ${metric.color}66, transparent)`,
              }}
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{
                delay: (delay + 1200) / 1000,
                duration: 1.8,
                repeat: Infinity,
                repeatDelay: 2.5,
                ease: "linear"
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ScalabilityMetrics() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-5 py-4 pb-8 md:pb-4 space-y-3.5">
      {metrics.map((metric, index) => (
        <MetricBar 
          key={metric.id} 
          metric={metric} 
          delay={index * 120}
        />
      ))}
    </div>
  )
}
