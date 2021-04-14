const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
        tagsGroup: allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const posts = result.data.allMarkdownRemark.edges;

  //Create posts pages
  posts.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/post.tsx`),
      context: {
        slug: node.fields.slug,
      },
    });
  });

  // Create blog home pages
  const postsPerPage = 10;
  const numberOfPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: numberOfPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog/` : `/blog/${i + 1}`,
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
  const tags = result.data.tagsGroup.group;
  tags.forEach((tag) => {
    createPage({
      path: `/blog/tags/${tag.fieldValue.split(" ").join("-")}/`,
      component: path.resolve("./src/templates/tag.tsx"),
      context: {
        tag: tag.fieldValue,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const filename = createFilePath({ node, getNode, basePath: `pages` });
    const [year, month, day, ...title] = filename.substring(1).split("-");
    const slug = `/${year}/${month}/${day}/${title.join("-")}`;
    createNodeField({ node, name: `slug`, value: slug });
  }
};
