import type { BlogFrontmatter } from "$lib/types/blog";

export function sortByDateDescending(a: BlogFrontmatter, b: BlogFrontmatter): number {
  const aDate = a.created ? new Date(a.created).getTime() : 0;
  const bDate = b.created ? new Date(b.created).getTime() : 0;
  return bDate - aDate;
}

export function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}
