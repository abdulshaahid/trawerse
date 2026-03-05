import { SERVICES } from "../constants";
import { getAllPosts, type BlogPostMeta } from "../blog";

// ─── Topic Cluster Mapping ───────────────────────────────────────────────────

/**
 * Maps blog categories/tags to service slugs for cross-linking.
 * This creates topic clusters that strengthen topical authority.
 */
const TOPIC_SERVICE_MAP: Record<string, string[]> = {
  // Blog categories → service slugs
  "Web Development": ["web-development", "custom-software-development"],
  "Mobile Development": ["mobile-app-development"],
  "SaaS": ["saas-development", "web-development"],
  "Startup": ["startup-mvp-development"],
  "Design": ["ui-ux-design"],
  "Software Engineering": ["custom-software-development", "saas-development"],
  "Development": ["web-development", "custom-software-development"],

  // Common tags → service slugs
  "nextjs": ["web-development", "saas-development"],
  "react": ["web-development", "mobile-app-development"],
  "react-native": ["mobile-app-development"],
  "typescript": ["web-development", "saas-development", "custom-software-development"],
  "nodejs": ["web-development", "saas-development", "custom-software-development"],
  "mvp": ["startup-mvp-development"],
  "saas": ["saas-development"],
  "ui-ux": ["ui-ux-design"],
  "figma": ["ui-ux-design"],
  "mobile": ["mobile-app-development"],
  "ios": ["mobile-app-development"],
  "android": ["mobile-app-development"],
  "startup": ["startup-mvp-development"],
  "architecture": ["saas-development", "custom-software-development"],
};

// ─── Service → Blog Cross-Linking ────────────────────────────────────────────

/**
 * Returns blog posts that are relevant to a given service.
 * Used on service pages to cross-link to blog content.
 */
export function getRelatedBlogsForService(
  serviceSlug: string,
  limit = 3
): BlogPostMeta[] {
  try {
    const allPosts = getAllPosts();

    const scored = allPosts
      .map((post) => {
        let score = 0;

        // Check category mapping
        const categoryServices = TOPIC_SERVICE_MAP[post.category] || [];
        if (categoryServices.includes(serviceSlug)) score += 5;

        // Check tag mappings
        post.tags.forEach((tag) => {
          const tagKey = tag.toLowerCase().replace(/\s+/g, "-");
          const tagServices = TOPIC_SERVICE_MAP[tagKey] || [];
          if (tagServices.includes(serviceSlug)) score += 2;
        });

        // Title keyword matching
        const service = SERVICES.find((s) => s.slug === serviceSlug);
        if (service) {
          const titleLower = post.title.toLowerCase();
          service.keywords.forEach((kw) => {
            if (titleLower.includes(kw.toLowerCase().split(" ")[0])) score += 1;
          });
        }

        return { post, score };
      })
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score);

    return scored.slice(0, limit).map((s) => s.post);
  } catch {
    return [];
  }
}

// ─── Blog → Service Cross-Linking ────────────────────────────────────────────

/**
 * Returns services that are relevant to a given blog post.
 * Used on blog posts to cross-link to service pages.
 */
export function getRelatedServicesForBlog(post: {
  category: string;
  tags: string[];
}): typeof SERVICES {
  const matchedSlugs = new Set<string>();

  // Category mapping
  const categoryServices = TOPIC_SERVICE_MAP[post.category] || [];
  categoryServices.forEach((slug) => matchedSlugs.add(slug));

  // Tag mapping
  post.tags.forEach((tag) => {
    const tagKey = tag.toLowerCase().replace(/\s+/g, "-");
    const tagServices = TOPIC_SERVICE_MAP[tagKey] || [];
    tagServices.forEach((slug) => matchedSlugs.add(slug));
  });

  return SERVICES.filter((s) => matchedSlugs.has(s.slug)).slice(0, 3);
}

// ─── Topic Cluster Generator ─────────────────────────────────────────────────

/**
 * Groups blog posts into topic clusters.
 * Each cluster is a category with its associated posts and related services.
 */
export function generateTopicClusters() {
  try {
    const allPosts = getAllPosts();
    const clusters: Record<
      string,
      {
        posts: BlogPostMeta[];
        relatedServices: typeof SERVICES;
      }
    > = {};

    allPosts.forEach((post) => {
      if (!clusters[post.category]) {
        clusters[post.category] = {
          posts: [],
          relatedServices: [],
        };
      }
      clusters[post.category].posts.push(post);
    });

    // Attach related services to each cluster
    Object.keys(clusters).forEach((category) => {
      const categoryServices = TOPIC_SERVICE_MAP[category] || [];
      clusters[category].relatedServices = SERVICES.filter((s) =>
        categoryServices.includes(s.slug)
      );
    });

    return clusters;
  } catch {
    return {};
  }
}
