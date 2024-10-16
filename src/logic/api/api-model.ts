export interface BlogPostDetailApi {
  title: string;
  description: string;
  date: string;
  readingTime: string;
  featuredImageUrl: string;
  authors: BlogAuthorApi[];
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
  authors: BlogAuthorApi[];
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
  imageUrl: string | null | undefined;
  description: string;
  callToActions: CallToActionApi[];
  features: string[];
}

export interface ProjectsApi {
  projects: ProjectApi[];
}

export interface DrawingApi {
  date: string;
  description: string;
  imageUrl: string;
}

export interface ArtApi {
  drawings: DrawingApi[];
}
