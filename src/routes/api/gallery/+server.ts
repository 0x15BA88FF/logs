import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
  const images = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    height: Math.floor(Math.random() * 200) + 150,
    url: `https://picsum.photos/400/${Math.floor(Math.random() * 200) + 300}?random=${i}`,
    alt: `Gallery image ${i + 1}`
  }));

  return new Response(JSON.stringify(images), {
    headers: { "Content-Type": "application/json" }
  });
};
