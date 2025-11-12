import { getBlogsByTag } from "$lib/utils/blogs";

import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({ fetch }) => {
  const tagsResponse = await fetch("/api/blogs/tags");
  const tags: { tag: string; count: number }[] = await tagsResponse.json();

  const tagsData = await Promise.all(
    tags.map(async (tag) => {
      const posts = await getBlogsByTag(tag.tag);
      return {
        tag: tag.tag,
        count: tag.count,
        posts: posts.slice(0, 5),
      };
    })
  );

  return { tagsData };
};
