<script lang="ts">
  import { ExternalLink } from "@lucide/svelte";

  const getDomain = (url: string): string => {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch {
      return url;
    }
  };

  export let url: string;
  export let name: string;
  export let thumbnail: string;
  export let description: string;
</script>

<a href={url} target="_blank" rel="noopener noreferrer" class="group relative aspect-square rounded overflow-hidden">
  <img src={thumbnail} alt={description} class="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"/>
  <div class="absolute inset-0 flex flex-col justify-end">
    <div class="flex items-end justify-between p-3 bg-gradient-to-t from-black/60 to-transparent">
      <div class="flex flex-col">
        <h2 class="text-lg font-bold text-white">{name}</h2>
        <p class="text-sm text-white">{description}</p>
      </div>
      <div class="flex items-center gap-2">
        <p class="text-xs text-muted-foreground">{getDomain(url)}</p>
        <ExternalLink size={12} class="text-muted-foreground"/>
      </div>
    </div>
  </div>
</a>
