import React from "react";
import { graphql, PageProps } from "gatsby";
import { ArchiveQuery } from "../../../graphql-types";
import { track, tracking } from "../../utils/tracking";
import { BlogPage } from "../../components/design-system/templates/blog-page";
import { StandardInternalLink } from "../../components/design-system/atoms/standard-internal-link";
import styled from "styled-components";
import { ContainerFluid } from "../../components/design-system/atoms/container-fluid";
import { Time } from "../../components/design-system/atoms/time";
import { Heading1 } from "../../components/design-system/atoms/heading1";

const PostContainer = styled(ContainerFluid)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: ${(props) => props.theme.spacing[3]};
  padding-left: 0;
  padding-right: 0;

  @media (min-width: 992px) {
    flex-direction: row;
    align-items: center;
  }
`;

interface ColumnProps {
  size: string;
}

const Column = styled.div<ColumnProps>`
  @media (min-width: 992px) {
    flex: ${(props) => props.size};
  }
`;

const PostTime = styled(Time)`
  font-size: ${(props) => props.theme.fontSizes[4]};
`;

const PostListTitle = styled(Heading1)`
  margin-bottom: ${(props) => props.theme.spacing[4]};
`;

const Archive: React.FC<PageProps<ArchiveQuery>> = ({ data, location }) => {
  const siteMetadata = data.site!.siteMetadata!;
  const author = siteMetadata.author!;
  const featuredImage = siteMetadata.featuredImage!;

  return (
    <BlogPage
      location={location}
      author={author}
      ogPageType={"website"}
      ogImage={`/${featuredImage}`}
      trackingCategory={tracking.category.blog_archive}
    >
      <PostListTitle>Archive</PostListTitle>
      {data.allMarkdownRemark.edges.map((post) => (
        <PostContainer key={post.node.fields!.slug!}>
          <Column size={"15%"}>
            <PostTime>{post.node.frontmatter?.date}</PostTime>
          </Column>
          <Column size={"85%"}>
            <StandardInternalLink
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
            </StandardInternalLink>
          </Column>
        </PostContainer>
      ))}
    </BlogPage>
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
