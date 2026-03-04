import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { SERVICES } from "@/lib/constants";
import {
  generatePageMetadata,
  JsonLd,
  serviceSchema,
  faqSchema,
} from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FAQAccordion } from "@/components/faq-accordion";
import { CTASection } from "@/components/cta-section";

// ─── Static Generation ───────────────────────────────────────────────────────

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

// ─── Service Page Content Data ───────────────────────────────────────────────

const SERVICE_CONTENT: Record<
  string,
  {
    hero: string;
    intro: string;
    sections: { title: string; content: string }[];
    benefits: { title: string; desc: string }[];
    techStack: string[];
    faqs: { question: string; answer: string }[];
    relatedServices: string[];
  }
> = {
  "web-development": {
    hero: "Custom Web Development That Drives Business Growth",
    intro:
      "In today's digital-first world, your website is your most powerful business asset. At Trawerse, we build high-performance, SEO-optimized web applications using cutting-edge technologies like Next.js, React, and TypeScript. Our custom web development services are designed to deliver fast, secure, and scalable websites that convert visitors into customers and drive measurable business growth. Whether you need a corporate website, an e-commerce platform, a web application, or a complex enterprise portal, our team has the expertise to deliver solutions that exceed expectations.",
    sections: [
      {
        title: "Why Custom Web Development Matters",
        content:
          "Off-the-shelf website builders and templates may seem like a quick fix, but they come with significant limitations. They're slow, bloated with unnecessary code, and virtually impossible to customize for unique business needs. Custom web development gives you complete control over your digital presence — from performance optimization and SEO to user experience and security. A custom-built website loads faster, ranks higher on Google, provides a better user experience, and can be tailored precisely to your business workflows. Studies show that a 1-second delay in page load time can result in a 7% reduction in conversions. With custom development, every millisecond is optimized.\n\nAt Trawerse, we don't just write code — we architect digital experiences. Every project begins with a thorough understanding of your business goals, target audience, and competitive landscape. We then design and build a solution that positions you ahead of the competition.",
      },
      {
        title: "Our Web Development Approach",
        content:
          "We follow a systematic, iterative development process that ensures quality at every stage. Starting with discovery and strategy, we work with you to define the project scope, user personas, and key performance indicators (KPIs). Our design team creates wireframes and interactive prototypes, giving you a clear vision of the final product before a single line of code is written.\n\nDevelopment happens in agile sprints, with regular demos and feedback sessions. We use modern frameworks like Next.js for server-side rendering and static site generation, ensuring your website loads instantly and ranks high on search engines. Our code is clean, well-documented, and maintainable — because we believe in building for the long term.\n\nBefore launch, every project goes through rigorous quality assurance, including cross-browser testing, responsive design testing, performance audits, accessibility checks, and security reviews. We don't ship until everything meets our premium quality standards.",
      },
      {
        title: "Types of Web Development Projects We Handle",
        content:
          "Our web development expertise spans a wide range of project types. We build corporate and business websites that establish authority and credibility. We develop e-commerce platforms with custom checkout flows, payment processing, and inventory management. We create web applications with complex business logic, real-time data, and user authentication.\n\nWe also specialize in Progressive Web Apps (PWAs) that work offline and provide native-app-like experiences, landing pages optimized for conversions and lead generation, and headless CMS implementations that separate content management from the frontend for maximum flexibility and performance. No matter the complexity or scale of your project, we have the technical chops to deliver.",
      },
      {
        title: "Performance & SEO Optimization",
        content:
          "Every website we build is optimized for both performance and search engine visibility. We implement server-side rendering (SSR) and static site generation (SSG) using Next.js to ensure your pages load in under 1 second. We optimize images, fonts, and assets for minimal bandwidth usage. We implement lazy loading, code splitting, and edge caching for near-instant page transitions.\n\nFrom an SEO perspective, we ensure clean semantic HTML, proper heading hierarchy, meta tags, structured data (JSON-LD), dynamic sitemaps, canonical URLs, and Core Web Vitals optimization. Our websites consistently score 95-100 on Google Lighthouse audits.",
      },
    ],
    benefits: [
      { title: "Lightning Fast", desc: "Sub-second load times with SSR/SSG and edge deployment" },
      { title: "SEO Optimized", desc: "Built from the ground up for search engine visibility" },
      { title: "Fully Responsive", desc: "Perfect experience across all devices and screen sizes" },
      { title: "Scalable Architecture", desc: "Built to grow with your business without rewrites" },
      { title: "Accessible", desc: "WCAG compliant, ensuring your website is usable by everyone" },
      { title: "Secure", desc: "Best-practice security measures and regular updates" },
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Vercel", "AWS"],
    faqs: [
      {
        question: "How long does it take to build a custom website?",
        answer:
          "A typical website project takes 4-8 weeks depending on complexity. Simple marketing sites can be completed in 4 weeks, while complex web applications may take 8-12 weeks. We'll provide a detailed timeline during our initial consultation.",
      },
      {
        question: "Do you use WordPress or website builders?",
        answer:
          "No, we specialize in custom development using modern frameworks like Next.js and React. This approach delivers significantly better performance, SEO, and customization compared to WordPress or page builders. Our sites typically load 3-5x faster than WordPress sites.",
      },
      {
        question: "Will my website be optimized for search engines?",
        answer:
          "Absolutely. SEO is built into every project from day one. We implement server-side rendering, structured data, semantic HTML, meta tags, sitemaps, and Core Web Vitals optimization. Our sites consistently score 95-100 on Google Lighthouse.",
      },
      {
        question: "Can you help with website hosting and maintenance?",
        answer:
          "Yes, we can deploy your website on modern platforms like Vercel or AWS with optimal performance configurations. We also offer ongoing maintenance packages that include security updates, performance monitoring, and feature enhancements.",
      },
      {
        question: "What does a custom website cost?",
        answer:
          "Custom website projects typically start from $5,000 for a marketing site and can range up to $50,000+ for complex web applications. We provide detailed, transparent estimates based on your specific requirements. Contact us for a free consultation and quote.",
      },
    ],
    relatedServices: ["ui-ux-design", "saas-development", "custom-software-development"],
  },
  "mobile-app-development": {
    hero: "Mobile App Development for iOS & Android",
    intro:
      "Build a mobile app that your users will love. Trawerse develops native and cross-platform mobile applications for iOS and Android that deliver exceptional user experiences and drive real business results. From consumer apps to enterprise solutions, we combine beautiful design with robust engineering to create mobile products that stand out in crowded app stores. Our mobile development team has extensive experience building apps across industries including fintech, healthcare, e-commerce, social networking, and enterprise productivity. We understand the nuances of mobile development — from platform-specific design guidelines to performance optimization, push notification strategies, and app store optimization (ASO).",
    sections: [
      {
        title: "Native vs Cross-Platform Development",
        content:
          "One of the first decisions in mobile app development is choosing between native and cross-platform development. Native development (Swift for iOS, Kotlin for Android) provides the best performance and full access to platform APIs but requires maintaining two separate codebases. Cross-platform frameworks like React Native allow you to build for both platforms with a single codebase, significantly reducing development time and cost.\n\nAt Trawerse, we typically recommend React Native for most projects because it provides near-native performance while allowing 80-90% code sharing between iOS and Android. This means faster development, lower costs, and easier maintenance — without sacrificing user experience. For projects that require maximum performance (gaming, AR/VR, complex animations) or deep platform integration, we recommend native development.",
      },
      {
        title: "Our Mobile App Development Process",
        content:
          "Every mobile app project begins with a thorough discovery phase where we understand your target audience, business model, and competitive landscape. We then create detailed user flows, wireframes, and interactive prototypes that you can test before development begins.\n\nDuring development, we follow agile methodology with 2-week sprints. Each sprint delivers working features that you can test on real devices. We implement CI/CD pipelines for automated testing and deployment, ensuring code quality and rapid iteration. Before launch, we conduct extensive QA testing across multiple devices and OS versions, performance profiling, security audits, and accessibility checks.",
      },
      {
        title: "App Store Launch & Growth",
        content:
          "Building the app is only half the journey. We also help with app store submission, including crafting compelling app descriptions, screenshots, and metadata optimized for App Store Optimization (ASO). We ensure your app meets all Apple App Store and Google Play Store guidelines to avoid rejection.\n\nPost-launch, we provide analytics integration, crash monitoring, performance tracking, and ongoing maintenance. We can also help with push notification strategies, user retention campaigns, and iterating on features based on user feedback and analytics data.",
      },
      {
        title: "Enterprise Mobile Solutions",
        content:
          "For enterprise clients, we build secure, scalable mobile solutions that integrate with existing systems and workflows. This includes employee-facing applications with role-based access, real-time data synchronization, offline-first capabilities, and compliance with industry regulations (HIPAA, SOC 2, GDPR). We understand that enterprise mobile apps need to be reliable, secure, and maintainable at scale.",
      },
    ],
    benefits: [
      { title: "Cross-Platform", desc: "One codebase, both iOS and Android — 80-90% code sharing" },
      { title: "Native Performance", desc: "Smooth 60fps animations and instant interactions" },
      { title: "Offline Support", desc: "Apps that work reliably even without internet connectivity" },
      { title: "Push Notifications", desc: "Engage users with targeted, personalized notifications" },
      { title: "App Store Ready", desc: "Full support from development through app store submission" },
      { title: "Analytics Built-in", desc: "Understand user behavior with integrated analytics" },
    ],
    techStack: ["React Native", "Swift", "TypeScript", "Node.js", "Firebase", "MongoDB", "Stripe", "AWS"],
    faqs: [
      {
        question: "How much does it cost to build a mobile app?",
        answer:
          "Mobile app development costs typically range from $15,000 to $100,000+ depending on complexity, features, and platform requirements. A simple app with basic features starts around $15,000, while a complex app with custom backends, real-time features, and integrations can cost $50,000-100,000+.",
      },
      {
        question: "How long does it take to develop a mobile app?",
        answer:
          "Most mobile app projects take 8-16 weeks from design to launch. A simple app with core features can be completed in 8-10 weeks, while more complex applications may take 12-16 weeks or longer.",
      },
      {
        question: "Should I build for iOS or Android first?",
        answer:
          "With React Native, you can build for both platforms simultaneously. If you must choose one, consider where your target audience is. iOS users tend to have higher spending power, while Android has a larger global market share. We'll help you make the right decision based on your specific market.",
      },
      {
        question: "Do you handle app store submissions?",
        answer:
          "Yes! We handle the entire app store submission process for both Apple App Store and Google Play Store, including creating store listings, screenshots, metadata, and ensuring compliance with all guidelines.",
      },
    ],
    relatedServices: ["ui-ux-design", "startup-mvp-development", "web-development"],
  },
  "saas-development": {
    hero: "SaaS Platform Development — From Zero to Scale",
    intro:
      "Building a successful SaaS product requires more than just writing code — it requires deep understanding of subscription business models, multi-tenant architecture, scalability patterns, and user onboarding flows. At Trawerse, we specialize in end-to-end SaaS development, helping businesses transform their ideas into revenue-generating platforms that scale. We've built SaaS platforms across industries including fintech, healthcare, HR tech, marketing tech, and project management. Our team understands the unique challenges of SaaS development — from designing intuitive onboarding experiences that reduce churn to architecting multi-tenant systems that can serve thousands of concurrent users without breaking a sweat.",
    sections: [
      {
        title: "SaaS Architecture & Technical Foundation",
        content:
          "The architecture decisions you make early in SaaS development have long-lasting implications for scalability, security, and maintenance costs. At Trawerse, we design SaaS architectures that are built to scale from day one. We implement multi-tenant architectures that efficiently isolate customer data while maximizing resource utilization.\n\nOur typical SaaS stack includes Next.js for the frontend (with server-side rendering for SEO and performance), Node.js or Python for backend services, PostgreSQL for relational data, Redis for caching and sessions, and cloud infrastructure on AWS or Vercel for auto-scaling. We implement event-driven architectures with message queues for handling background jobs, webhooks, and integrations.",
      },
      {
        title: "Subscription & Billing Systems",
        content:
          "A SaaS platform is only as good as its billing system. We integrate robust subscription management using Stripe or similar payment processors, supporting multiple pricing tiers, free trials, annual/monthly billing cycles, proration, usage-based billing, and coupon codes. We build admin dashboards that give you full visibility into MRR, churn rate, customer lifetime value, and other critical SaaS metrics.\n\nWe also implement account management features including team management with role-based access control, usage limits and overage handling, account suspension and reactivation, and invoice generation with tax compliance.",
      },
      {
        title: "User Onboarding & Retention",
        content:
          "The first five minutes of a user's experience with your SaaS product are critical. We design and build onboarding flows that guide users to their 'aha moment' as quickly as possible. This includes interactive product tours, progressive profile completion, contextual tooltips, email drip sequences, and in-app messaging.\n\nFor retention, we implement feature adoption tracking, NPS surveys, feedback collection, and churn prediction signals. We help you build the analytics infrastructure needed to understand user behavior and make data-driven decisions about product development.",
      },
      {
        title: "Security & Compliance",
        content:
          "SaaS platforms handle sensitive customer data, making security a top priority. We implement industry-standard security measures including end-to-end encryption, OAuth 2.0 / SSO authentication, audit logging, data backup and disaster recovery, and compliance with relevant regulations (GDPR, SOC 2, HIPAA where applicable). We follow OWASP security best practices and conduct regular security reviews throughout development.",
      },
    ],
    benefits: [
      { title: "Multi-Tenant Architecture", desc: "Efficient data isolation while maximizing resource utilization" },
      { title: "Subscription Billing", desc: "Stripe integration with multiple pricing tiers and billing cycles" },
      { title: "Auto-Scaling", desc: "Cloud infrastructure that automatically scales with demand" },
      { title: "Real-Time Features", desc: "WebSocket-based live updates, notifications, and collaboration" },
      { title: "Admin Dashboard", desc: "Full visibility into users, revenue, and product metrics" },
      { title: "API-First Design", desc: "RESTful or GraphQL APIs for integrations and mobile clients" },
    ],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Stripe", "AWS", "Docker", "WebSocket"],
    faqs: [
      {
        question: "How much does it cost to build a SaaS platform?",
        answer:
          "SaaS development typically costs between $25,000 and $150,000+ depending on complexity. An MVP SaaS with core features starts around $25,000-50,000, while a full-featured platform with integrations, advanced analytics, and enterprise features can cost $75,000-150,000+.",
      },
      {
        question: "How long does it take to build a SaaS product?",
        answer:
          "An MVP SaaS platform typically takes 3-4 months to build. A more comprehensive product with advanced features can take 4-8 months. We recommend starting with an MVP to validate your market, then iterating based on user feedback.",
      },
      {
        question: "Can you help with SaaS product strategy?",
        answer:
          "Yes, we go beyond just development. We help with product strategy including feature prioritization, pricing model design, competitive analysis, and go-to-market planning. Our experience building multiple SaaS products gives us valuable insights into what works.",
      },
      {
        question: "Do you support subscription billing with multiple tiers?",
        answer:
          "Absolutely. We integrate with Stripe to support multiple pricing tiers, free trials, annual and monthly billing, usage-based pricing, coupon codes, and enterprise custom pricing. We build the full billing infrastructure including invoicing and tax handling.",
      },
    ],
    relatedServices: ["web-development", "ui-ux-design", "custom-software-development"],
  },
  "startup-mvp-development": {
    hero: "Startup MVP Development — Launch Fast, Learn Faster",
    intro:
      "Have a startup idea? We'll help you build, launch, and validate it — fast. At Trawerse, we specialize in rapid MVP (Minimum Viable Product) development for startups and entrepreneurs. Our lean development approach gets your product to market in weeks, not months, so you can start gathering real user feedback and demonstrating traction to investors. We've helped startups across healthcare, fintech, e-commerce, and SaaS launch successful MVPs that went on to raise millions in funding. We understand the startup journey — the urgency, the budget constraints, and the need to move fast without cutting corners on quality.",
    sections: [
      {
        title: "What Makes a Great MVP",
        content:
          "A great MVP is not a scaled-down version of your full vision — it's a focused product that solves one core problem exceptionally well. The goal is to validate your most critical assumptions with real users in the shortest possible time. This requires ruthless prioritization: identifying the core value proposition, defining the minimum feature set that delivers that value, and cutting everything else.\n\nAt Trawerse, we work with you to define the scope of your MVP using frameworks like the Lean Canvas and user story mapping. We help you identify your riskiest assumptions and design experiments to validate them. The result is an MVP that's strategically designed to maximize learning while minimizing cost and development time.",
      },
      {
        title: "Our Rapid Development Approach",
        content:
          "Speed is critical for startups, which is why we've optimized our development process for rapid delivery. We use proven technology stacks (Next.js, Supabase, Vercel) that allow us to move fast without sacrificing quality. We leverage pre-built components and libraries where appropriate, custom-building only what needs to be unique.\n\nOur typical MVP timeline is 4-8 weeks from kickoff to launch. Week 1 is dedicated to strategy and design. Weeks 2-6 are focused development sprints. Week 7 is QA and bug fixes. Week 8 is launch preparation and deployment. Throughout, we maintain open communication and involve you in every decision.",
      },
      {
        title: "Investor-Ready Products",
        content:
          "If you're building to raise funding, your MVP needs to impress. Investors don't just evaluate ideas — they evaluate execution. A polished, well-built MVP demonstrates that you can execute and that there's real demand for your product. We build MVPs with production-quality code and design that you can be proud to demo.\n\nWe can also help with pitch deck design support, analytics setup for tracking key metrics, scalable architecture that won't need a rewrite when you scale, and cloud deployment for reliable uptime during investor demos.",
      },
      {
        title: "From MVP to Scale",
        content:
          "The best MVPs are designed for iteration. We build with scalable architectures and clean codebases that can evolve as your product grows. After launch, we can continue working with you to iterate on features based on user feedback, optimize conversion funnels, add new capabilities, and scale your infrastructure as your user base grows.\n\nMany of our startup clients started with an MVP engagement and evolved into long-term product development partnerships as they grew.",
      },
    ],
    benefits: [
      { title: "4-8 Week Launch", desc: "From idea to production in weeks, not months" },
      { title: "Lean & Focused", desc: "Core features only — validate your assumptions fast" },
      { title: "Scalable Foundation", desc: "Architecture that grows with you, no rewrites needed" },
      { title: "Investor-Ready", desc: "Production-quality product for demos and pitch meetings" },
      { title: "Budget-Friendly", desc: "Get to market with a fraction of full-product investment" },
      { title: "Iteration Support", desc: "Ongoing development as you learn and grow" },
    ],
    techStack: ["Next.js", "React", "Supabase", "TypeScript", "Vercel", "Stripe", "Tailwind CSS", "Firebase"],
    faqs: [
      {
        question: "How much does MVP development cost?",
        answer:
          "MVP development typically costs between $10,000 and $40,000 depending on the complexity and feature set. A lean MVP with essential features can be built for $10,000-20,000, while a more feature-rich MVP may cost $25,000-40,000.",
      },
      {
        question: "How fast can you build an MVP?",
        answer:
          "We can typically deliver an MVP in 4-8 weeks. The exact timeline depends on the complexity of your product and the scope of features. We work with you to prioritize features and create a realistic timeline during our discovery phase.",
      },
      {
        question: "Will the MVP code be production-ready or just a prototype?",
        answer:
          "Our MVPs are built with production-quality code, not throwaway prototypes. We use the same technologies and engineering practices as our full-scale projects, so your codebase can evolve and scale without needing a rewrite.",
      },
      {
        question: "Can you help me raise funding?",
        answer:
          "While we're not an investment firm, we can help you build a product that's investor-ready. We've worked with multiple startups that went on to raise significant funding after launching their MVPs with us. A polished, well-built product speaks volumes to investors.",
      },
    ],
    relatedServices: ["ui-ux-design", "web-development", "mobile-app-development"],
  },
  "ui-ux-design": {
    hero: "UI/UX Design That Converts Visitors Into Customers",
    intro:
      "Great design is not just about looking good — it's about solving problems, guiding users, and driving business outcomes. At Trawerse, our UI/UX design services are rooted in research, strategy, and a deep understanding of user behavior. We create interfaces that are visually stunning, intuitively usable, and optimized for conversion. Whether you're designing a new product from scratch or redesigning an existing one, our design process ensures that every pixel serves a purpose. We don't decorate — we design with intention, creating experiences that your users will love and your business will benefit from.",
    sections: [
      {
        title: "Research-Driven Design Process",
        content:
          "Great design starts with understanding. Before we open Figma, we invest time in understanding your users, your business, and your competitive landscape. This includes user research through interviews, surveys, and behavioral analysis. We conduct competitive analysis to understand market expectations and identify opportunities for differentiation.\n\nWe create detailed user personas, journey maps, and information architectures that serve as the foundation for all design decisions. This research-driven approach ensures that our designs aren't just beautiful — they're strategically aligned with your business goals and user needs.",
      },
      {
        title: "From Wireframes to Pixel-Perfect Design",
        content:
          "Our design process moves from low-fidelity to high-fidelity in stages, giving you multiple opportunities to provide feedback and course-correct. We start with wireframes — skeletal layouts that focus on content hierarchy, user flows, and functionality. Once the wireframes are approved, we create interactive prototypes that you can test with real users.\n\nFinally, we create pixel-perfect UI designs with a comprehensive design system including typography, color palette, spacing, component library, and interaction patterns. Our design systems are built for scalability — making it easy to add new pages and features while maintaining visual consistency.",
      },
      {
        title: "Conversion-Optimized Interfaces",
        content:
          "We don't just design for aesthetics — we design for results. Every interface we create is optimized for conversion. This means clear call-to-action hierarchy, reducing friction in key user flows, strategic use of whitespace and visual emphasis, trust signals and social proof placement, and mobile-first responsive design.\n\nWe understand the psychology behind user decisions and use proven design patterns to guide users toward desired actions — whether that's signing up, making a purchase, or requesting a consultation.",
      },
      {
        title: "Design Systems & Brand Guidelines",
        content:
          "For larger products and organizations, we create comprehensive design systems that ensure consistency across all touchpoints. A design system includes a component library with all UI elements, design tokens for colors, typography, and spacing, interaction patterns and micro-animations, accessibility guidelines and standards, and detailed documentation for developers.\n\nThis investment pays dividends as your product grows — new pages and features can be built faster and more consistently, and handoff to developers is seamless.",
      },
    ],
    benefits: [
      { title: "Research-Driven", desc: "Every design decision is backed by user research and data" },
      { title: "Conversion Focused", desc: "Interfaces designed to drive business outcomes, not just look pretty" },
      { title: "Design Systems", desc: "Scalable design systems for consistent brand experience" },
      { title: "Interactive Prototypes", desc: "Test with real users before writing a single line of code" },
      { title: "Mobile-First", desc: "Responsive designs that look perfect on every screen size" },
      { title: "Developer-Ready", desc: "Pixel-perfect designs with clear specs for seamless handoff" },
    ],
    techStack: ["Figma", "Framer", "Adobe Creative Suite", "Maze", "Hotjar", "Google Analytics", "Principle", "Lottie"],
    faqs: [
      {
        question: "What's your design process?",
        answer:
          "Our design process has four phases: Research (user interviews, competitive analysis, personas), Strategy (information architecture, user flows), Design (wireframes, prototypes, UI design), and Validation (usability testing, iteration). We keep you involved at every stage with regular reviews and feedback sessions.",
      },
      {
        question: "Do you do design only, or design + development?",
        answer:
          "Both! We can handle design as a standalone service, delivering Figma files and design system documentation. But we recommend our full design + development service for the best results — it ensures perfect translation of design into code with no fidelity loss.",
      },
      {
        question: "How much does UI/UX design cost?",
        answer:
          "UI/UX design projects range from $5,000 for a small project to $30,000+ for a comprehensive product design including research, design system, and prototype. The cost depends on scope, complexity, and the number of screens. Contact us for a custom quote.",
      },
      {
        question: "Can you redesign my existing product?",
        answer:
          "Absolutely. We frequently help businesses modernize their existing products with fresh designs. We start with a UX audit of your current product to identify pain points and opportunities, then create a redesign strategy and execute the new design.",
      },
    ],
    relatedServices: ["web-development", "mobile-app-development", "saas-development"],
  },
  "custom-software-development": {
    hero: "Custom Software Development Tailored to Your Business",
    intro:
      "When off-the-shelf software can't meet your unique business needs, custom software development is the answer. At Trawerse, we build enterprise-grade custom software solutions that are tailored precisely to your business processes, workflows, and requirements. Our custom software development services help businesses automate processes, improve efficiency, reduce operational costs, and gain competitive advantages through technology. From internal tools and dashboards to customer-facing platforms and API integrations, we architect and build software that solves real business problems.",
    sections: [
      {
        title: "When Custom Software Makes Sense",
        content:
          "Not every business needs custom software — but many do. Custom software is the right choice when your business processes are unique and can't be fully served by existing tools, you're spending too much time on manual processes that could be automated, you need to integrate multiple systems and data sources into a unified workflow, off-the-shelf solutions require so many workarounds that they become inefficient, or you need full control over your data, security, and compliance.\n\nAt Trawerse, we help you evaluate whether custom development is the right investment for your situation. Sometimes a combination of existing tools with strategic custom integrations is more cost-effective than a ground-up build. We'll always recommend the approach that delivers the best ROI.",
      },
      {
        title: "Our Development Methodology",
        content:
          "We follow a structured development methodology that combines the predictability of traditional planning with the flexibility of agile execution. Every project begins with a comprehensive requirements gathering phase where we document business processes, user roles, data flows, and integration points.\n\nWe then create a detailed technical specification and architecture design. Development happens in iterative sprints with regular releases, allowing you to see progress and provide feedback continuously. We implement comprehensive automated testing — unit tests, integration tests, and end-to-end tests — to ensure reliability and make future changes safe and predictable.",
      },
      {
        title: "System Integration & APIs",
        content:
          "Modern businesses run on multiple software systems that need to work together. We specialize in building integrations between different platforms, whether through REST APIs, GraphQL, webhooks, or custom middleware. We've built integrations with CRM systems (Salesforce, HubSpot), accounting software (QuickBooks, Xero), communication tools (Slack, Microsoft Teams), payment processors (Stripe, PayPal), cloud services (AWS, Azure, GCP), and many more.\n\nWe also build custom APIs that allow your software to connect with third-party services and enable mobile apps or partner platforms to access your data and functionality securely.",
      },
      {
        title: "Maintenance & Long-Term Support",
        content:
          "Custom software is a long-term investment, and we're committed to its ongoing health. We offer comprehensive maintenance and support packages that include bug fixes and security patches, performance monitoring and optimization, feature enhancements based on evolving business needs, infrastructure management and scaling, regular code reviews and technical debt reduction.\n\nWe believe in building long-term partnerships with our clients. Your software should evolve as your business grows, and we're here to ensure it does.",
      },
    ],
    benefits: [
      { title: "Tailored Solution", desc: "Software built precisely for your unique business processes" },
      { title: "Process Automation", desc: "Eliminate manual tasks and reduce operational costs" },
      { title: "Seamless Integration", desc: "Connect with your existing tools and data sources" },
      { title: "Enterprise Security", desc: "SOC 2, GDPR, and HIPAA compliance capabilities" },
      { title: "Scalable Architecture", desc: "Software that grows with your business needs" },
      { title: "Full Ownership", desc: "You own the code, data, and intellectual property" },
    ],
    techStack: ["Node.js", "Python", "PostgreSQL", "Redis", "Docker", "AWS", "GraphQL", "Kubernetes"],
    faqs: [
      {
        question: "How much does custom software development cost?",
        answer:
          "Custom software projects range from $20,000 for simple internal tools to $200,000+ for complex enterprise systems. The cost depends heavily on the scope of features, number of integrations, compliance requirements, and expected user scale. We provide detailed estimates after understanding your requirements.",
      },
      {
        question: "How long does custom software development take?",
        answer:
          "Timelines vary significantly based on complexity. A simple internal tool can be built in 4-8 weeks. A more complex enterprise application typically takes 3-6 months. Large-scale systems with multiple modules and integrations may take 6-12 months.",
      },
      {
        question: "Will we own the source code?",
        answer:
          "Yes, upon full payment you receive complete ownership of all custom code developed for your project. We may use open-source libraries and our own reusable frameworks in the development process, which remain under their respective licenses.",
      },
      {
        question: "Can you work with our existing development team?",
        answer:
          "Absolutely. We can work as an extension of your existing team, handling specific modules or features while your in-house team handles others. We adapt to your development workflow, tools, and communication preferences.",
      },
    ],
    relatedServices: ["saas-development", "web-development", "ui-ux-design"],
  },
};

// ─── Metadata Generator ──────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};

  return generatePageMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
    keywords: service.keywords,
  });
}

// ─── Page Component ──────────────────────────────────────────────────────────

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  const content = SERVICE_CONTENT[slug];

  if (!service || !content) {
    notFound();
  }

  const relatedServices = content.relatedServices
    .map((rs) => SERVICES.find((s) => s.slug === rs))
    .filter(Boolean);

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* Schema */}
      <JsonLd
        data={serviceSchema({
          name: service.title,
          description: service.description,
          url: `/services/${service.slug}`,
        })}
      />
      <JsonLd data={faqSchema(content.faqs)} />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Services", href: "/services" },
          { label: service.shortTitle, href: `/services/${service.slug}` },
        ]}
      />

      {/* Hero */}
      <header className="mb-16">
        <p className="text-accent text-sm font-medium uppercase tracking-wider mb-4">
          {service.shortTitle}
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
          {content.hero}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {content.intro}
        </p>
      </header>

      {/* Main Content Sections */}
      {content.sections.map((section, index) => (
        <section key={index} className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {section.title}
          </h2>
          {section.content.split("\n\n").map((paragraph, pIndex) => (
            <p
              key={pIndex}
              className="text-muted-foreground leading-relaxed mb-4"
            >
              {paragraph}
            </p>
          ))}
        </section>
      ))}

      {/* Benefits Grid */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          Why Choose Trawerse for {service.shortTitle}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white/[0.03] backdrop-blur-xl border-none shadow-lg rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300"
            >
              <h3 className="text-sm font-semibold mb-2">{benefit.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Technologies We Use
        </h2>
        <div className="flex flex-wrap gap-2">
          {content.techStack.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 text-sm text-muted-foreground bg-white/[0.08] backdrop-blur-xl border-none rounded-full hover:bg-white/[0.12] hover:text-white transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          Frequently Asked Questions
        </h2>
        <FAQAccordion items={content.faqs} />
      </section>

      {/* Related Services */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Related Services
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {relatedServices.map((rs) =>
            rs ? (
              <Link
                key={rs.slug}
                href={`/services/${rs.slug}`}
                className="bg-white/[0.03] backdrop-blur-xl border-none shadow-lg rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300 group"
              >
                <h3 className="text-sm font-semibold mb-2 group-hover:text-white transition-colors">
                  {rs.shortTitle}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {rs.description}
                </p>
              </Link>
            ) : null
          )}
        </div>
      </section>

      {/* CTA */}
      <CTASection
        headline={`Ready to Start Your ${service.shortTitle} Project?`}
        description="Get a free consultation and detailed project estimate. Let's discuss how we can help you achieve your goals."
      />
    </article>
  );
}
