<script>
  import BlogPostCard from '$lib/components/BlogPostCard.svelte';
  import SectionHeader from "$lib/components/SectionHeader.svelte";

  export let data;
</script>

<svelte:head>
  <title>Blog Index | 0x15BA88FF Cyan.dev</title>
  <meta name="description" content="Blog tag-post relation index | 0x15BA88FF | cyan.dev" />
</svelte:head>

<div class="flex flex-col gap-4">
  <h1 class="mb-4 text-3xl font-bold">Tag Index</h1>

  <div class="flex flex-col gap-8 mt-4">
  {#if data.tagsData?.length}
    {#each data.tagsData as data}
      <SectionHeader title={data.tag} href="/blog/tags/{data.tag}"/>

      <div class="flex flex-col gap-2">
        {#each data.posts as post}
          <BlogPostCard {...post}/>
        {/each}
      </div>
    {/each}
  {:else}
    <p>No tagged blog posts yet.</p>
  {/if}
  </div>
</div>
