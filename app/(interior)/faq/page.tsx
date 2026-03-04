import { generatePageMetadata, JsonLd, faqSchema } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FAQAccordion } from "@/components/faq-accordion";
import { CTASection } from "@/components/cta-section";

const FAQ_ITEMS = [
  {
    question: "What services does Trawerse offer?",
    answer:
      "Trawerse offers a comprehensive range of digital product development services including web development, mobile app development (iOS & Android), SaaS platform development, startup MVP development, UI/UX design, and custom software development. We handle everything from initial concept and design through to development, testing, and deployment.",
  },
  {
    question: "How much does it cost to build a website or app with Trawerse?",
    answer:
      "Project costs vary depending on complexity, features, and timeline. A typical website project starts from $5,000, mobile apps from $15,000, and SaaS platforms from $25,000. We provide detailed, transparent estimates after understanding your requirements during a free consultation call.",
  },
  {
    question: "How long does it take to build a web application?",
    answer:
      "Timelines depend on the scope of the project. A marketing website typically takes 4-6 weeks, a mobile app 8-16 weeks, and a full SaaS platform 3-6 months. We can also do rapid MVP development in as little as 4-8 weeks to help startups validate their ideas quickly.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "We use modern, battle-tested technologies including Next.js, React, TypeScript, Node.js, React Native, PostgreSQL, MongoDB, Redis, AWS, Vercel, Docker, and more. We choose the best technology stack for each project based on your specific requirements, scalability needs, and budget.",
  },
  {
    question: "Do you work with startups?",
    answer:
      "Absolutely! We love working with startups and have a dedicated MVP development service designed specifically for early-stage companies. We understand the importance of speed, budget efficiency, and product-market fit. Many of our startup clients have gone on to raise significant funding after launching their MVPs with us.",
  },
  {
    question: "Can you redesign an existing website or app?",
    answer:
      "Yes, we frequently help businesses redesign and modernize their existing digital products. Whether it's a complete visual overhaul, performance optimization, or migrating to a modern tech stack, we can assess your current product and recommend the best approach to achieve your goals.",
  },
  {
    question: "Do you provide ongoing maintenance and support?",
    answer:
      "Yes, we offer ongoing maintenance and support packages for all projects we deliver. This includes bug fixes, security updates, performance monitoring, and feature enhancements. We believe in long-term partnerships and want to ensure your product continues to perform at its best.",
  },
  {
    question: "What is your development process?",
    answer:
      "Our development process follows an agile methodology with five key phases: Discovery & Strategy (understanding your needs), Design (UI/UX wireframes and prototypes), Development (building the product in sprints), Testing & QA (thorough quality assurance), and Launch & Support (deployment and ongoing maintenance). We maintain transparent communication throughout with regular updates and demos.",
  },
  {
    question: "Do you sign NDAs?",
    answer:
      "Yes, we are happy to sign Non-Disclosure Agreements before discussing any project details. We take confidentiality seriously and respect the intellectual property of all our clients. Just let us know during your initial inquiry, and we'll send over our NDA for review.",
  },
  {
    question: "How do I get started with Trawerse?",
    answer:
      "Getting started is easy! Simply fill out our contact form or email us at trawerse.dev@gmail.com with a brief description of your project. We'll schedule a free 30-minute consultation call to discuss your requirements, answer any questions, and provide a preliminary estimate. No commitment required.",
  },
];

export const metadata = generatePageMetadata({
  title: "FAQ — Frequently Asked Questions About Our Services",
  description:
    "Find answers to common questions about Trawerse's web development, app development, SaaS, and MVP services. Learn about our process, pricing, technologies, and more.",
  path: "/faq",
  keywords: [
    "Trawerse FAQ",
    "web development FAQ",
    "app development questions",
    "software development process",
    "web development cost",
    "hire web developer FAQ",
  ],
});

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <JsonLd data={faqSchema(FAQ_ITEMS)} />
      <Breadcrumbs items={[{ label: "FAQ", href: "/faq" }]} />

      <header className="mb-12">
        <p className="text-accent text-sm font-medium uppercase tracking-wider mb-4">
          FAQ
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Frequently Asked{" "}
          <span className="gradient-text">Questions</span>
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Whether you're considering working with us for the first time or need
          more details about our services, you'll find answers to the most
          common questions below. Can't find what you're looking for?{" "}
          <a href="/contact" className="text-accent hover:underline">
            Contact us directly
          </a>
          .
        </p>
      </header>

      <FAQAccordion items={FAQ_ITEMS} />

      <CTASection
        headline="Still Have Questions?"
        description="We're always happy to help. Reach out for a free, no-obligation consultation."
        primaryCta={{ label: "Contact Us", href: "/contact" }}
        secondaryCta={{ label: "View Services", href: "/services" }}
      />
    </div>
  );
}
