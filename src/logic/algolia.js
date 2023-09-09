const indexName = `fabrizioduroni.it`;
const pagePath = `/src/posts/`;

const blogPostsQuery = `{
  pages: allMarkdownRemark(
    filter: {
      fileAbsolutePath: { regex: "${pagePath}" },
    }
  ) {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          title
          description
          authors
          tags
        }
      }
    }
  }
}
`;

const pageToAlgoliaRecord = ({ node: { frontmatter, fields, ...rest } }) => ({
  objectID: fields.slug,
  ...frontmatter,
  ...fields,
  ...rest,
});

const queries = [
  {
    query: blogPostsQuery,
    transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
  },
];

module.exports = queries;
