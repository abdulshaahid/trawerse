import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Default: allow all legitimate crawlers
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      {
        // Block AI training bots to preserve content value
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "CCBot",
        disallow: "/",
      },
      {
        userAgent: "Google-Extended",
        disallow: "/",
      },
      {
        // Rate-limit aggressive crawlers
        userAgent: "AhrefsBot",
        crawlDelay: 10,
        allow: "/",
      },
      {
        userAgent: "SemrushBot",
        crawlDelay: 10,
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

