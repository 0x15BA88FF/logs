<script lang="ts">
  import Content from "$lib/content/pages/About.md";
  import ProjectCard from "$lib/components/ProjectCard.svelte";
  import BlogPostCard from "$lib/components/BlogPostCard.svelte";
  import SectionHeader from "$lib/components/SectionHeader.svelte";
  import { ChevronRight, Github, Linkedin, Twitter, Mail } from "@lucide/svelte";

  export let data;
</script>

<div class="flex flex-col gap-4">
  <h1 class="text-3xl font-bold">About me</h1>

  <div class="flex flex-col gap-8">
    <div class="prose">
      <Content />

      <div class="flex gap-4 pb-6 border-b">
        <a href="https://github.com/0x15ba88ff" target="_blank" aria-label="Visit my github"><Github/></a>
        <a href="https://linkedin.com/in/0x15ba88ff" aria-label="Visit my linkedin"><Linkedin/></a>
        <a href="https://x.com/0x15ba88ff" aria-label="Visit my x"><Twitter/></a>
        <a href="mailto:15ba88+hello@proton.me" aria-label="Send me an email"><Mail/></a>
      </div>
    </div>

    <SectionHeader title="Projects" href="/projects"/>

    {#if data.projects?.length}
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {#each data.projects as project}
          <ProjectCard {...project}/>
        {/each}
      </div>
    {:else}
      <p>No projects yet.</p>
    {/if}

    <SectionHeader title="Recent log" href="/blog"/>

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
