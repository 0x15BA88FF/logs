import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

import { mdsvex } from "mdsvex";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeFigure from "rehype-figure";
import { createHighlighter } from "shiki";
import rehypeCallouts from "rehype-callouts";
import remarkFootnotes from "remark-footnotes";
import rehypeKatexSvelte from "rehype-katex-svelte";
import rehypeExternalLinks from "rehype-external-links";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const highlighter = await createHighlighter({
  themes: ["catppuccin-latte", "catppuccin-mocha"],
  langs: [
    "javascript",
    "typescript",
    "svelte",
    "python",
    "html",
    "bash",
    "css",
    "json",
    "markdown",
    "diff",
  ],
});

/** @type {import("@sveltejs/kit").Config} */
const config = {
  extensions: [".svelte", ".svx", ".md"],
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: [".svx", ".md"],
      remarkPlugins: [remarkMath, remarkFootnotes],
      rehypePlugins: [
        rehypeSlug,
        rehypeCallouts,
        rehypeKatexSvelte,
        [
          rehypeFigure,
          {
            className: "md-image zoomable-image cursor-zoom-in",
            figcaption: true,
          },
        ],
        [
          rehypeExternalLinks,
          { target: "_blank", rel: ["noopener", "noreferrer"] },
        ],
        [
          rehypeAutolinkHeadings,
          { behavior: "wrap", properties: { className: ["heading-anchor"] } },
        ],
      ],
      highlight: {
        highlighter: async (code, lang) => {
          const html = highlighter.codeToHtml(code, {
            lang: lang || "text",
            themes: {
              dark: "catppuccin-mocha",
              light: "catppuccin-latte",
            },
          });
          return `{@html \`${html}\`}`;
        },
      },
    }),
  ],
  kit: {
    adapter: adapter({
      fallback: "404.html",
    }),
    paths: {
      base: "",
    },
    prerender: {
      handleHttpError: "warn",
    },
  },
};

export default config;
