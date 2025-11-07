import { getAllTags } from "$lib/utils/blogs";

import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
  const tags = await getAllTags();

  return new Response(JSON.stringify(tags), {
    headers: { "Content-Type": "application/json" },
  });
};
