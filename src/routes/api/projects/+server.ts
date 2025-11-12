import { getAllProjects } from "$lib/utils/projects";

import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
  const projects = await getAllProjects();

  return new Response(JSON.stringify(projects), {
    headers: { "Content-Type": "application/json" },
  });
};
