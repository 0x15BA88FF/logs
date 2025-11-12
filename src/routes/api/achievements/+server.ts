import { getAllAchievements } from "$lib/utils/achievements";

import type { RequestHandler } from "@sveltejs/kit";


export const GET: RequestHandler = async () => {
  const achievements = await getAllAchievements();

  return new Response(JSON.stringify(achievements), {
    headers: { "Content-Type": "application/json" },
  });
};
