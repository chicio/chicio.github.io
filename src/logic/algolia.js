const indexName = `fabrizioduroni.it`;
const blogPostsQuery = `{
  pages: allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
    edges {
      node {
        id
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

const pageToAlgoliaRecord = ({
  node: { id, frontmatter, fields, ...rest },
}) => ({
  objectID: id,
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