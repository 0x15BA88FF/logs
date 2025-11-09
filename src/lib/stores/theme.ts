import { writable, type Writable } from "svelte/store";

import type { Theme } from "$lib/types/theme";

const isTheme = (value: unknown): value is Theme => {
  return value === "light" || value === "dark";
}

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") {
    return "light";
  }

  const stored = localStorage.getItem("theme");

  if (isTheme(stored)) {
    return stored;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export const theme: Writable<Theme> = writable<Theme>(getInitialTheme());

if (typeof window !== "undefined") {
  theme.subscribe((value) => {
    if (!isTheme(value)) {
      console.warn(`[theme] Invalid theme value ignored:`, value);
      return;
    }

    document.documentElement.setAttribute("data-theme", value);
    localStorage.setItem("theme", value);
  });
}

export const setTheme = (next: Theme): void => {
  theme.set(next);
}

export const toggleTheme = (): void => {
  theme.update((current) => (current === "light" ? "dark" : "light"));
}
