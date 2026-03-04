import Link from "next/link";

interface CTASectionProps {
  headline?: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function CTASection({
  headline = "Ready to Build Something Amazing?",
  description = "Let's turn your vision into a high-performance digital product. Get a free consultation and project estimate today.",
  primaryCta = { label: "Start Your Project", href: "/contact" },
  secondaryCta = { label: "View Our Work", href: "/portfolio" },
}: CTASectionProps) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <div className="bg-white/[0.05] backdrop-blur-3xl rounded-[3rem] px-8 py-12 relative overflow-hidden shadow-2xl">
          {/* Subtle glow inside the card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[400px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
          
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 relative z-10">
            {headline}
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed relative z-10">
            {description}
          </p>
          <div className="flex justify-center relative z-10">
            <Link
              href={primaryCta.href}
              className="px-8 py-4 rounded-full bg-white text-black font-semibold text-base hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-95 shadow-[0_8px_32px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_32px_rgba(255,255,255,0.2)]"
            >
              {primaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
