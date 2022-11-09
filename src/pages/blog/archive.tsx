import { FC } from "react";
import { graphql, PageProps } from "gatsby";
import { tracking } from "../../logic/tracking";
import { BlogGenericPostListPageTemplate } from "../../components/design-system/templates/blog-generic-post-list-page-template";
import { OgPageType } from "../../logic/seo";
import { getCurrentLocationFrom } from "../../logic/current-location";

const Archive: FC<PageProps<Queries.ArchiveQuery>> = ({ data, location }) => {
  const siteMetadata = data.site!.siteMetadata!;
  const author = siteMetadata.author!;
  const featuredImage = siteMetadata.featuredImage!;

  return (
    <BlogGenericPostListPageTemplate
      title={"Archive"}
      posts={data.allMarkdownRemark.edges}
      author={author}
      location={getCurrentLocationFrom(location)}
      ogPageType={OgPageType.WebSite}
      ogImage={featuredImage}
      trackingCategory={tracking.category.blog_archive}
    />
  );
};

export default Archive;

export const pageQuery = graphql`
  query Archive {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
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
