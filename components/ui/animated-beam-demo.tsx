"use client"

import React, { forwardRef, useRef } from "react"

import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/components/ui/animated-beam"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faLaptopCode, faMobile, faUser } from '@fortawesome/free-solid-svg-icons'

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-zinc-950 to-zinc-900 dark:from-zinc-950 dark:to-zinc-900 shadow-lg overflow-hidden relative",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-60" />
      <div className="relative z-10">{children}</div>
    </div>
  )
})

Circle.displayName = "Circle"

export function AnimatedBeamMultipleOutputDemo({
  className,
}: {
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div3Ref = useRef<HTMLDivElement>(null)
  const div6Ref = useRef<HTMLDivElement>(null)
  const div7Ref = useRef<HTMLDivElement>(null)

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden",
        className
      )}
      ref={containerRef}
    >
      <div className="flex size-full max-w-sm flex-row items-stretch justify-between gap-4">
        <div className="flex flex-col justify-center gap-6">
          <Circle ref={div1Ref}>
            <FontAwesomeIcon icon={faCode} className="text-emerald-400 text-xl" />
          </Circle>
          <Circle ref={div2Ref}>
            <FontAwesomeIcon icon={faLaptopCode} className="text-blue-400 text-xl" />
          </Circle>
          <Circle ref={div3Ref}>
            <FontAwesomeIcon icon={faMobile} className="text-purple-400 text-xl" />
          </Circle>
        </div>
        <div className="flex flex-col mr-2 justify-center">
          <Circle ref={div6Ref} className="size-15">
            <img src="/tw.svg" alt="Trawerse Logo" className="w-10 h-10" />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div7Ref}>
            <FontAwesomeIcon icon={faUser} className="text-orange-400 text-xl" />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div6Ref}
        startXOffset={24}
        endXOffset={-32}
        gradientStartColor="#10b981"
        gradientStopColor="#22c55e"
        duration={2}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div6Ref}
        startXOffset={24}
        endXOffset={-32}
        gradientStartColor="#10b981"
        gradientStopColor="#22c55e"
        duration={2}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div6Ref}
        startXOffset={24}
        endXOffset={-32}
        gradientStartColor="#10b981"
        gradientStopColor="#22c55e"
        duration={2}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div7Ref}
        startXOffset={32}
        endXOffset={-24}
        gradientStartColor="#10b981"
        gradientStopColor="#22c55e"
        duration={2}
      />
    </div>
  )
}
