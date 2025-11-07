<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { ChevronUp } from "@lucide/svelte";

  let isScrolled = false;

  onMount(() => {
    window.addEventListener("scroll", _ => {
      if (window.scrollY > 200) {
        isScrolled = true;
      } else {
        isScrolled = false;
      }
    });
  });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
</script>

{#if isScrolled}
  <button
    on:click={scrollToTop}
    in:fly={{ y: 20, duration: 250 }}
    out:fly={{ y: 20, duration: 250 }}
    class="sticky bottom-12 left-full w-max mr-8 p-2 bg-background border-muted border-2 rounded-full shadow-lg"
  >
    <ChevronUp />
  </button>
{/if}
