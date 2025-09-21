import { getCollection } from "astro:content";
import rss, { pagesGlobToRssItems } from "@astrojs/rss";

export async function GET(context) {
    const posts = await getCollection("posts");
    const filteredPosts = posts.filter((item) => !item.data.draft)
    const sortedPostes = filteredPosts.sort(
        (a, b) => new Date(b.data.updated) - new Date(a.data.updated)
    )

    return rss({
        site: context.site,
        title: "0x15BA88FF Log",
        description: "0x15BA88FF Logs And Experiences",
        customData: "<language>en-us</language>",
        items: sortedPostes.map(post => ({
            title: post.data.title,
            tags: post.data.tags,
            description: post.data.description,
            created: post.data.created,
            updated: post.data.updated,
            link: `/posts/${post.slug}`,
        })),
    })
}
