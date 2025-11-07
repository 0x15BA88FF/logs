<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";

  let command = $state("");
  let inputElement: HTMLInputElement;
  const dispatch = createEventDispatcher<{ run: string }>();

  const focusWithColon = () => {
    command = ":";
    inputElement.focus();
    inputElement.setSelectionRange(1, 1);
  }

  const clearAndBlur = () => {
    command = "";
    inputElement.blur();
  }

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      clearAndBlur();
    } else if (e.key === "Enter" && command.trim()) {
      dispatch("run", command);
      clearAndBlur();
    }
  }

  const handleGlobalKey = (e: KeyboardEvent) => {
    const active = document.activeElement;

    if (active?.tagName && ["INPUT", "TEXTAREA", "SELECT"].includes(active.tagName)) {
      return;
    }

    if (e.key === ":") {
      e.preventDefault();
      focusWithColon();
    }
  }

  onMount(() => {
    window.addEventListener("keydown", handleGlobalKey);

    return () => {
      window.removeEventListener("keydown", handleGlobalKey);
    };
  });
</script>

<input
  type="text"
  bind:value={command}
  bind:this={inputElement}
  onkeydown={handleKeydown}
  aria-label="Command input"
  class="flex-1 focus:text-primary"
  placeholder="Type : and enter a command"
/>
