import { getBlogsByTag } from "$lib/utils/blogs";

import type { RequestHandler } from "@sveltejs/kit";


export const GET: RequestHandler = async ({ params }) => {
  const { slug } = params;

  if (!slug) {
    return new Response(JSON.stringify({ error: "Tag slug is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const blogs = await getBlogsByTag(slug);

  return new Response(JSON.stringify(blogs), {
    headers: { "Content-Type": "application/json" },
  });
};
