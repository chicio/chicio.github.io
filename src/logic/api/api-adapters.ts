import {
  ArtApi,
  BlogAuthorApi,
  BlogAuthorsApi,
  BlogPostApi,
  BlogPostDetailApi,
  BlogPostsListApi,
  DrawingApi,
  ProjectApi,
  ProjectsApi,
} from "./api-model";
import { BlogAuthor, blogAuthors } from "../blog-authors";
import { projects } from "../projects";
import { artDescriptions } from "../art";
import config from "../../../gatsby-config";

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
  authorsApi: BlogAuthorsApi,
): BlogPostsListApi => {
  const posts: BlogPostApi[] =
    blogPostsApiQueryResult!.allMarkdownRemark.edges.map(({ node }) => {
      let frontmatter = node.frontmatter!;
      return {
        title: frontmatter.title!,
        description: frontmatter.description!,
        date: frontmatter.date!,
        readingTime: node.fields!.readingTime!.text!,
        featuredImageUrl: `${config.siteMetadata!.siteUrl}${frontmatter.image!
          .publicURL!}`,
        authors: authorsApi.authors.filter((it) =>
          frontmatter.authors!.find(
            (author) =>
              author!.split("_").join(" ").toUpperCase() ===
              it.name.toUpperCase(),
          ),
        ),
        tags: frontmatter.tags!.map((it) => it!),
        resourceEndpoint: postResourceEndpointCreator(
          apiBasePath,
          node.fields!.slug!,
        ),
        webEndpoint: `${config.siteMetadata!.siteUrl}${node.fields!.slug!}`,
      };
    });

  return {
    posts,
  };
};

export const blogPostDetailsApiAdapter = (
  blogPostsApiQueryResult: Queries.BlogPostsApiQuery,
  authorsApi: BlogAuthorsApi,
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
      featuredImageUrl: `${config.siteMetadata!.siteUrl}${frontmatter.image!
        .publicURL!}`,
      authors: authorsApi.authors.filter((it) =>
        frontmatter.authors!.find(
          (author) =>
            author!.split("_").join(" ").toUpperCase() ===
            it.name.toUpperCase(),
        ),
      ),
      tags: frontmatter.tags!.map((it) => it!),
      math: frontmatter.math!,
      content: edge.node!.html!,
    };
    return accumulator;
  }, {});

export const blogAuthorsApiAdapter = (
  authorsImages: Queries.ImagesApiQuery,
): BlogAuthorsApi => {
  const getImageUrl = (author: BlogAuthor) =>
    authorsImages.allFile.edges.find(
      (authorImage) =>
        authorImage.node.name ===
        author.name!.split(" ").join("-").toLowerCase(),
    )?.node?.publicURL;

  const authors: BlogAuthorApi[] = Object.values(blogAuthors).map((author) => ({
    name: author.name,
    url: author.url,
    imageUrl: `${config.siteMetadata!.siteUrl}${getImageUrl(author)}`,
  }));
  return {
    authors,
  };
};

export const projectsApiAdapter = (
  images: Queries.ImagesApiQuery,
): ProjectsApi => {
  const projectsApi: ProjectApi[] = Object.keys(projects).map((projectKey) => {
    const project = projects[projectKey];

    const getImageUrl = () =>
      images.allFile.edges.find((image) => image.node.name === projectKey)!
        .node!.publicURL;

    return {
      id: projectKey,
      name: project.name,
      description: project.description,
      features: project.features,
      callToActions: project.callToActions.map((callToAction) => ({
        text: callToAction.label,
        url: callToAction.link,
      })),
      imageUrl: `${config.siteMetadata!.siteUrl}${getImageUrl()}`,
    };
  });

  return {
    projects: projectsApi,
  };
};

export const artApiAdapter = (images: Queries.ImagesApiQuery): ArtApi => {
  const projectsApi: DrawingApi[] = Object.keys(artDescriptions).map((date) => {
    const description = artDescriptions[date];

    const getImageUrl = () =>
      images.allFile.edges.find((drawImage) => drawImage.node.name === date)!
        .node!.publicURL!;

    return {
      date,
      description,
      imageUrl: `${config.siteMetadata!.siteUrl}${getImageUrl()}`,
    };
  });

  return {
    drawings: projectsApi.sort((draw, anotherDraw) =>
      anotherDraw.date.localeCompare(draw.date),
    ),
  };
};
