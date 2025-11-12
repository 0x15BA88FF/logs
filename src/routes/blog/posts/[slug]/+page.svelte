<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { Clock, Clock5 } from "@lucide/svelte";

  let loading = true;
  let BlogContent: any;
  let metadata: any = {};
  $: slug = $page.params.slug;

  onMount(async () => {
    try {
      const module = await import(`$lib/content/blog/posts/${slug}.md`);
      metadata = module.metadata ?? {};
      BlogContent = module.default;
    } catch (err) {
      console.error(`Failed to import "${slug}":`, err);
    } finally {
      loading = false;
    }
  });

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "—";

    const date = new Date(dateString);
    const year = date.getFullYear();
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };
</script>

<svelte:head>
  <title>Blog: {metadata.title} | 0x15BA88FF Logs</title>
  <meta name="description" content={metadata.description} />
</svelte:head>

<div class="flex flex-col gap-4">
  {#if loading}
    <p>Loading...</p>
  {:else if BlogContent}
    <h1 class="text-3xl font-bold">{metadata.title}</h1>
    <p class="text-muted-foreground">{metadata.description}</p>

    <table>
      <tbody>
        <tr>
          <td class="flex items-center gap-2 py-2"><Clock size={20} /><p>Created</p></td>
          <td><p class="text-primary">{formatDate(metadata.created)}</p></td>
        </tr>
        <tr>
          <td class="flex items-center gap-2 py-2"><Clock5 size={20} /><p>Modified</p></td>
          <td><p class="text-primary">{formatDate(metadata.updated)}</p></td>
        </tr>
      </tbody>
    </table>

    <div class="flex flex-wrap gap-2 mb-6">
      {#if metadata.draft}
        <span class="px-2 py-1 text-sm rounded text-yellow-500 bg-yellow-200/10">
          draft
        </span>
      {/if}
      {#each metadata.tags as tag}
        <a href="/blog/tags/{tag}" class="px-2 py-1 text-sm rounded bg-primary/10 text-primary">{tag}</a>
      {/each}
    </div>

    <article class="prose pt-4">
      <svelte:component this={BlogContent} />
    </article>
  {:else}
    <p>Failed to load blog post.</p>
  {/if}
</div>
