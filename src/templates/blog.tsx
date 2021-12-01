import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { tracking } from "../logic/tracking";
import { BlogListQuery } from "../../graphql-types";
import { BlogPageTemplate } from "../components/design-system/templates/blog-page-template";
import { PaginationNavigation } from "../components/design-system/molecules/pagination-navigation";
import { PostCard } from "../components/design-system/molecules/post-card";
import { OgPageType } from "../logic/seo";
import { getCurrentLocationFrom } from "../logic/current-location";
import { slugs } from "../logic/slug";
import { mediaQuery } from "../components/design-system/utils-css/media-query";
import styled from "styled-components";

type groupByArrayType = <T>(array: T[], numberPerGroup: number) => T[][];

const groupArrayBy: groupByArrayType = (data, n) => {
  const group = Array(0);
  for (let i = 0, j = 0; i < data.length; i += 1) {
    if (i >= n && i % n === 0) j += 1;
    group[j] = group[j] || [];
    group[j].push(data[i]);
  }
  return group;
};

const PostsRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${mediaQuery.minWidth.md} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

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
  const prevPage = `${slugs.blog}${
    currentPage - 1 === 1 ? "" : (currentPage - 1).toString()
  }`;
  const nextPage = `${slugs.blog}${(currentPage + 1).toString()}`;
  const siteMetadata = data.site!.siteMetadata!;
  const author = siteMetadata.author!;
  const featuredImage = siteMetadata.featuredImage!;

  const firstPost = posts[0];
  const postsGrouped = groupArrayBy(posts.slice(1, posts.length), 2);

  return (
    <BlogPageTemplate
      author={author}
      location={getCurrentLocationFrom(location)}
      ogImage={featuredImage}
      ogPageType={OgPageType.WebSite}
      trackingCategory={tracking.category.blog_home}
    >
      <PostCard
        big={true}
        key={firstPost.node.fields!.slug!}
        slug={firstPost.node.fields!.slug!}
        title={firstPost.node.frontmatter!.title!}
        image={
          firstPost.node.frontmatter!.image!.childImageSharp!.gatsbyImageData
        }
        authors={firstPost.node.frontmatter!.authors!}
        date={firstPost.node.frontmatter!.date!}
        readingTime={firstPost.node.fields!.readingTime!.text!}
        description={firstPost.node.frontmatter!.description!}
        trackingCategory={tracking.category.blog_home}
        tags={firstPost.node.frontmatter!.tags}
      />
      {postsGrouped.map((postsGroup, index) => (
        <PostsRow key={`PostCardsRow${index}`}>
          <PostCard
            big={false}
            key={postsGroup[0].node.fields!.slug!}
            slug={postsGroup[0].node.fields!.slug!}
            title={postsGroup[0].node.frontmatter!.title!}
            image={
              postsGroup[0].node.frontmatter!.image!.childImageSharp!
                .gatsbyImageData
            }
            authors={postsGroup[0].node.frontmatter!.authors!}
            date={postsGroup[0].node.frontmatter!.date!}
            readingTime={postsGroup[0].node.fields!.readingTime!.text!}
            description={postsGroup[0].node.frontmatter!.description!}
            trackingCategory={tracking.category.blog_home}
            tags={postsGroup[0].node.frontmatter!.tags}
          />
          {postsGroup[1] && (
            <PostCard
              big={false}
              key={postsGroup[1].node.fields!.slug!}
              slug={postsGroup[1].node.fields!.slug!}
              title={postsGroup[1].node.frontmatter!.title!}
              image={
                postsGroup[1].node.frontmatter!.image!.childImageSharp!
                  .gatsbyImageData
              }
              authors={postsGroup[1].node.frontmatter!.authors!}
              date={postsGroup[1].node.frontmatter!.date!}
              readingTime={postsGroup[1].node.fields!.readingTime!.text!}
              description={postsGroup[1].node.frontmatter!.description!}
              trackingCategory={tracking.category.blog_home}
              tags={postsGroup[1].node.frontmatter!.tags}
            />
          )}
        </PostsRow>
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
    </BlogPageTemplate>
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
            tags
            date(formatString: "DD MMM YYYY")
            image {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
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
