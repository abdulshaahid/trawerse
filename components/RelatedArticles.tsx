import Link from "next/link";
import type { ServiceDefinition } from "@/lib/constants";
import type { BlogPostMeta } from "@/lib/blog";

// ─── Related Blog Articles Component ────────────────────────────────────────

interface RelatedArticlesProps {
  posts: BlogPostMeta[];
  title?: string;
}

export function RelatedArticles({
  posts,
  title = "Related Articles",
}: RelatedArticlesProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-white/5">
      <h2 className="text-xl font-semibold mb-6">{title}</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-white/[0.03] backdrop-blur-xl shadow-lg border-none rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300"
          >
            <span className="text-xs text-accent font-medium">
              {post.category}
            </span>
            <h3 className="text-sm font-semibold mt-2 mb-1.5 group-hover:text-accent transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {post.description}
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <span>{post.readingTime}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ─── Related Services Component (for blog posts) ────────────────────────────

interface RelatedServicesProps {
  services: ServiceDefinition[];
  title?: string;
}

export function RelatedServices({
  services,
  title = "Explore Our Services",
}: RelatedServicesProps) {
  if (services.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-white/5">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="grid md:grid-cols-3 gap-3">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group bg-white/[0.03] backdrop-blur-xl border-none rounded-xl p-5 hover:bg-white/[0.08] transition-all duration-300"
          >
            <h3 className="text-sm font-semibold mb-1.5 group-hover:text-accent transition-colors">
              {service.shortTitle}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {service.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
