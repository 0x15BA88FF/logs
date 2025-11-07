<script lang="ts">
  import { ChevronRight } from "@lucide/svelte";

  export let href: string;
  export let title: string;
</script>

<div class="flex gap-4 items-end justify-between">
  <h2 class="text-2xl text-muted-foreground font-bold">{title}</h2>
  <a href={href} class="flex items-center gap-1 pl-2 py-1 text-xs font-bold bg-secondary rounded-[0.5rem]">
    View more
    <ChevronRight class="text-xs"/>
  </a>
</div>
