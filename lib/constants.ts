// ─── Site-wide constants ────────────────────────────────────────────────────

export const SITE_URL = "https://trawerse.com";
export const SITE_NAME = "Trawerse";
export const SITE_TAGLINE = "Premium Digital Product Development Studio";
export const SITE_DESCRIPTION =
  "Trawerse is a premium web development company and digital product studio. We build high-performance websites, mobile apps, SaaS platforms, and custom software for startups and enterprises.";

export const COMPANY = {
  name: "Trawerse",
  legalName: "Trawerse Dev",
  foundingDate: "2024",
  founder: "passionate developers",
  email: "trawerse.dev@gmail.com",
  phone: "+91 6282 669 441",
  address: {
    
    state: "Kerala",
    country: "India",
    zip: "679337",
  },
  social: {
    instagram: "https://instagram.com/trawerse.dev",
    linkedin: "https://www.linkedin.com/company/trawerse-dev/",
    twitter: "https://twitter.com/trawersedev",
    github: "https://github.com/trawerse",
  },
} as const;

// ─── Service Definitions ────────────────────────────────────────────────────

export interface ServiceDefinition {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  keywords: string[];
}

export const SERVICES: ServiceDefinition[] = [
  {
    slug: "web-development",
    title: "Web Development Services",
    shortTitle: "Web Development",
    description:
      "Custom web development solutions built with modern technologies. We create fast, secure, and scalable websites that drive business growth.",
    icon: "Globe",
    keywords: [
      "web development company",
      "custom web development",
      "website development agency",
      "frontend development",
      "fullstack web development",
    ],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development Services",
    shortTitle: "Mobile Apps",
    description:
      "Native and cross-platform mobile app development for iOS and Android. From concept to App Store launch.",
    icon: "Smartphone",
    keywords: [
      "app development company",
      "mobile app development agency",
      "iOS app development",
      "Android app development",
      "React Native development",
    ],
  },
  {
    slug: "saas-development",
    title: "SaaS Development Services",
    shortTitle: "SaaS Development",
    description:
      "End-to-end SaaS product development. We architect, design, and build scalable SaaS platforms from the ground up.",
    icon: "Cloud",
    keywords: [
      "SaaS development agency",
      "SaaS product development",
      "SaaS platform development",
      "cloud application development",
      "subscription software development",
    ],
  },
  {
    slug: "startup-mvp-development",
    title: "Startup MVP Development Services",
    shortTitle: "Startup MVPs",
    description:
      "Rapid MVP development for startups. Validate your idea, launch fast, and iterate based on real user feedback.",
    icon: "Rocket",
    keywords: [
      "startup MVP development",
      "MVP development agency",
      "rapid prototyping",
      "startup development company",
      "minimum viable product development",
    ],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design Services",
    shortTitle: "UI/UX Design",
    description:
      "Human-centered UI/UX design that converts visitors into customers. Research-driven, beautifully crafted interfaces.",
    icon: "Palette",
    keywords: [
      "UI UX design agency",
      "user experience design",
      "user interface design",
      "product design agency",
      "UX research and design",
    ],
  },
  {
    slug: "custom-software-development",
    title: "Custom Software Development Services",
    shortTitle: "Custom Software",
    description:
      "Enterprise-grade custom software development tailored to your business processes. Scalable, secure, and maintainable.",
    icon: "Settings",
    keywords: [
      "custom software development company",
      "bespoke software development",
      "enterprise software development",
      "software development agency",
      "tailored software solutions",
    ],
  },
];

// ─── Navigation Links ────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = {
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
  ],
  services: SERVICES.map((s) => ({
    label: s.shortTitle,
    href: `/services/${s.slug}`,
  })),
  resources: [
    { label: "FAQ", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
  social: [
    { label: "Instagram", href: COMPANY.social.instagram },
    { label: "LinkedIn", href: COMPANY.social.linkedin },
    { label: "Twitter", href: COMPANY.social.twitter },
    { label: "GitHub", href: COMPANY.social.github },
  ],
} as const;
