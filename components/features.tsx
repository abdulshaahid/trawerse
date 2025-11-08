"use client"

import { Code, Palette, Rocket, Smartphone, Zap, Globe } from "lucide-react"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"

const features = [
  {
    Icon: Code,
    name: "Custom Development",
    description: "Tailored web solutions built with modern technologies and best practices.",
    href: "#services",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent" />
    ),
    className: "col-span-3 lg:col-span-1",
  },
  {
    Icon: Palette,
    name: "Design Excellence",
    description: "Beautiful, user-centric designs that bring your brand to life.",
    href: "#services",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-transparent" />
    ),
    className: "col-span-3 lg:col-span-2",
  },
  {
    Icon: Zap,
    name: "Lightning Fast",
    description: "Optimized performance for the best user experience.",
    href: "#services",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-transparent to-transparent" />
    ),
    className: "col-span-3 lg:col-span-2",
  },
  {
    Icon: Smartphone,
    name: "Responsive Design",
    description: "Perfect on every device, from mobile to desktop.",
    href: "#services",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-transparent" />
    ),
    className: "col-span-3 lg:col-span-1",
  },
  {
    Icon: Rocket,
    name: "Fast Deployment",
    description: "Quick turnaround times without compromising on quality.",
    href: "#services",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-transparent to-transparent" />
    ),
    className: "col-span-3 lg:col-span-1",
  },
  {
    Icon: Globe,
    name: "Global Reach",
    description: "Built for international audiences with multilingual support.",
    href: "#services",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-transparent to-transparent" />
    ),
    className: "col-span-3 lg:col-span-2",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8" data-animate>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="gradient-text">Trawerse</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We combine cutting-edge technology with stunning design to deliver exceptional digital experiences
          </p>
        </div>

        <BentoGrid>
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}
