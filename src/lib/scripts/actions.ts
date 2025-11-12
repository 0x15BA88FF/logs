import { setTheme, toggleTheme } from "$lib/stores/theme";


export const actions = {
  goto: (url: string): string | void => {
    try {
      if (url.startsWith("http://") || url.startsWith("https://")) {
        window.location.href = url;
      } else {
        window.location.pathname = url;
      }
      return `Navigating to ${url}`;
    } catch (err) {
      return `Failed to navigate to ${url}`;
    }
  },

  echo: (text: string): string => text,

  colorscheme: (scheme: string): string | void => {
    if (scheme === "light" || scheme === "dark") {
      setTheme(scheme);
      return `Color scheme set to ${scheme}`;
    } else if (scheme === "toggle") {
      toggleTheme();
      return "Toggled color scheme";
    }
  },

  edit: (): string | void => {
    try {
      const repoUrl = "https://github.com/0x15BA88FF/0x15ba88ff.github.io/";
      window.open(repoUrl, "_blank", "noopener,noreferrer");
      return "Opening editor (Git repo)";
    } catch (err) {
      return "Failed to open editor";
    }
  },

  quit: (): string | void => {
    try {
      window.close();
      return "Closing tab...";
    } catch (err) {
      return "Cannot close this tab automatically";
    }
  },
} as const;

export type ActionName = keyof typeof actions;
export type ActionFn<K extends ActionName = ActionName> = typeof actions[K];
