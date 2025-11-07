<script lang="ts">
  export let slug: string;
  export let title: string;
  export let tags: string[];
  export let description: string;
</script>

<div class="w-full flex flex-col gap-1 p-4 border rounded hover:bg-muted/5">
  <a href="/blog/posts/{slug}" class="block">
    <h2 class="text-lg text-foreground font-bold">{title}</h2>
    <p class="text-sm text-muted-foreground truncate">{description}</p>
  </a>

  <div class="flex gap-2 flex-wrap mt-2">
    {#each tags as tag}
      <a
        href="/blog/tags/{tag}"
        class="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-sm"
      >
        {tag}
      </a>
    {/each}
  </div>
</div>
