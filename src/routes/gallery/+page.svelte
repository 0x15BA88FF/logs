<script lang="ts">
  export let data;
</script>

<svelte:head>
  <title>Gallery | 0x15BA88FF Cyan.dev</title>
  <meta name="description" content="My random gallery | 0x15BA88FF | cyan.dev" />
</svelte:head>

<div class="flex flex-col gap-4">
  <h1 class="text-3xl font-bold">Gallery</h1>
  <p class="text-muted-foreground">Memories in the moment</p>

  {#if data.gallery?.length}
    <div class="columns-2 gap-2 space-y-2">
      {#each data.gallery as image}
        <div class="break-inside-avoid">
          <div class="zoomable-image w-full bg-secondary rounded overflow-hidden cursor-zoom-in" style="height: {image.height}px;">
            <img src={image.url} alt={image.alt} class="w-full h-full object-cover" loading="lazy"/>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <p>No images yet.</p>
  {/if}
</div>
