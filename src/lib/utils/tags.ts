import { getAllBlogs } from "$lib/utils/blogs";

import type { TagSummary } from "$lib/types/tag";

export const getAllTags = async (): Promise<TagSummary[]> => {
  const blogs = await getAllBlogs();
  const tagCounts: Record<string, number> = {};

  for (const blog of blogs) {
    for (const tag of blog.tags) {
      const lower = tag.toLowerCase();
      tagCounts[lower] = (tagCounts[lower] ?? 0) + 1;
    }
  }

  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}
