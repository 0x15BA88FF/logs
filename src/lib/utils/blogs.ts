import fs from "fs";
import path from "path";

export interface BlogMetadata {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  draft: boolean;
  created?: string;
  updated?: string;
}

export interface TagSummary {
  tag: string;
  count: number;
}

async function importBlog(slug: string): Promise<BlogMetadata | null> {
  try {
    const mod = await import(`$lib/content/blog/posts/${slug}.md`);
    const data = mod?.metadata ?? {};

    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      tags: Array.isArray(data.tags) ? data.tags : [],
      created: data.created ?? undefined,
      updated: data.updated ?? undefined,
      draft: data.draft ?? true,
    };
  } catch (err) {
    console.error(`[blogs] Failed to import metadata for "${slug}":`, err);
    return null;
  }
}

function sortByDateDescending(a: BlogMetadata, b: BlogMetadata) {
  const aDate = a.created ? new Date(a.created).getTime() : 0;
  const bDate = b.created ? new Date(b.created).getTime() : 0;
  return bDate - aDate;
}

export async function getAllBlogs(): Promise<BlogMetadata[]> {
  const blogDir = path.resolve("src/lib/content/blog/posts");

  const slugs = fs
    .readdirSync(blogDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));

  const blogs = await Promise.all(slugs.map(importBlog));

  return blogs
    .filter((b): b is BlogMetadata => b !== null)
    .sort(sortByDateDescending);
}

export async function getAllTags(): Promise<TagSummary[]> {
  const blogs = await getAllBlogs();
  const tagCounts: Record<string, number> = {};

  for (const blog of blogs) {
    for (const tag of blog.tags) {
      const lower = tag.toLowerCase();
      tagCounts[lower] = (tagCounts[lower] || 0) + 1;
    }
  }

  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getBlogsByTag(tag: string): Promise<BlogMetadata[]> {
  const blogs = await getAllBlogs();
  return blogs
    .filter((b) =>
      b.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
    )
    .sort(sortByDateDescending);
}
