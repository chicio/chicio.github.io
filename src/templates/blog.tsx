import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { tracking } from "../logic/tracking";
import { BlogListQuery } from "../../graphql-types";
import { BlogPage } from "../components/design-system/templates/blog-page";
import { PaginationNavigation } from "../components/design-system/molecules/pagination-navigation";
import { PostCard } from "../components/design-system/molecules/post-card";
import { OgPageType } from "../logic/seo";
import { getCurrentLocationFrom } from "../logic/url";

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
      location={getCurrentLocationFrom(location)}
      ogImage={`/${featuredImage}`}
      ogPageType={OgPageType.website}
      trackingCategory={tracking.category.blog_home}
    >
      {posts.map((post) => (
        <PostCard
          key={post.node.fields!.slug!}
          slug={post.node.fields!.slug!}
          title={post.node.frontmatter!.title!}
          image={post.node.frontmatter!.image!.childImageSharp!.gatsbyImageData}
          authors={post.node.frontmatter!.authors!}
          date={post.node.frontmatter!.date!}
          readingTime={post.node.fields!.readingTime!.text!}
          description={post.node.frontmatter!.description!}
          trackingCategory={tracking.category.blog_home}
        />
      ))}
      <PaginationNavigation
        trackingCategory={tracking.category.blog_home}
        previousPageUrl={prevPage}
        previousPageTrackingAction={tracking.action.open_blog_previous_page}
        nextPageUrl={nextPage}
        nextPageTrackingAction={tracking.action.open_blog_next_page}
        isFirst={isFirst}
        isLast={isLast}
      />
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
