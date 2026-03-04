import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CTASection } from "@/components/cta-section";
import { getAllPosts } from "@/lib/blog";

export const metadata = generatePageMetadata({
  title: "Blog — Web Development, SaaS, & Startup Insights",
  description:
    "Explore Trawerse's blog for expert insights on web development, mobile app development, SaaS architecture, startup MVPs, and modern software engineering practices.",
  path: "/blog",
  keywords: [
    "web development blog",
    "SaaS development blog",
    "software engineering insights",
    "startup development tips",
    "mobile app development guide",
  ],
});

export default function BlogPage() {
  const posts = getAllPosts();
  const featuredPosts = posts.filter((p) => p.featured);
  const regularPosts = posts.filter((p) => !p.featured);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }]} />

      <header className="mb-16 max-w-3xl">
        <p className="text-accent text-sm font-medium uppercase tracking-wider mb-4">
          Blog
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Insights on{" "}
          <span className="gradient-text">Building Digital Products</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Expert insights on web development, SaaS architecture, mobile apps,
          startup MVPs, and modern software engineering. Written by the team
          behind Trawerse.
        </p>
      </header>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-lg font-semibold mb-6">Featured Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white/[0.05] shadow-xl backdrop-blur-2xl border-none rounded-3xl overflow-hidden hover:bg-white/[0.08] transition-all duration-300 flex flex-col"
              >
               
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-accent font-medium">
                      {post.category}
                    </span>
                    <span className="text-white/20">•</span>
                    <span className="text-xs text-muted-foreground">
                      {post.readingTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {post.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{post.author}</span>
                    <span className="text-white/20">•</span>
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="mb-16">
        <h2 className="text-lg font-semibold mb-6">All Articles</h2>
        <div className="space-y-4">
          {[...regularPosts, ...(featuredPosts.length === 0 ? posts : [])].map(
            (post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col md:flex-row md:items-center gap-5 bg-white/[0.03] backdrop-blur-xl border-none shadow-lg rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-accent font-medium">
                      {post.category}
                    </span>
                    <span className="text-white/20">•</span>
                    <span className="text-xs text-muted-foreground">
                      {post.readingTime}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold group-hover:text-accent transition-colors mb-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {post.description}
                  </p>
                </div>
                <time
                  dateTime={post.date}
                  className="text-xs text-muted-foreground whitespace-nowrap"
                >
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </Link>
            )
          )}
        </div>
      </section>

      <CTASection
        headline="Need Expert Development Help?"
        description="From SaaS platforms to mobile apps, we build premium digital products. Let's talk about your project."
        primaryCta={{ label: "Get Started", href: "/contact" }}
        secondaryCta={{ label: "Our Services", href: "/services" }}
      />
    </div>
  );
}
