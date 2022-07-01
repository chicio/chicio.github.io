import { FC } from "react";
import { graphql, PageProps } from "gatsby";
import { tracking } from "../logic/tracking";
import { BlogGenericPostListPageTemplate } from "../components/design-system/templates/blog-generic-post-list-page-template";
import { OgPageType } from "../logic/seo";
import { getCurrentLocationFrom } from "../logic/current-location";

interface TagPageContext {
  tag: string;
}

const Tag: FC<PageProps<Queries.TagPostsQuery, TagPageContext>> = ({
  data,
  pageContext,
  location,
}) => {
  const siteMetadata = data.site!.siteMetadata!;
  const author = siteMetadata.author!;
  const featuredImage = siteMetadata.featuredImage!;
  const { edges, totalCount } = data.allMarkdownRemark;
  const tagHeader = `${pageContext.tag} (${totalCount})`;

  return (
    <BlogGenericPostListPageTemplate
      title={tagHeader}
      posts={edges}
      author={author}
      location={getCurrentLocationFrom(location)}
      ogPageType={OgPageType.WebSite}
      ogImage={featuredImage}
      trackingCategory={tracking.category.blog_tag}
    />
  );
};

export default Tag;

export const pageQuery = graphql`
  query TagPosts($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD MMM YYYY")
          }
        }
      }
    }
    site {
      siteMetadata {
        title
        author
        featuredImage
      }
    }
  }
`;
