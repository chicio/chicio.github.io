import { graphql, PageProps } from "gatsby";
import { tracking } from "../logic/tracking";
import { BlogPageTemplate } from "../components/design-system/templates/blog-page-template";
import { PaginationNavigation } from "../components/design-system/molecules/pagination-navigation";
import { PostCard } from "../components/design-system/molecules/post-card";
import { OgPageType } from "../logic/seo";
import { getCurrentLocationFrom } from "../logic/current-location";
import { slugs } from "../logic/slug";
import { PostsRow } from "../components/design-system/molecules/posts-row";
import { FC } from "react";

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

interface BlogPageContext {
  limit: number;
  skip: number;
  numberOfPages: number;
  currentPage: number;
}

const Blog: FC<PageProps<Queries.BlogListQuery, BlogPageContext>> = ({
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
      big={true}
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
        tags={firstPost.node.frontmatter!.tags!}
      />
      {postsGrouped.map((postsGroup, index) => (
        <PostsRow postsGroup={postsGroup} key={`PostCardsRow${index}`} />
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
      sort: { frontmatter: { date: DESC } }
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
