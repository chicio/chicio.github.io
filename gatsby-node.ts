import { GatsbyNode } from "gatsby";
import readingTime from "reading-time";
import * as path from "path";
import * as fs from "fs";
import { createFilePath } from "gatsby-source-filesystem";
import { generatePostSlug, generateTagSlug, slugs } from "./src/logic/slug";
import {
  blogAuthorsApiAdapter,
  blogPostDetailsApiAdapter,
  blogPostsApiAdapter,
} from "./src/logic/api/api-adapters";

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions;
  const result = await graphql<Queries.BlogPostsQuery>(`
    query BlogPosts {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 1000) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: { frontmatter: { tags: SELECT } }) {
          fieldValue
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Create Pages Error while running GraphQL query.`);
    return;
  }

  const posts = result.data!.allMarkdownRemark.edges;

  //Create posts pages
  posts.forEach((post: any) => {
    createPage({
      path: post.node.fields.slug,
      component: path.resolve(`./src/templates/post.tsx`),
      context: {
        slug: post.node.fields.slug,
      },
    });
  });

  // Create blog home (paginated) pages
  const postsPerPage = 11;
  const numberOfPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: numberOfPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? slugs.blog : `${slugs.blog}${i + 1}`,
      component: path.resolve("./src/templates/blog.tsx"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numberOfPages: numberOfPages,
        currentPage: i + 1,
      },
    });
  });

  //Create tag pages
  const tags: any = result.data!.tagsGroup.group;
  tags.forEach((tag: any) => {
    createPage({
      path: generateTagSlug(tag.fieldValue),
      component: path.resolve("./src/templates/tag.tsx"),
      context: {
        tag: tag.fieldValue,
      },
    });
  });
};

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const filename = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({ node, name: `slug`, value: generatePostSlug(filename) });
    createNodeField({
      node,
      name: `readingTime`,
      value: readingTime(node.rawMarkdownBody as string),
    });
  }
};

export const onPostBuild: GatsbyNode["onPostBuild"] = async ({ graphql }) => {
  console.log("onPostBuild: generating API...");

  const apiBasePath = "/api";
  const apiFolder = `./public${apiBasePath}`;

  if (!fs.existsSync(apiFolder)) {
    fs.mkdirSync(apiFolder);
  }

  const blogPostsQuery = (
    await graphql<Queries.BlogPostsApiQuery>(`
      query BlogPostsApi {
        allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 1000) {
          edges {
            node {
              fields {
                slug
                readingTime {
                  text
                }
              }
              frontmatter {
                title
                description
                authors
                tags
                math
                date(formatString: "DD MMM YYYY")
                image {
                  publicURL
                }
              }
              html
            }
          }
        }
      }
    `)
  ).data!;

  const imagesApiQuery = (
    await graphql<Queries.ImagesApiQuery>(`
      query ImagesApi {
        allFile(
          filter: {
            relativeDirectory: { in: ["projects", "authors"] }
            extension: { regex: "/(jpg)|(jpeg)|(png)/" }
          }
        ) {
          edges {
            node {
              publicURL
              name
            }
          }
        }
      }
    `)
  ).data!;
  console.log(JSON.stringify(imagesApiQuery));

  const blogPostsApi = blogPostsApiAdapter(apiBasePath, blogPostsQuery);
  const authorsApi = blogAuthorsApiAdapter(imagesApiQuery);
  const blogPostDetailApis = blogPostDetailsApiAdapter(blogPostsQuery);

  fs.writeFileSync(`${apiFolder}/posts.json`, JSON.stringify(blogPostsApi));
  fs.writeFileSync(`${apiFolder}/authors.json`, JSON.stringify(authorsApi));
  Object.keys(blogPostDetailApis).forEach((key) => {
    fs.writeFileSync(
      `${apiFolder}/${key}.json`,
      JSON.stringify(blogPostDetailApis[key]),
    );
  });

  console.log("onPostBuild: API generation completed.");
};
