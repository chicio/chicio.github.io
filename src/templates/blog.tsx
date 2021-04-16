import * as React from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/style.blog.home.scss";
import { graphql, Link, PageProps } from "gatsby";
import { track, tracking } from "../utils/tracking";
import { GatsbyImage } from "gatsby-plugin-image";
import { BlogListQuery } from "../../graphql-types";
import { PostAuthors } from "../components/PostAuthors";
import { PostMeta } from "../components/PostMeta";
import { BlogPage } from "../components/design-system/templates/blog-page";

interface BlogPageContext {
  limit: number;
  skip: number;
  numberOfPages: number;
  currentPage: number;
}

const Blog: React.FC<PageProps<BlogListQuery, BlogPageContext>> = ({
  data,
  location,
  pageContext,
}) => {
  const posts = data.allMarkdownRemark.edges;
  const { currentPage, numberOfPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numberOfPages;
  const prevPage = `/blog/${
    currentPage - 1 === 1 ? "" : (currentPage - 1).toString()
  }`;
  const nextPage = `/blog/${(currentPage + 1).toString()}`;
  const siteMetadata = data.site!.siteMetadata!;
  const author = siteMetadata.author!;
  const featuredImage = siteMetadata.featuredImage!;

  return (
    <BlogPage
      author={author}
      location={location}
      ogImage={`/${featuredImage}`}
      ogPageType={"website"}
      trackingCategory={tracking.category.blog_home}
    >
      <div className="blog-main">
        <div className="blog-posts-list">
          {posts.map((post) => {
            const frontMatter = post.node.frontmatter!;
            return (
              <div className="blog-posts-post" key={post.node.fields!.slug}>
                <Link
                  to={post.node.fields!.slug!}
                  onClick={() => {
                    track(
                      tracking.action.open_blog_post,
                      tracking.category.blog_home,
                      tracking.label.body
                    );
                  }}
                  className="blog-posts-post-link"
                >
                  <span className="blog-posts-post-title">
                    {frontMatter.title}
                  </span>
                  <div className="blog-posts-post-img-container">
                    <GatsbyImage
                      className={"img blog-posts-post-img"}
                      alt={frontMatter.title!}
                      image={
                        frontMatter.image!.childImageSharp!.gatsbyImageData
                      }
                    />
                  </div>
                  <PostAuthors
                    authors={frontMatter.authors!}
                    trackingCategory={tracking.category.blog_home}
                    trackingLabel={tracking.label.body}
                    enableUrl={false}
                  />
                  <PostMeta
                    date={frontMatter.date!}
                    readingTime={post.node.fields!.readingTime!.text!}
                  />
                  <span className="blog-posts-post-description">
                    {frontMatter.description!}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="d-flex flex-row justify-content-center">
          {!isFirst && (
            <Link
              className="btn blog-pages-button"
              onClick={() => {
                track(
                  tracking.action.open_blog_previous_page,
                  tracking.category.blog_home,
                  tracking.label.body
                );
              }}
              to={prevPage}
            >
              Previous
            </Link>
          )}
          {!isLast && (
            <Link
              className="btn blog-pages-button"
              onClick={() => {
                track(
                  tracking.action.open_blog_next_page,
                  tracking.category.blog_home,
                  tracking.label.body
                );
              }}
              to={nextPage}
            >
              Next
            </Link>
          )}
        </div>
      </div>
    </BlogPage>
  );
};

export default Blog;

export const blogListQuery = graphql`
  query BlogList($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            title
            description
            authors
            date(formatString: "DD MMM YYYY")
            image {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
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
