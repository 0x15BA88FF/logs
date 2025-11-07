<script lang="ts">
  import BlogPostCard from '$lib/components/BlogPostCard.svelte';

  export let data;
</script>

<svelte:head>
  <title>Blogs | 0x15BA88FF Cyan.dev</title>
  <meta name="description" content="A bump of all my blog posts | 0x15BA88FF | cyan.dev" />
</svelte:head>

<div class="flex flex-col gap-4">
  <h1 class="text-3xl font-bold">Blog</h1>
  <p class="text-muted-foreground">Blog posts dump</p>

  <div class="flex flex-col mt-4">
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
