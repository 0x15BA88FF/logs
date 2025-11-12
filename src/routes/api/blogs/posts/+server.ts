import { getAllBlogs } from "$lib/utils/blogs";

import type { RequestHandler } from "@sveltejs/kit";


export const GET: RequestHandler = async () => {
  try {
    const blogs = await getAllBlogs();
    return new Response(JSON.stringify(blogs), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to load blog metadata" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
