import React from "react";
import { graphql, PageProps } from "gatsby";
import { tracking } from "../logic/tracking";
import { TagPostsQuery } from "../../graphql-types";
import { BlogGenericPostListPage } from "../components/design-system/templates/blog-generic-post-list-page";
import { OgPageType } from "../logic/seo";
import { getCurrentLocationFrom } from "../logic/url";

interface TagPageContext {
  tag: string;
}

const Tag: React.FC<PageProps<TagPostsQuery, TagPageContext>> = ({
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
    <BlogGenericPostListPage
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
