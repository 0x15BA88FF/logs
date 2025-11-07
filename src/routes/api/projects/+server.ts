import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
  const projects = [
    {
      name: "Lend Me",
      description: "AI loaning app.",
      url: "https://lendme.app",
      thumbnail: "https://placehold.co/640x360?text=Lend+Me"
    },
    {
      name: "Cosmos",
      description: "My NxOS config",
      url: "https://github.com/0x15ba88ff/cosmos",
      thumbnail: "https://placehold.co/640x360?text=Cosmos"
    },
    {
      name: "Devctl",
      description: "CLI for managing development environments",
      url: "https://github.com/0x15ba88ff/devctl",
      thumbnail: "https://placehold.co/640x360?text=Devctl"
    }
  ];

  return new Response(JSON.stringify(projects), {
    headers: { "Content-Type": "application/json" }
  });
};
