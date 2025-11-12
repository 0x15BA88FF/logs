export interface BlogFrontmatter {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  draft: boolean;
  created?: string;
  updated?: string;
}

export interface TagSummary {
  tag: string;
  count: number;
}
