import { GatsbyNode } from "gatsby";
import readingTime from "reading-time";
import * as path from "path";
import { createFilePath } from "gatsby-source-filesystem";
import { generatePostSlug, generateTagSlug, slugs } from "./src/logic/slug";

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions;
  const result: any = await graphql(
    `
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
    `
  );

  if (result.errors) {
    reporter.panicOnBuild(`Create Pages Error while running GraphQL query.`);
    return;
  }

  const posts = result.data.allMarkdownRemark.edges;

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

  // Create blog home pages
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
  const tags: any = result.data.tagsGroup.group;
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
