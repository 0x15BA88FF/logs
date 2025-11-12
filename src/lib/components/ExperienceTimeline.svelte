<script lang="ts">
  import type { Experience } from "$lib/types/experiences";

  export let experiences: Experience[] = [];
</script>

<div class="relative border-l-2 border-muted ml-4 space-y-8">
  {#each experiences as experience, index}
    <div class="ml-10">
      <span class="absolute -left-3 w-6 h-6 bg-primary rounded-full"></span>
      <a href={experience.url ? experience.url : "#"} class="" target="_blank" rel="noopener noreferrer">
        <h3 class="mb-1 text-lg font-semibold">{experience.title}</h3>
        <p class="mb-2 text-sm text-muted-foreground">{experience.organization} {experience.dateStart} - {experience.dateEnd}</p>
        <p class="text-muted-foreground">{experience.description}</p>
      </a>
    </div>
  {/each}
</div>
