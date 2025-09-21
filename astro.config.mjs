// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeCallouts from "rehype-callouts";
import rehypeExternalLinks from "rehype-external-links";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export default defineConfig({
    site: "https://0x15ba88ff.github.io",
    base: "/logs",
    markdown: {
        shikiConfig: {
            wrap: false,
            themes: {
                light: "catppuccin-latte",
                dark: "catppuccin-mocha"
            },
        },
        remarkPlugins: [remarkMath],
        rehypePlugins: [
            rehypeSlug,
            [
                rehypeExternalLinks,
                { target: "_blank", rel: ["noopener", "noreferrer"] }
            ],
            rehypeKatex,
            rehypeCallouts,
            [
                rehypeAutolinkHeadings,
                { behavior: "wrap", properties: { className: "heading-anchor" }}
            ],
        ]
    },
    integrations: [
        react(),
        tailwind(),
        sitemap({ priority: 1, changefreq: "daily" }),
    ]
});
