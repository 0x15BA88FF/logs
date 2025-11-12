import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({ fetch }) => {
  const galleryResponse = await fetch("/api/gallery");
  const gallery = await galleryResponse.json();

  return { gallery };
};
