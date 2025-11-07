import { writable } from "svelte/store";

export type Theme = "light" | "dark";

const getInitialTheme = (): Theme => {
  if (typeof localStorage !== "undefined") {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored === "light" || stored === "dark") return stored;
  }

  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }

  return "light";
};

export const theme = writable<Theme>(getInitialTheme());

theme.subscribe((value) => {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", value);
  }
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("theme", value);
  }
});
