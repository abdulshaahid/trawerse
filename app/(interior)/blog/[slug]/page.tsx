import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import readingTime from "reading-time";
import {
  generatePageMetadata,
  JsonLd,
  articleSchema,
} from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CTASection } from "@/components/cta-section";
import { RelatedServices } from "@/components/RelatedArticles";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  generateTableOfContents,
} from "@/lib/blog";
import { getRelatedServicesForBlog } from "@/lib/seo/linking";
import { SITE_URL } from "@/lib/constants";

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  // Dynamic OG image for this blog post
  const ogImage = `${SITE_URL}/api/og?${new URLSearchParams({
    title: post.title,
    type: "blog",
    description: post.description.substring(0, 120),
  }).toString()}`;

  return generatePageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.tags,
    ogImage,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.date,
    authors: [post.author],
  });
}

// MDX Components for styling
const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-4" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-semibold mt-8 mb-3" {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="text-lg font-semibold mt-6 mb-2" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-muted-foreground leading-relaxed mb-4" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="list-disc list-inside space-y-1.5 text-muted-foreground mb-4 ml-2"
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="list-decimal list-inside space-y-1.5 text-muted-foreground mb-4 ml-2"
      {...props}
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-muted-foreground leading-relaxed" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="text-white font-semibold" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-accent hover:underline"
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-2 border-accent/30 pl-4 italic text-muted-foreground my-6"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="bg-[#1a1a1a] px-1.5 py-0.5 rounded text-sm text-accent/80 font-mono"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="bg-white/[0.05] shadow-inner backdrop-blur-xl border-none rounded-2xl p-5 overflow-x-auto mb-6 text-sm"
      {...props}
    />
  ),
  hr: () => <hr className="border-white/5 my-8" />,
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);
  const relatedServices = getRelatedServicesForBlog({
    category: post.category,
    tags: post.tags,
  });
  const toc = generateTableOfContents(post.content);
  const stats = readingTime(post.content);

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* Structured Data */}
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.description,
          url: `/blog/${post.slug}`,
          image: post.image.startsWith("http")
            ? post.image
            : `${SITE_URL}${post.image}`,
          datePublished: post.date,
          dateModified: post.date,
          author: post.author,
          wordCount: stats.words,
          keywords: post.tags,
          articleSection: post.category,
        })}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Blog", href: "/blog" },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
      />

      {/* Article Header */}
      <header className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-accent text-sm font-medium">
            {post.category}
          </span>
          <span className="text-white/20">•</span>
          <span className="text-sm text-muted-foreground">
            {post.readingTime}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
          {post.title}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          {post.description}
        </p>
        <div className="flex items-center gap-3 pb-6 border-b border-white/5">
          <div>
            <p className="text-sm font-medium">{post.author}</p>
            <time
              dateTime={post.date}
              className="text-xs text-muted-foreground"
            >
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </div>
      </header>

      {/* Grid: TOC + Content */}
      <div className="grid lg:grid-cols-4 gap-12">
        {/* Table of Contents - Sidebar */}
        {toc.length > 0 && (
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <div
              className="lg:sticky lg:top-24"
              aria-label="Table of Contents"
            >
              <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
                On this page
              </h2>
              <nav>
                <ul className="space-y-1.5">
                  {toc.map((item) => (
                    <li
                      key={item.id}
                      style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
                    >
                      <a
                        href={`#${item.id}`}
                        className="text-xs text-muted-foreground hover:text-white transition-colors leading-tight block py-0.5"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>
        )}

        {/* Article Content */}
        <div
          className={`${
            toc.length > 0 ? "lg:col-span-3" : "lg:col-span-4"
          } order-1 lg:order-2`}
        >
          <div className="prose-custom">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: "wrap" }],
                  ],
                },
              }}
            />
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-white/5">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 text-xs text-muted-foreground bg-white/[0.03] backdrop-blur-md border-none rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-16 pt-12 border-t border-white/5">
          <h2 className="text-xl font-semibold mb-6">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="group bg-white/[0.03] backdrop-blur-xl shadow-lg border-none rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300"
              >
                <span className="text-xs text-accent font-medium">
                  {related.category}
                </span>
                <h3 className="text-sm font-semibold mt-2 mb-1.5 group-hover:text-accent transition-colors line-clamp-2">
                  {related.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {related.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Service Cross-Links (internal linking for topical authority) */}
      <RelatedServices
        services={relatedServices}
        title="Related Services"
      />

      {/* CTA */}
      <CTASection
        headline="Need Expert Development Help?"
        description="Our team builds premium digital products. Let's discuss your project."
      />
    </article>
  );
}
