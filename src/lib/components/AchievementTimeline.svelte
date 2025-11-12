<script lang="ts">
  import type { Achievement } from "$lib/types/achievements";

  export let achievements: Achievement[] = [];
</script>

<div class="relative border-l-2 border-muted ml-4  space-y-8">
  {#each achievements as achievement, index}
    <div class="ml-10">
      <span class="absolute -left-3 w-6 h-6 bg-primary rounded-full"></span>
      <a href={achievement.url ? achievement.url : "#"} class="" target="_blank" rel="noopener noreferrer">
        <h3 class="mb-1 text-lg font-semibold">{achievement.title}</h3>
        <p class="mb-2 text-sm text-muted-foreground">{achievement.date}</p>
        <p class="text-muted-foreground">{achievement.description}</p>
      </a>
    </div>
  {/each}
</div>
