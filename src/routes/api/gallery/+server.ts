import { getAllGalleryImages } from "$lib/utils/gallery";

import type { RequestHandler } from "@sveltejs/kit";


export const GET: RequestHandler = async () => {
  const images = await getAllGalleryImages();

  return new Response(JSON.stringify(images), {
    headers: { "Content-Type": "application/json" }
  });
};
