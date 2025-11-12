"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, ShieldCheck, Lock, AlertTriangle, Activity, KeyRound } from "lucide-react"

interface DataPoint {
  value: number
  timestamp: number
  isSpike?: boolean
}

interface ResourceData {
  codeScans: DataPoint[]
  vulnerabilities: DataPoint[]
  encryption: DataPoint[]
  authentication: DataPoint[]
  threats: DataPoint[]
}

interface Agent {
  id: string
  name: string
  memory: DataPoint[]
  color: string
}

const generateDataPoint = (baseValue: number, variance: number, spikeChance = 0.05): DataPoint => {
  const isSpike = Math.random() < spikeChance
  const multiplier = isSpike ? 1.5 + Math.random() * 0.5 : 1
  const value = Math.max(0, Math.min(100, baseValue + (Math.random() - 0.5) * variance * multiplier))

  return {
    value,
    timestamp: Date.now(),
    isSpike: isSpike && value > 70,
  }
}

const Sparkline = ({
  data,
  color = "#3b82f6",
  spikeColor = "#ef4444",
  width = 60,
  height = 20,
}: {
  data: DataPoint[]
  color?: string
  spikeColor?: string
  width?: number
  height?: number
}) => {
  const pathRef = useRef<SVGPathElement>(null)

  // Return empty SVG if not enough data
  if (data.length < 2) {
    return <svg width={width} height={height} />
  }

  const points = data.map((point, index) => ({
    x: (index / (data.length - 1)) * width,
    y: height - (point.value / 100) * height,
    isSpike: point.isSpike,
  }))

  const path = points.reduce((acc, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}` 
    return `${acc} L ${point.x} ${point.y}` 
  }, "")

  const hasSpikes = points.some((p) => p.isSpike)

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={hasSpikes ? spikeColor : color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={hasSpikes ? spikeColor : color} stopOpacity={0.1} />
        </linearGradient>
      </defs>

      <motion.path
        ref={pathRef}
        d={`${path} L ${width} ${height} L 0 ${height} Z`}
        fill={`url(#gradient-${color})`}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      <motion.path
        d={path}
        fill="none"
        stroke={hasSpikes ? spikeColor : color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* Spike indicators */}
      {points.map((point, index) =>
        point.isSpike ? (
          <motion.circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={2}
            fill={spikeColor}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: index * 0.05,
              type: "spring",
              stiffness: 400,
              damping: 10,
            }}
          />
        ) : null,
      )}
    </svg>
  )
}

const ResourceCard = ({
  icon: Icon,
  label,
  value,
  data,
  color,
  unit = "%",
}: {
  icon: any
  label: string
  value: number
  data: DataPoint[]
  color: string
  unit?: string
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const hasSpikes = data.some((d) => d.isSpike)

  return (
    <motion.div
      className="flex items-center gap-2 p-1.5 rounded-lg transition-colors hover:bg-muted/50"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <motion.div
        className="flex items-center justify-center w-7 h-7 rounded-md bg-gradient-to-br from-zinc-950 to-zinc-900 dark:from-zinc-950 dark:to-zinc-900 overflow-hidden relative"
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-60" />
        <Icon className="w-4 h-4 text-muted-foreground relative z-10" style={{ color }} />
      </motion.div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-muted-foreground">{label}</span>
        </div>
        <div className="mt-1">
          <Sparkline data={data} color={color} />
        </div>
      </div>
    </motion.div>
  )
}

const AgentMemoryCard = ({ agent }: { agent: Agent }) => {
  const [isHovered, setIsHovered] = useState(false)
  const currentValue = agent.memory[agent.memory.length - 1]?.value || 0
  const hasSpikes = agent.memory.some((d) => d.isSpike)

  return (
    <motion.div
      className="flex items-center gap-2 p-2 rounded-md transition-colors hover:bg-muted/30"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <motion.div
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: agent.color }}
        animate={{
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground truncate">{agent.name}</span>
          <motion.span
            className={`font-medium ml-2 ${hasSpikes ? "text-red-500" : "text-foreground"}`}
            style={{ fontSize: '0.65rem' }}
            animate={{ color: hasSpikes ? "#ef4444" : undefined }}
          >
            {currentValue.toFixed(0)}MB
          </motion.span>
        </div>
        <div className="mt-1">
          <Sparkline data={agent.memory} color={agent.color} width={40} height={12} />
        </div>
      </div>
    </motion.div>
  )
}

export default function SystemMonitor() {
  const [resourceData, setResourceData] = useState<ResourceData>({
    codeScans: [],
    vulnerabilities: [],
    encryption: [],
    authentication: [],
    threats: [],
  })

  const [agents] = useState<Agent[]>([
    { id: "1", name: "Security Scanner", memory: [], color: "#06b6d4" },
    { id: "2", name: "Threat Detection", memory: [], color: "#ec4899" },
    { id: "3", name: "Firewall Monitor", memory: [], color: "#84cc16" },
    { id: "4", name: "Access Control", memory: [], color: "#f97316" },
  ])

  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setResourceData((prev) => {
        const maxPoints = 20

        return {
          codeScans: [...prev.codeScans, generateDataPoint(85, 15, 0.08)].slice(-maxPoints),
          vulnerabilities: [...prev.vulnerabilities, generateDataPoint(10, 20, 0.06)].slice(-maxPoints),
          encryption: [...prev.encryption, generateDataPoint(95, 8, 0.05)].slice(-maxPoints),
          authentication: [...prev.authentication, generateDataPoint(90, 12, 0.1)].slice(-maxPoints),
          threats: [...prev.threats, generateDataPoint(5, 15, 0.04)].slice(-maxPoints),
        }
      })

      // Update agent memory
      agents.forEach((agent) => {
        const baseMemory = agent.id === "1" ? 150 : agent.id === "2" ? 200 : agent.id === "3" ? 80 : 120
        const newPoint = generateDataPoint(baseMemory, 50, 0.06)
        agent.memory = [...agent.memory, newPoint].slice(-15)
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [agents])

  const currentCodeScans = resourceData.codeScans[resourceData.codeScans.length - 1]?.value || 0
  const currentVulnerabilities = resourceData.vulnerabilities[resourceData.vulnerabilities.length - 1]?.value || 0
  const currentEncryption = resourceData.encryption[resourceData.encryption.length - 1]?.value || 0
  const currentAuthentication = resourceData.authentication[resourceData.authentication.length - 1]?.value || 0
  const currentThreats = resourceData.threats[resourceData.threats.length - 1]?.value || 0

  const hasAnySpikes = [
    ...resourceData.codeScans,
    ...resourceData.vulnerabilities,
    ...resourceData.encryption,
    ...resourceData.authentication,
    ...resourceData.threats,
    ...agents.flatMap((a) => a.memory),
  ].some((d) => d.isSpike)

  return (
    <div className="w-full h-full">
      <Card className="w-full bg-zinc-950 backdrop-blur-sm border-none shadow-lg relative overflow-hidden" style={{ background: '#0a0a0c' }}>
        {/* Light hitting effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
        
        <motion.div
          className="p-3 cursor-pointer relative z-10"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ backgroundColor: "hsl(var(--muted) / 0.5)" }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: hasAnySpikes ? 360 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Activity className={`w-4 h-4 ${hasAnySpikes ? "text-red-500" : "text-muted-foreground"}`} />
              </motion.div>
              <span className="text-sm font-medium">Security Monitor</span>
              {hasAnySpikes && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Badge className="text-xs text-white px-1.5 py-0.5 bg-emerald-800 hover:bg-emerald-600">
                    Safe
                  </Badge>
                </motion.div>
              )}
            </div>
           
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            <ResourceCard icon={ShieldCheck} label="Code Security" value={currentCodeScans} data={resourceData.codeScans} color="#10b981" unit="%" />
            <ResourceCard icon={AlertTriangle} label="Vulnerabilities" value={currentVulnerabilities} data={resourceData.vulnerabilities} color="#f59e0b" unit="" />
            <ResourceCard icon={Lock} label="Encryption" value={currentEncryption} data={resourceData.encryption} color="#3b82f6" unit="%" />
            <ResourceCard
              icon={KeyRound}
              label="Auth Status"
              value={currentAuthentication}
              data={resourceData.authentication}
              color="#a855f7"
              unit="%"
            />
          </div>
        </motion.div>

        
      </Card>
    </div>
  )
}
