import {
  BlogAuthorApi,
  BlogAuthorsApi,
  BlogPostApi,
  BlogPostsListApi,
} from "./api-model";
import { blogAuthors } from "../blog-authors";

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

export const blogAuthorsApiAdapter = (
  authorsImages: Queries.AuthorsImagesApiQuery,
): BlogAuthorsApi => {
  console.log(authorsImages);
  const authors: BlogAuthorApi[] = Object.values(blogAuthors).map((author) => ({
    name: author.name,
    url: author.url,
    imageUrl: authorsImages.allFile.edges.find(
      (authorImage) =>
        authorImage.node.name === author.name!.replace(" ", "-").toLowerCase(),
    )?.node.publicURL,
  }));
  return {
    authors,
  };
};
