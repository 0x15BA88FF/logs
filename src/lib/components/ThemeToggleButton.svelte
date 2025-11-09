<script lang="ts">
  import { get } from "svelte/store";
  import { toggleTheme, theme } from "$lib/stores/theme";

  import { fly } from "svelte/transition";
  import { Sun, Moon } from "@lucide/svelte";
</script>

<button on:click={toggleTheme} aria-label="Toggle theme" class="flex items-center justify-center w-8 h-8 cursor-pointer hover:text-primary">
  {#if $theme === "dark"}
    <span class="absolute" in:fly={{ y: -20, duration: 250 }} out:fly={{ y: 20, duration: 250 }}>
      <Moon/>
    </span>
  {:else}
    <span class="absolute" in:fly={{ y: -20, duration: 250 }} out:fly={{ y: 20, duration: 250 }}>
      <Sun />
    </span>
  {/if}
</button>
