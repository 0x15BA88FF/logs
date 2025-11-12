import { actions } from "$lib/scripts/actions";

import type { Command } from "$lib/types/commands"


export const commands: Command[] = [
  {
    name: "echo",
    description: "Echo some text",
    params: [],
    action: (text) => actions.echo(text)
  },
  {
    name: "q",
    description: "Quit",
    params: [],
    action: () => actions.quit()
  },
  {
    name: "quit",
    description: "Quit",
    params: [],
    action: () => actions.quit()
  },
  {
    name: "e",
    description: "Open a page in editor",
    params: [],
    action: () => actions.edit()
  },
  {
    name: "edit",
    description: "Open a page in editor",
    params: [],
    action: () => actions.edit()
  },
  {
    name: "goto",
    description: "Navigate to a page",
    params: [
      [
        { value: "/", description: "Home page" },
        { value: "/gallery", description: "Gallery page" },
        { value: "/projects", description: "Projects page" },
        { value: "/blog", description: "Blog overview page" },
        { value: "/blog/tags", description: "Blog index page" },
        { value: "/blog/posts", description: "Blog posts page" },
      ],
    ],
    action: (route) => actions.goto(route)
  },
  {
    name: "colorscheme",
    description: "Change color scheme",
    params: [
      [
        { value: "dark", description: "Dark color scheme" },
        { value: "light", description: "Light color scheme" },
        { value: "toggle", description: "Toggle color scheme" },
      ],
    ],
    action: (colorscheme) => actions.colorscheme(colorscheme)
  },
];
