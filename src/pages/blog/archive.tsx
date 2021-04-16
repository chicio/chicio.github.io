import React from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../../styles/style.blog.archive.scss";
import "@fontsource/open-sans";
import { graphql, Link, PageProps } from "gatsby";
import { Head } from "../../components/Head";
import { ArchiveQuery } from "../../../graphql-types";
import { Menu } from "../../components/design-system/organism/menu";
import { track, tracking } from "../../utils/tracking";
import { BlogHeader } from "../../components/BlogHeader";
import { Footer } from "../../components/Footer";
import { Page } from "../../components/design-system/templates/page";

const Archive: React.FC<PageProps<ArchiveQuery>> = ({ data, location }) => {
  const siteMetadata = data.site!.siteMetadata!;
  const author = siteMetadata.author!;
  const featuredImage = siteMetadata.featuredImage!;

  return (
    <Page>
      <Head
        url={location.href}
        pageType={"website"}
        imageUrl={`/${featuredImage}`}
      />
      <Menu
        trackingCategory={tracking.category.blog_archive}
        pathname={location.pathname}
      />
      <div className="container blog-posts">
        <BlogHeader trackingCategory={tracking.category.blog_archive} />
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
      </div>
      <Footer
        author={author}
        trackingCategory={tracking.category.blog_archive}
        trackingLabel={tracking.label.footer}
      />
    </Page>
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
