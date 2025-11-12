<script lang="ts">
  import ProjectCard from "$lib/components/ProjectCard.svelte";

  export let data;
</script>

<svelte:head>
  <title>Projects | 0x15BA88FF Cyan.dev</title>
  <meta name="description" content="Projects portfolio | 0x15BA88FF cyan.dev"/>
</svelte:head>

<div class="flex flex-col gap-4">
  <h1 class="mb-4 text-3xl font-bold">Projects</h1>

  {#if data.projects?.length}
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {#each data.projects as project}
        <ProjectCard {...project} />
      {/each}
    </div>
  {:else}
    <p>No projects yet.</p>
  {/if}
</div>
