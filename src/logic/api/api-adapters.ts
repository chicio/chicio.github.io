import { BlogPostApi, BlogPostsListApi } from "./api-model";

export const blogPostApiAdapter = (
  blogPostsApiQueryResult: Queries.BlogPostsListApiQuery,
): BlogPostsListApi => {
  const posts: BlogPostApi[] =
    blogPostsApiQueryResult!.allMarkdownRemark.edges.map(({ node }) => {
      let frontmatter = node.frontmatter!;
      return {
        title: frontmatter.title!,
        description: frontmatter.description!,
        date: frontmatter.date!,
        readingTime: node.fields!.readingTime!.text!,
        featuredImageUrl: frontmatter.image!.publicURL!,
        authors: frontmatter.authors!.map((it) => it!),
        tags: frontmatter.tags!.map((it) => it!),
      };
    });

  return {
    posts,
  };
};
