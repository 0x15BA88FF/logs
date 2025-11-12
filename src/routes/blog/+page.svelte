<script lang="ts">
  import BlogPostCard from '$lib/components/BlogPostCard.svelte';
  import SectionHeader from "$lib/components/SectionHeader.svelte";

  export let data;
</script>

<svelte:head>
  <title>Blog | 0x15BA88FF Cyan.dev</title>
  <meta name="description" content="My Thoughts on the web | 0x15BA88FF | cyan.dev" />
</svelte:head>

<div class="flex flex-col gap-4">
  <h1 class="mb-4 text-3xl font-bold">Blog</h1>

  <div class="flex flex-col gap-8 mt-4">
    <div class="flex flex-col gap-8">
      <SectionHeader title="Tag Index" href="/blog/tags"/>

      {#if data.tags?.length}
        <div class="flex flex-col gap-2">
          {#each data.tags as tag}
            <div class="flex items-center justify-between">
              <a href="/blog/tags/{tag.tag}" class="text-primary">#{tag.tag}</a>
              <p>{tag.count}</p>
            </div>
          {/each}
        </div>
      {:else}
        <p>No tagged blog posts yet.</p>
      {/if}
    </div>

    <div class="flex flex-col gap-8">
      <SectionHeader title="Recent Posts" href="/blog/posts"/>

      {#if data.posts?.length}
        <div class="flex flex-col gap-2">
          {#each data.posts as post}
            <BlogPostCard {...post}/>
          {/each}
        </div>
      {:else}
        <p>No blog posts yet.</p>
      {/if}
    </div>
  </div>
</div>
