import Link from "next/link";
import { generatePageMetadata, JsonLd, serviceSchema } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CTASection } from "@/components/cta-section";
import { SERVICES } from "@/lib/constants";
import {
  Globe,
  Smartphone,
  Cloud,
  Rocket,
  Palette,
  Settings,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Smartphone,
  Cloud,
  Rocket,
  Palette,
  Settings,
};

export const metadata = generatePageMetadata({
  title: "Our Services — Web, Mobile, SaaS & Custom Software Development",
  description:
    "Trawerse offers premium web development, mobile app development, SaaS development, startup MVP development, UI/UX design, and custom software development services. End-to-end digital product development.",
  path: "/services",
  keywords: [
    "web development services",
    "app development services",
    "SaaS development agency",
    "custom software development company",
    "digital product development",
    "startup MVP development",
    "UI/UX design services",
  ],
});

export default function ServicesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Breadcrumbs items={[{ label: "Services", href: "/services" }]} />

      {/* Hero Section */}
      <header className="mb-16 max-w-3xl">
        <p className="text-accent text-sm font-medium uppercase tracking-wider mb-4">
          Our Services
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          End-to-End{" "}
          <span className="gradient-text">Digital Product</span> Development
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          From concept to launch and beyond — we offer a full spectrum of
          services to bring your digital vision to life. Each service is backed
          by deep technical expertise and a relentless focus on quality.
        </p>
      </header>

      {/* Service Cards Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {SERVICES.map((service) => {
          const Icon = ICON_MAP[service.icon];
          return (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group bg-white/[0.05] backdrop-blur-2xl rounded-3xl p-8 hover:bg-white/[0.08] transition-all duration-300 flex flex-col relative overflow-hidden shadow-xl"
            >
              <JsonLd
                data={serviceSchema({
                  name: service.title,
                  description: service.description,
                  url: `/services/${service.slug}`,
                })}
              />
              {Icon && (
                <div className="w-14 h-14 rounded-2xl bg-white/[0.08] flex items-center justify-center mb-6 group-hover:bg-white/[0.12] transition-colors shadow-inner">
                  <Icon className="w-6 h-6 text-foreground" />
                </div>
              )}
              <h2 className="text-xl font-semibold mb-4 group-hover:text-white transition-colors">
                {service.shortTitle}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
                {service.description}
              </p>
              <div className="flex items-center text-sm font-medium text-muted-foreground group-hover:text-white transition-colors">
                Learn more 
                <svg className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </Link>
          );
        })}
      </section>

      {/* Process Section */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Our Development Process
        </h2>
        <div className="grid md:grid-cols-5 gap-6">
          {[
            {
              step: "01",
              title: "Discovery",
              desc: "Understanding your vision, goals, and requirements through in-depth consultation.",
            },
            {
              step: "02",
              title: "Strategy",
              desc: "Defining the tech stack, architecture, and project roadmap.",
            },
            {
              step: "03",
              title: "Design",
              desc: "Creating wireframes, prototypes, and pixel-perfect UI designs.",
            },
            {
              step: "04",
              title: "Development",
              desc: "Building your product in agile sprints with regular demos.",
            },
            {
              step: "05",
              title: "Launch",
              desc: "Deploying to production with monitoring, support, and optimization.",
            },
          ].map((phase) => (
            <div
              key={phase.step}
              className="text-center  backdrop-blur-2xl rounded-3xl  transition-all duration-300 shadow-xl"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/8 text-white text-xs font-bold tracking-widest mb-4">
                {phase.step}
              </div>
              <h3 className="text-base font-semibold mb-3">
                {phase.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {phase.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </div>
  );
}
