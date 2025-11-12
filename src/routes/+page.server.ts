import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({ fetch }) => {
  const achievementsResponse = await fetch("/api/achievements");
  const achievements = await achievementsResponse.json();

  const experiencesResponse = await fetch("/api/experiences");
  const experiences = await experiencesResponse.json();

  const projectsResponse = await fetch("/api/projects");
  const projects = await projectsResponse.json();

  const postsResponse = await fetch("/api/blogs/posts");
  const posts = await postsResponse.json();

  return {
    experiences: experiences,
    achievements: achievements,
    projects: projects.slice(0, 6),
    posts: posts.slice(0, 5),
  };
};
