<script lang="ts">
  import CommandInput from "$lib/components/CommandInput.svelte"
  import ThemeToggleButton from "$lib/components/ThemeToggleButton.svelte"
</script>

<div class="fixed bottom-0 w-full bg-background">
  <div class="max-w-2xl flex mx-auto py-4 border-t">
    <CommandInput on:run={(e) => console.log("Command:", e.detail)} />
    <ThemeToggleButton/>
  </div>
</div>
