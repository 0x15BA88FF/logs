<script lang="ts">
  interface NavLink {
    name: string;
    href: string;
  }

  const links: NavLink[] = [
    { name: "Blog", href: "/blog" },
    { name: "Projects", href: "/projects" },
    { name: "Gallery", href: "/gallery" },
  ];
</script>

<nav class="fixed z-40 w-full bg-background">
  <div class="max-w-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-4 mx-auto p-4 border-b">
    <a href="/" class="text-md text-primary font-semibold">0x15BA88FF</a>
    <div class="flex gap-1 items-center">
      {#each links as link, i}
        <a href={link.href}>{link.name}</a>
        {#if i < links.length - 1}
          <span class="text-secondary">/</span>
        {/if}
      {/each}
    </div>
  </div>
</nav>
