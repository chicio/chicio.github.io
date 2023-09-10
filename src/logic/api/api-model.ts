export interface BlogPostDetailApi {
  title: string;
  description: string;
  date: string;
  readingTime: string;
  featuredImageUrl: string;
  authors: string[];
  tags: string[];
  math: boolean;
  content: string;
}

export interface BlogPostApi {
  title: string;
  description: string;
  date: string;
  readingTime: string;
  featuredImageUrl: string;
  authors: string[];
  tags: string[];
  resourceEndpoint: string;
  webEndpoint: string;
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

export interface CallToActionApi {
  text: string;
  url: string;
}

export interface ProjectApi {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  callToActions: CallToActionApi[];
  features: string[];
}
