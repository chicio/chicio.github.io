import React from "react";
import "../styles/style.blog.archive.scss";
import { graphql, Link, PageProps } from "gatsby";
import { track, tracking } from "../utils/tracking";
import { TagPostsQuery } from "../../graphql-types";
import { BlogPage } from "../components/design-system/templates/blog-page";

interface TagPageContext {
  tag: string;
}

const Tag: React.FC<PageProps<TagPostsQuery, TagPageContext>> = ({
  data,
  location,
}) => {
  const siteMetadata = data.site!.siteMetadata!;
  const author = siteMetadata.author!;
  const featuredImage = siteMetadata.featuredImage!;

  return (
    <BlogPage
      location={location}
      author={author}
      ogPageType={"website"}
      ogImage={`/${featuredImage}`}
      trackingCategory={tracking.category.blog_tag}
    >
      <div className="blog-archive">
        {data.allMarkdownRemark.edges.map((post) => (
          <div
            className="container archive-list-post"
            key={post.node.fields?.slug}
          >
            <div className="row archive-post">
              <div className="col-12 col-lg-2 archive-list-post-date d-flex align-items-center">
                <time>{post.node.frontmatter?.date}</time>
              </div>
              <div className="col-12 col-lg-10 archive-list-post-title d-flex align-items-center">
                <Link
                  to={post.node.fields!.slug!}
                  onClick={() =>
                    track(
                      tracking.action.open_blog_post,
                      tracking.category.blog_archive,
                      tracking.label.body
                    )
                  }
                >
                  {post.node.frontmatter?.title}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </BlogPage>
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
