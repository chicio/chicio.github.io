import React from "react";
import { graphql, PageProps } from "gatsby";
import { ArchiveQuery } from "../../../graphql-types";
import { tracking } from "../../logic/tracking";
import { BlogGenericPostListPage } from "../../components/design-system/templates/blog-generic-post-list-page";

const Archive: React.FC<PageProps<ArchiveQuery>> = ({ data, location }) => {
  const siteMetadata = data.site!.siteMetadata!;
  const author = siteMetadata.author!;
  const featuredImage = siteMetadata.featuredImage!;

  return (
    <BlogGenericPostListPage
      title={"Archive"}
      posts={data.allMarkdownRemark.edges}
      author={author}
      location={location}
      ogPageType={"website"}
      ogImage={`/${featuredImage}`}
      trackingCategory={tracking.category.blog_archive}
    />
  );
};

export default Archive;

export const pageQuery = graphql`
  query Archive {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMM YYYY")
            title
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
