import type { BlogFrontmatter } from "$lib/types/blogs";


export function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}

export function sortByDateDescending(a: BlogFrontmatter, b: BlogFrontmatter):
number {
  const aDate = a.created ? new Date(a.created).getTime() : 0;
  const bDate = b.created ? new Date(b.created).getTime() : 0;
  return bDate - aDate;
}
