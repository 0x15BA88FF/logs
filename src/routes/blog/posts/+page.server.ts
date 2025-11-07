import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const postsResponse = await fetch("/api/blogs/posts");
  const posts = await postsResponse.json();

  return { posts };
};
