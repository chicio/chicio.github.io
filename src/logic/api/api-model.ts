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

export interface BlogAuthorApi {
  name: string;
  url: string;
  imageUrl: string | null | undefined;
}

export interface BlogAuthorsApi {
  authors: BlogAuthorApi[];
}
