<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import BlogPostCard from '$lib/components/BlogPostCard.svelte';

  let loading = true;
  let TagContent: any;
  $: slug = $page.params.slug;

  onMount(async () => {
    try {
      const module = await import(`$lib/content/blog/tags/${slug}.md`);
      TagContent = module.default;
    } catch (err) {
      console.error(`Failed to import "${slug}":`, err);
    } finally {
      loading = false;
    }
  });

  export let data;
</script>

<svelte:head>
  <title>Blog Tag: {slug} | 0x15BA88FF Cyan.dev</title>
  <meta name="description" content={`Blog posts related to ${slug}`} />
</svelte:head>

<div class="flex flex-col gap-4">
  {#if loading}
    <p>Loading...</p>
  {:else if data.posts > 0}
    <h1 class="text-3xl font-bold mb-6">#{slug}</h1>

    <svelte:component this={TagContent} />

    {#if data.posts.length > 0}
      <div class="flex flex-col gap-2">
        {#each data.posts as post}
          <BlogPostCard {...post}/>
        {/each}
      </div>
    {:else}
      <p class="text-muted-foreground">No posts found under this tag.</p>
    {/if}
  {:else}
    <p>Failed to load tag content.</p>
  {/if}
</div>
