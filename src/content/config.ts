import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const styleClassesEnum = [];

const postCollection = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()).optional(),
        created: z.string(),
        updated: z.string(),
        banner: z.string().optional(),
        banner_alt: z.string().optional(),
        draft: z.boolean().optional(),
        styleclasses: z.array(z.enum(styleClassesEnum)).optional()
    })
});

const tagCollection = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/tags" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        styleclasses: z.array(z.enum(styleClassesEnum)).optional()
    })
});

export const collections = {
    posts: postCollection,
    tags: tagCollection
};
