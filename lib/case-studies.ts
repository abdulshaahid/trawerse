// ─── Case Study Data Store ───────────────────────────────────────────────────

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  description: string;
  challenge: string;
  solution: string;
  results: { metric: string; value: string; description: string }[];
  technologies: string[];
  services: string[];
  image: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  duration: string;
  year: string;
  featured?: boolean;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "fintech-saas-platform",
    title: "Fintech SaaS Platform — End-to-End Development",
    client: "FinGuard",
    industry: "Financial Technology",
    description:
      "Built a comprehensive fintech SaaS platform from the ground up, enabling real-time financial analytics, automated reporting, and multi-tenant architecture for enterprise clients.",
    challenge:
      "The client needed a robust, SOC 2 compliant platform capable of processing millions of financial transactions daily while providing real-time dashboards and automated compliance reports. Their existing legacy system was slow, unreliable, and couldn't scale to meet growing demand from enterprise clients.",
    solution:
      "We architected a cloud-native SaaS platform using Next.js for the frontend, Node.js microservices for the backend, and PostgreSQL with TimescaleDB for time-series financial data. The platform features real-time WebSocket-based dashboards, automated PDF report generation, multi-tenant isolation, and role-based access control. We implemented CI/CD pipelines with automated testing and deployed on AWS with auto-scaling infrastructure.",
    results: [
      { metric: "Processing Speed", value: "10x", description: "Faster transaction processing compared to legacy system" },
      { metric: "Uptime", value: "99.99%", description: "Platform availability since launch" },
      { metric: "Client Growth", value: "300%", description: "Increase in enterprise customers within 6 months" },
      { metric: "Cost Reduction", value: "60%", description: "Reduction in infrastructure costs" },
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "TimescaleDB", "AWS", "Docker", "Redis", "WebSocket"],
    services: ["SaaS Development", "UI/UX Design", "Cloud Architecture"],
    image: "/assets/projects/fintech-dashboard.jpg",
    testimonial: {
      quote: "Trawerse transformed our vision into a world-class fintech platform. The team's technical depth and attention to detail exceeded our expectations.",
      author: "Alex Chen",
      role: "CTO, FinGuard",
    },
    duration: "6 months",
    year: "2024",
    featured: true,
  },
  {
    slug: "ecommerce-mobile-app",
    title: "E-Commerce Mobile App — Cross-Platform Development",
    client: "StyleHaven",
    industry: "E-Commerce & Retail",
    description:
      "Designed and developed a premium cross-platform mobile app for a fashion e-commerce brand, featuring AR try-on, personalized recommendations, and seamless checkout.",
    challenge:
      "StyleHaven needed a mobile-first shopping experience that could compete with major e-commerce apps. They required AR-powered virtual try-on for accessories, AI-driven product recommendations, and an ultra-fast checkout flow to reduce cart abandonment.",
    solution:
      "We built a cross-platform mobile app using React Native with a custom design system. The app features AR try-on powered by ARKit/ARCore, a machine learning recommendation engine, push notification campaigns, and Apple Pay/Google Pay integration. The backend was built with Node.js and MongoDB, with Cloudflare for CDN and image optimization.",
    results: [
      { metric: "App Store Rating", value: "4.8★", description: "Average rating across iOS and Android" },
      { metric: "Conversion Rate", value: "35%", description: "Increase in mobile conversion rate" },
      { metric: "Downloads", value: "50K+", description: "Downloads in the first month" },
      { metric: "Cart Abandonment", value: "-40%", description: "Reduction in cart abandonment rate" },
    ],
    technologies: ["React Native", "TypeScript", "Node.js", "MongoDB", "ARKit", "Firebase", "Stripe"],
    services: ["Mobile App Development", "UI/UX Design"],
    image: "/assets/projects/ecommerce-app.jpg",
    testimonial: {
      quote: "The app Trawerse built for us immediately became our highest-converting sales channel. The AR try-on feature alone increased add-to-cart rates by 28%.",
      author: "Priya Patel",
      role: "Head of Digital, StyleHaven",
    },
    duration: "4 months",
    year: "2024",
    featured: true,
  },
  {
    slug: "healthcare-startup-mvp",
    title: "Healthcare Startup MVP — Rapid Launch",
    client: "MediConnect",
    industry: "Healthcare Technology",
    description:
      "Rapidly developed an MVP for a healthcare startup connecting patients with specialists through telemedicine, scheduling, and secure health records.",
    challenge:
      "MediConnect had secured seed funding and needed to launch a functional MVP within 8 weeks to demonstrate product-market fit to investors. The platform needed HIPAA-compliant video consultations, appointment scheduling, and electronic health records.",
    solution:
      "We used a lean development approach with Next.js and Supabase for rapid development. The MVP featured real-time video consultations via WebRTC, a smart scheduling system with availability management, secure patient records with end-to-end encryption, and a payment processing system with Stripe. We prioritized the core user journey and launched in 7 weeks.",
    results: [
      { metric: "Time to Launch", value: "7 weeks", description: "From concept to production MVP" },
      { metric: "User Signups", value: "2,000+", description: "Patients registered in first month" },
      { metric: "Funding", value: "$2.5M", description: "Series A raised after MVP validation" },
      { metric: "NPS Score", value: "72", description: "Net Promoter Score from early users" },
    ],
    technologies: ["Next.js", "Supabase", "WebRTC", "Stripe", "Tailwind CSS", "Vercel"],
    services: ["Startup MVP Development", "UI/UX Design", "Web Development"],
    image: "/assets/projects/healthcare-mvp.jpg",
    testimonial: {
      quote: "Trawerse didn't just build our MVP — they helped us think through the product strategy. We launched ahead of schedule and the quality attracted our Series A investors.",
      author: "Dr. Sarah Kim",
      role: "Founder & CEO, MediConnect",
    },
    duration: "7 weeks",
    year: "2025",
    featured: true,
  },
];

export function getAllCaseStudies(): CaseStudy[] {
  return CASE_STUDIES;
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((cs) => cs.slug === slug);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return CASE_STUDIES.filter((cs) => cs.featured);
}
