import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, COMPANY } from "./constants";

// ─── Metadata Generator ─────────────────────────────────────────────────────

interface GenerateMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}

export function generatePageMetadata({
  title,
  description,
  path,
  keywords = [],
  ogImage,
  noIndex = false,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
}: GenerateMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const image = ogImage || `${SITE_URL}/og-default.png`;

  return {
    title,
    description,
    keywords: keywords.join(", "),
    authors: authors?.map((name) => ({ name })) || [
      { name: COMPANY.founder },
    ],
    creator: COMPANY.name,
    publisher: COMPANY.name,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: type === "article" ? "article" : "website",
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@trawersedev",
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

// ─── JSON-LD Schema Generators ───────────────────────────────────────────────

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/trawerse.svg`,
    foundingDate: COMPANY.foundingDate,
    founder: {
      "@type": "Person",
      name: COMPANY.founder,
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: COMPANY.email,
      contactType: "customer service",
    },
    sameAs: Object.values(COMPANY.social),
    address: {
      "@type": "PostalAddress",
      addressLocality: COMPANY.address.city,
      addressRegion: COMPANY.address.state,
      addressCountry: COMPANY.address.country,
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    publisher: {
      "@type": "Organization",
      name: COMPANY.name,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(
  items: { name: string; href: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

export function serviceSchema(service: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: `${SITE_URL}${service.url}`,
    provider: {
      "@type": "Organization",
      name: COMPANY.name,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "Worldwide",
    },
    serviceType: service.name,
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function articleSchema(article: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: `${SITE_URL}${article.url}`,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/trawerse.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${article.url}`,
    },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: COMPANY.name,
    url: SITE_URL,
    logo: `${SITE_URL}/trawerse.svg`,
    email: COMPANY.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: COMPANY.address.city,
      addressRegion: COMPANY.address.state,
      addressCountry: COMPANY.address.country,
    },
    priceRange: "$$$",
    openingHours: "Mo-Fr 09:00-18:00",
  };
}

// ─── JSON-LD Script Helper ───────────────────────────────────────────────────

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
