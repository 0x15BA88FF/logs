import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const projectsResponse = await fetch("/api/projects");
  const projects = await projectsResponse.json();

  const postsResponse = await fetch("/api/blogs/posts");
  const posts = await postsResponse.json();

  return { projects: projects.slice(0, 5), posts: posts.slice(0, 5) };
};
