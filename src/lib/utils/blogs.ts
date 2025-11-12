import path from "path";

import { sortByDateDescending, isNotNull } from "$lib/utils/shared";

import type { BlogFrontmatter, TagSummary } from "$lib/types/blogs";


const markdownFiles = import.meta.glob("$lib/content/blog/posts/*.md", { eager: true });

function normalizeTags(input: unknown): string[] {
  if (Array.isArray(input)) {
    return input.filter((item): item is string => typeof item === "string");
  }
  if (typeof input === "string") {
    return [input];
  }
  return [];
}

export const getAllBlogs = async (): Promise<BlogFrontmatter[]> => {
  const blogFrontmatters: (BlogFrontmatter | null)[] = await Promise.all(
    Object.entries(markdownFiles).map(async ([filepath, module]) => {
      const slug = path.basename(filepath, ".md");
      const metadata: Record<string, unknown> = (module as { metadata?: Record<string, unknown> }).metadata ?? {};

      const {
        title = slug,
        description = "",
        tags = [],
        created,
        updated,
        draft = true,
      } = metadata as Partial<BlogFrontmatter>;

      const normalizedTags: string[] = normalizeTags(tags);

      return {
        slug,
        title,
        description,
        tags: normalizedTags,
        created,
        updated,
        draft,
      };
    })
  );

  return blogFrontmatters.filter(isNotNull).sort(sortByDateDescending);
};

export const getBlogsByTag = async (tag: string): Promise<BlogFrontmatter[]> => {
  const allBlogs: BlogFrontmatter[] = await getAllBlogs();
  const normalizedTag: string = tag.trim().toLowerCase();

  return allBlogs
    .filter((blog) =>
      blog.tags.map((t) => t.toLowerCase()).includes(normalizedTag)
    )
    .sort(sortByDateDescending);
};

export const getAllTags = async (): Promise<TagSummary[]> => {
  const allBlogs: BlogFrontmatter[] = await getAllBlogs();
  const tagCountMap: Record<string, number> = {};

  for (const blog of allBlogs) {
    for (const tag of blog.tags) {
      const lowerTag: string = tag.toLowerCase();
      tagCountMap[lowerTag] = (tagCountMap[lowerTag] ?? 0) + 1;
    }
  }

  return Object.entries(tagCountMap)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
};
