import {
  BlogAuthorApi,
  BlogAuthorsApi,
  BlogPostApi,
  BlogPostDetailApi,
  BlogPostsListApi,
} from "./api-model";
import { blogAuthors } from "../blog-authors";

const postResourceNameForEndpointCreator = (slug: string) =>
  slug!
    .split("/")
    .filter((component) => component !== "")
    .join("-");

const postResourceEndpointCreator = (apiBasePath: string, slug: string) =>
  `${apiBasePath}/${postResourceNameForEndpointCreator(slug)}.json`;

export const blogPostsApiAdapter = (
  apiBasePath: string,
  blogPostsApiQueryResult: Queries.BlogPostsApiQuery,
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
        resourceEndpoint: postResourceEndpointCreator(
          apiBasePath,
          node.fields!.slug!,
        ),
        webEndpoint: node.fields!.slug!,
      };
    });

  return {
    posts,
  };
};

export const blogPostDetailsApiAdapter = (
  blogPostsApiQueryResult: Queries.BlogPostsApiQuery,
): Record<string, BlogPostDetailApi> =>
  blogPostsApiQueryResult!.allMarkdownRemark.edges.reduce<
    Record<string, BlogPostDetailApi>
  >((accumulator, edge) => {
    let frontmatter = edge.node.frontmatter!;
    accumulator[postResourceNameForEndpointCreator(edge.node.fields!.slug!)] = {
      title: frontmatter.title!,
      description: frontmatter.description!,
      date: frontmatter.date!,
      readingTime: edge.node.fields!.readingTime!.text!,
      featuredImageUrl: frontmatter.image!.publicURL!,
      authors: frontmatter.authors!.map((it) => it!),
      tags: frontmatter.tags!.map((it) => it!),
      math: frontmatter.math!,
      content: edge.node!.html!,
    };
    return accumulator;
  }, {});

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
