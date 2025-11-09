import fs from "fs";
import path from "path";
import { sortByDateDescending, isNotNull } from "$lib/utils/shared";

import type { BlogFrontmatter } from "$lib/types/blog";
import type { Frontmatter } from "$lib/types/frontmatter";

export const importBlog = async (slug: string): Promise<BlogFrontmatter | null>  => {
  try {
    const mod = await import(`$lib/content/blog/posts/${slug}.md`);
    const data = (mod?.metadata ?? {}) as Frontmatter;

    const tagsArray = Array.isArray(data.tags)
      ? data.tags
      : typeof data.tags === "string"
      ? [data.tags]
      : [];

    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      tags: tagsArray,
      created: data.created,
      updated: data.updated,
      draft: data.draft ?? true,
    };
  } catch (err) {
    return null;
  }
}

export const getAllBlogs = async (): Promise<BlogFrontmatter[]> => {
  const blogDir = path.resolve("src/lib/content/blog/posts");

  const slugs = fs
    .readdirSync(blogDir, { withFileTypes: true })
    .filter((file) => file.isFile() && file.name.endsWith(".md"))
    .map((file) => file.name.replace(/\.md$/, ""));

  const blogs = await Promise.all(slugs.map(importBlog));
  return blogs.filter(isNotNull).sort(sortByDateDescending);
}

export const getBlogsByTag = async (tag: string): Promise<BlogFrontmatter[]> => {
  const blogs = await getAllBlogs();
  const normalized = tag.trim().toLowerCase();

  return blogs
    .filter((b) => b.tags.map((t) => t.toLowerCase()).includes(normalized))
    .sort(sortByDateDescending);
}
