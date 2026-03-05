import { generatePageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CTASection } from "@/components/cta-section";
import { COMPANY } from "@/lib/constants";

export const metadata = generatePageMetadata({
  title: "About Trawerse — Premium Development Studio",
  description:
    "Learn about Trawerse, a premium web development studio founded by passionate developers. We build high-performance websites, mobile apps, SaaS platforms, and custom software for startups and enterprises worldwide.",
  path: "/about",
  keywords: [
    "about Trawerse",
    "web development studio",
    "digital product agency",
    "software development company",
    "passionate developers developer",
  ],
});

export default function AboutPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <Breadcrumbs items={[{ label: "About", href: "/about" }]} />

      {/* Hero Section */}
      <header className="mb-16">
        <p className="text-accent text-sm font-medium uppercase tracking-wider mb-4">
          About Us
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          We Build Digital Products{" "}
          <span className="gradient-text">That Brands Love</span> to Show Off
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Trawerse is a premium development studio. We specialize in creating high-performance
          websites, mobile applications, SaaS platforms, and custom software
          solutions that help businesses scale and succeed in the digital
          landscape.
        </p>
      </header>

      {/* Our Story */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Story</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Founded by{" "}
            <strong className="text-white">{COMPANY.founder}</strong>, Trawerse
            was born from a simple belief: every business deserves a digital
            presence that truly represents the quality of their work. Too many
            companies settle for mediocre websites and apps that fail to capture
            the essence of their brand.
          </p>
          <p>
            We set out to change that. At Trawerse, we combine cutting-edge
            technology with thoughtful design to create digital experiences that
            don't just function — they inspire. Our name, Trawerse, represents
            the journey of traversing across the digital landscape, helping
            businesses navigate the complexities of modern software development.
          </p>
          <p>
            From our first project to today, we've maintained an unwavering
            commitment to quality. Every line of code we write, every pixel we
            place, and every interaction we design is crafted with precision and
            purpose. We don't just build software — we build digital products
            that become competitive advantages for our clients.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Mission</h2>
        <div className="bg-white/[0.05] backdrop-blur-3xl rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
          {/* Subtle glow inside the card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <blockquote className="text-xl md:text-2xl font-medium text-white leading-relaxed relative z-10">
            "To empower businesses with premium digital products that drive
            growth, delight users, and set new standards for quality in software
            development."
          </blockquote>
        </div>
      </section>

      {/* What We Do */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">What We Do</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Web Development",
              desc: "High-performance websites and web applications built with Next.js, React, and modern web technologies.",
            },
            {
              title: "Mobile App Development",
              desc: "Native and cross-platform mobile apps for iOS and Android using React Native and Swift.",
            },
            {
              title: "SaaS Development",
              desc: "End-to-end SaaS platform development with scalable architecture, multi-tenancy, and subscription billing.",
            },
            {
              title: "Startup MVP Development",
              desc: "Rapid MVP development to validate ideas and secure funding. From concept to launch in weeks, not months.",
            },
            {
              title: "UI/UX Design",
              desc: "Research-driven, human-centered design that converts visitors into customers and keeps them coming back.",
            },
            {
              title: "Custom Software",
              desc: "Enterprise-grade custom software tailored to your unique business processes and workflows.",
            },
          ].map((service) => (
            <div
              key={service.title}
              className="bg-white/[0.05] backdrop-blur-2xl rounded-3xl p-8 hover:bg-white/[0.08] transition-all duration-300 group shadow-xl"
            >
              <h3 className="text-lg font-semibold mb-3 group-hover:text-white transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Values */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Values</h2>
        <div className="space-y-6">
          {[
            {
              title: "Quality Over Quantity",
              desc: "We take on fewer projects to deliver exceptional results. Every project gets our full attention and best work.",
            },
            {
              title: "Transparency",
              desc: "No hidden costs, no surprises. We communicate openly throughout the development process and keep you informed at every step.",
            },
            {
              title: "Innovation",
              desc: "We stay at the forefront of technology, using the latest frameworks and best practices to build future-proof solutions.",
            },
            {
              title: "Partnership",
              desc: "We don't just work for you — we work with you. Your success is our success, and we're invested in the long-term growth of your product.",
            },
          ].map((value) => (
            <div key={value.title} className="flex gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technologies */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Technologies We Work With
        </h2>
        <div className="flex flex-wrap gap-3">
          {[
            "Next.js", "React", "TypeScript", "Node.js", "React Native",
            "Swift", "PostgreSQL", "MongoDB", "Redis", "AWS", "Vercel",
            "Docker", "GraphQL", "Tailwind CSS", "Figma", "Supabase",
            "Firebase", "Stripe", "GitHub Actions",
          ].map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 text-sm text-muted-foreground bg-white/[0.08] backdrop-blur-xl rounded-full hover:bg-white/[0.12] hover:text-white transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <CTASection
        headline="Ready to Work Together?"
        description="Let's discuss your project and explore how Trawerse can help bring your digital vision to life."
      />
    </article>
  );
}
