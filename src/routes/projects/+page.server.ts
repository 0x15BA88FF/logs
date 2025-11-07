import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const projectsResponse = await fetch("/api/projects");
  const projects = await projectsResponse.json();

  return { projects };
};
