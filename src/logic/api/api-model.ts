export interface BlogPostApi {
  title: string;
  description: string;
  date: string;
  readingTime: string;
  featuredImageUrl: string;
  authors: string[];
  tags: string[];
}

export interface BlogPostsListApi {
  posts: BlogPostApi[];
}
