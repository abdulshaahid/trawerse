import { SITE_URL, COMPANY, SERVICES } from "../constants";

// ─── Professional Service Schema (richer than generic Service) ───────────────

export function professionalServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: service.name,
    description: service.description,
    url: `${SITE_URL}${service.url}`,
    provider: {
      "@type": "Organization",
      name: COMPANY.name,
      url: SITE_URL,
      logo: `${SITE_URL}/trawerse.svg`,
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 10.8505,
        longitude: 76.2711,
      },
      geoRadius: "20000",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name} Packages`,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.name,
            description: service.description,
          },
        },
      ],
    },
    priceRange: "$$$",
    ...(service.keywords && { keywords: service.keywords.join(", ") }),
  };
}

// ─── Item List Schema (for index/listing pages) ─────────────────────────────

export function itemListSchema(items: { name: string; url: string; position: number }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      url: `${SITE_URL}${item.url}`,
    })),
  };
}

// ─── Services Item List (for /services page) ────────────────────────────────

export function servicesListSchema() {
  return itemListSchema(
    SERVICES.map((s, i) => ({
      name: s.title,
      url: `/services/${s.slug}`,
      position: i + 1,
    }))
  );
}

// ─── Video Object Schema (future readiness) ─────────────────────────────────

export function videoObjectSchema(video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl?: string;
  embedUrl?: string;
  duration?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    ...(video.contentUrl && { contentUrl: video.contentUrl }),
    ...(video.embedUrl && { embedUrl: video.embedUrl }),
    ...(video.duration && { duration: video.duration }),
    publisher: {
      "@type": "Organization",
      name: COMPANY.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/trawerse.svg`,
      },
    },
  };
}

// ─── Founder / Person Schema ─────────────────────────────────────────────────

export function founderSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: COMPANY.founder,
    jobTitle: "Founder",
    worksFor: {
      "@type": "Organization",
      name: COMPANY.name,
      url: SITE_URL,
    },
    sameAs: Object.values(COMPANY.social),
  };
}

// ─── Enhanced Organization Schema (with authority signals) ───────────────────

export function enhancedOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/trawerse.svg`,
      width: 512,
      height: 512,
    },
    foundingDate: COMPANY.foundingDate,
    founder: founderSchema(),
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: COMPANY.email,
        telephone: COMPANY.phone,
        contactType: "customer service",
        availableLanguage: ["English"],
      },
    ],
    sameAs: Object.values(COMPANY.social),
    slogan: "Premium Digital Product Development Studio",
    knowsAbout: [
      "Web Development",
      "Mobile App Development",
      "SaaS Development",
      "UI/UX Design",
      "Custom Software Development",
      "Startup MVP Development",
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: COMPANY.address.state,
      addressRegion: COMPANY.address.state,
      addressCountry: COMPANY.address.country,
      postalCode: COMPANY.address.zip,
    },
  };
}
