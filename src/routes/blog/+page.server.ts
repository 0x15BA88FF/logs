import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const postsResponse = await fetch("/api/blogs/posts");
  const posts = await postsResponse.json();

  const tagsResponse = await fetch("/api/blogs/tags");
  const tags = await tagsResponse.json();

  return { posts: posts.slice(0, 5), tags: tags.slice(0, 5) };
};
