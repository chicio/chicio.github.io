import styled from "styled-components";
import { ContainerFluid } from "../atoms/container-fluid";
import { Time } from "../atoms/time";
import { Heading1 } from "../atoms/heading1";
import {
  MarkdownRemarkFields,
  MarkdownRemarkFrontmatter,
  Maybe,
} from "../../../../graphql-types";
import { WindowLocation } from "@reach/router";
import React from "react";
import { BlogPage } from "./blog-page";
import { StandardInternalLink } from "../atoms/standard-internal-link";
import { track, tracking } from "../../../utils/tracking";

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

interface BlogGenericPostListPageProps {
  title: string;
  posts: Array<{
    node: {
      fields?: Maybe<Pick<MarkdownRemarkFields, "slug">>;
      frontmatter?: Maybe<Pick<MarkdownRemarkFrontmatter, "date" | "title">>;
    };
  }>;
  author: string;
  location: WindowLocation<WindowLocation["state"]>;
  ogPageType: string;
  ogImage: string;
  trackingCategory: string;
}

export const BlogGenericPostListPage: React.FC<BlogGenericPostListPageProps> = ({
  title,
  posts,
  author,
  location,
  ogPageType,
  ogImage,
  trackingCategory,
}) => (
  <BlogPage
    location={location}
    author={author}
    ogPageType={ogPageType}
    ogImage={ogImage}
    trackingCategory={trackingCategory}
  >
    <PostListTitle>{title}</PostListTitle>
    {posts.map((post) => (
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
                trackingCategory,
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
