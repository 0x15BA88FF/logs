import { getAllExperiences } from "$lib/utils/experiences";

import type { RequestHandler } from "@sveltejs/kit";


export const GET: RequestHandler = async () => {
  const experiences = await getAllExperiences();

  return new Response(JSON.stringify(experiences), {
    headers: { "Content-Type": "application/json" },
  });
};
