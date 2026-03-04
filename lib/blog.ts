import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  authorImage?: string;
  category: string;
  tags: string[];
  image: string;
  readingTime: string;
  content: string;
  featured?: boolean;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  readingTime: string;
  featured?: boolean;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

// ─── Utilities ───────────────────────────────────────────────────────────────

function ensureContentDir() {
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
  }
}

export function getAllPosts(): BlogPostMeta[] {
  ensureContentDir();

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const filePath = path.join(CONTENT_DIR, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);
      const stats = readingTime(content);

      return {
        slug,
        title: data.title || "",
        description: data.description || "",
        date: data.date || "",
        author: data.author || "passionate developers",
        category: data.category || "Development",
        tags: data.tags || [],
        image: data.image || "/og-default.png",
        readingTime: stats.text,
        featured: data.featured || false,
      } as BlogPostMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  ensureContentDir();

  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title || "",
    description: data.description || "",
    date: data.date || "",
    author: data.author || "passionate developers",
    authorImage: data.authorImage,
    category: data.category || "Development",
    tags: data.tags || [],
    image: data.image || "/og-default.png",
    readingTime: stats.text,
    content,
    featured: data.featured || false,
  };
}

export function getRelatedPosts(
  currentSlug: string,
  limit = 3
): BlogPostMeta[] {
  const allPosts = getAllPosts();
  const currentPost = allPosts.find((p) => p.slug === currentSlug);

  if (!currentPost) return allPosts.slice(0, limit);

  // Score posts by tag/category overlap
  const scored = allPosts
    .filter((p) => p.slug !== currentSlug)
    .map((post) => {
      let score = 0;
      if (post.category === currentPost.category) score += 3;
      post.tags.forEach((tag) => {
        if (currentPost.tags.includes(tag)) score += 1;
      });
      return { post, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.post);
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((p) => p.category));
  return Array.from(categories);
}

export function generateTableOfContents(
  content: string
): { id: string; title: string; level: number }[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const toc: { id: string; title: string; level: number }[] = [];

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    toc.push({ id, title, level });
  }

  return toc;
}
