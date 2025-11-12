import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, params }) => {
  const postsResponse = await fetch(`/api/blogs/tags/${params.slug}`);
  const posts = await postsResponse.json();

  return { posts };
};
