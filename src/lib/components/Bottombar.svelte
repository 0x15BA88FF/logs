<script lang="ts">
  import { onMount } from "svelte";
  import { commands } from "$lib/scripts/commands";
  import type { Command, Parameter } from "$lib/types/commands";
  import ThemeToggleButton from "$lib/components/ThemeToggleButton.svelte";

  const allCommands: readonly Command[] = commands;

  let value: string = "";
  let input: HTMLInputElement | null = null;
  let placeholder: string = "Type : and enter a command";

  let selectedIndex: number = 0;
  let showSuggestions: boolean = false;
  let isParamSuggestion: boolean = false;
  let suggestions: (Command | Parameter)[] = [];

  let historyIndex: number = -1;
  let history: string[] = [];

  const updateSuggestions = (): void => {
    if (!value.startsWith(":")) {
      showSuggestions = false;
      return;
    }

    const parts: string[] = value.slice(1).split(" ").filter(Boolean);
    const query: string = parts[parts.length - 1] ?? "";

    if (parts.length === 0) {
      suggestions = allCommands;
      isParamSuggestion = false;
    } else if (parts.length === 1) {
      suggestions = allCommands.filter((cmd) =>
        cmd.name.toLowerCase().startsWith(query.toLowerCase())
      );
      isParamSuggestion = false;
    } else {
      const cmdName = parts[0].trim();
      const cmd = allCommands.find((c) => c.name === cmdName);

      if (!cmd?.params) {
        showSuggestions = false;
        return;
      }

      const paramIndex = parts.length - 2;
      const paramOptions: Parameter[] | undefined = cmd.params[paramIndex];

      if (!paramOptions) {
        showSuggestions = false;
        return;
      }

      suggestions = paramOptions.filter((p) =>
        p.value.toLowerCase().startsWith(query.toLowerCase())
      );
      isParamSuggestion = true;
    }

    showSuggestions = suggestions.length > 0;
    selectedIndex = 0;
  };

  const showMessage = (msg: string): void => {
    placeholder = msg;
    setTimeout(() => {
      placeholder = "Type : and enter a command";
    }, 1000);
  };

  const applySuggestion = (): void => {
    if (suggestions.length === 0) return;

    const parts: string[] = value.split(" ");
    const suggestion: Command | Parameter | undefined = suggestions[selectedIndex];

    if (!suggestion) return;

    if (isParamSuggestion) {
      parts[parts.length - 1] = (suggestion as Parameter).value;
    } else {
      parts[parts.length - 1] = `:${(suggestion as Command).name}`;
    }

    value = parts.join(" ") + " ";
    showSuggestions = false;
    input?.focus();
  };

  const runCommand = (): void => {
    const parts: string[] = value.replace(/^:/, "").trim().split(" ");
    const cmdName: string = parts[0] ?? "";
    const params: string[] = parts.slice(1);
    const cmd: Command | undefined = allCommands.find((c) => c.name === cmdName);

    if (!cmd) {
      showMessage("Command not found");
      value = "";
      input?.blur();
      showSuggestions = false;
      return;
    }

    history = [value, ...history.filter((h) => h !== value)].slice(0, 50);
    historyIndex = -1;

    value = "";
    input?.blur();
    showSuggestions = false;

    const result: string | void = cmd.action(...params);
    if (typeof result === "string" && result.length > 0) {
      showMessage(result);
    }
  };

  const handleKey = (e: KeyboardEvent): void => {
    switch (e.key) {
      case "Escape":
        value = "";
        input?.blur();
        historyIndex = -1;
        showSuggestions = false;
        return;
      case "Enter":
        if (value.trim()) {
          e.preventDefault();
          runCommand();
        }
        return;
      case "Tab":
        if (showSuggestions) {
          e.preventDefault();
          applySuggestion();
        }
        return;
      case "ArrowUp":
        if (!showSuggestions && value.startsWith(":")) {
          e.preventDefault();
          if (history.length === 0) return;
          historyIndex = Math.min(historyIndex + 1, history.length - 1);
          value = history[historyIndex] ?? value;
          return;
        }
        if (showSuggestions) {
          e.preventDefault();
          selectedIndex = (selectedIndex - 1 + suggestions.length) % suggestions.length;
        }
        return;
      case "ArrowDown":
        if (!showSuggestions && value.startsWith(":")) {
          e.preventDefault();
          if (historyIndex === -1) return;
          historyIndex = Math.max(historyIndex - 1, -1);
          value = historyIndex === -1 ? ":" : history[historyIndex] ?? ":";
          return;
        }
        if (showSuggestions) {
          e.preventDefault();
          selectedIndex = (selectedIndex + 1) % suggestions.length;
        }
        return;
    }
  };

  onMount(() => {
    const globalKey = (e: KeyboardEvent): void => {
      const active = document.activeElement as HTMLElement | null;
      const activeTag = active?.tagName ?? "";

      if (["INPUT", "TEXTAREA", "SELECT"].includes(activeTag)) return;

      if (e.key === ":") {
        e.preventDefault();
        value = ":";
        input?.focus();
        updateSuggestions();
        input?.setSelectionRange(1, 1);
      }
    };

    window.addEventListener("keydown", globalKey);
    return () => window.removeEventListener("keydown", globalKey);
  });
</script>

<div class="fixed bottom-0 w-full bg-background border-t px-4 py-2">
  {#if showSuggestions}
    <ul class="max-w-2xl flex flex-col mx-auto px-4 pb-2">
      {#each suggestions as suggestion, i (isParamSuggestion ? (suggestion as Parameter).value : (suggestion as Command).name)}
        <li
          class="flex items-center justify-between p-2 text-sm rounded-md cursor-pointer transition-colors
                 {i === selectedIndex ? 'bg-primary/20' : 'bg-background'}"
          on:click={() => {
            selectedIndex = i;
            applySuggestion();
          }}
        >
          <span class="font-medium">
            {isParamSuggestion
              ? (suggestion as Parameter).value
              : (suggestion as Command).name}
          </span>
          <span class="text-muted-foreground text-xs">
            {suggestion.description}
          </span>
        </li>
      {/each}
    </ul>
  {/if}
  <div class="max-w-2xl flex mx-auto px-4 py-2">
    <input
      type="text"
      bind:value
      bind:this={input}
      on:keydown={handleKey}
      on:input={updateSuggestions}
      aria-label="Command input"
      class="flex-1 focus:text-primary outline-none bg-transparent"
      placeholder={placeholder}
    />
    <ThemeToggleButton />
  </div>
</div>
