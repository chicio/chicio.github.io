import styled from "styled-components";
import { ContainerFluid } from "../atoms/container-fluid";
import { Time } from "../atoms/time";
import { FC } from "react";
import { BlogPageTemplate } from "./blog-page-template";
import { tracking } from "../../../logic/tracking";
import { PageTitle } from "../molecules/page-title";
import { OgPageType } from "../../../logic/seo";
import { CurrentLocation } from "../../../logic/current-location";
import { StandardInternalLinkWithTracking } from "../../standard-internal-link-with-tracking";
import { mediaQuery } from "../utils-css/media-query";

const PostContainer = styled(ContainerFluid)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: ${(props) => props.theme.spacing[3]};
  padding-left: 0;
  padding-right: 0;

  ${mediaQuery.minWidth.md} {
    flex-direction: row;
    align-items: center;
  }
`;

interface ColumnProps {
  size: string;
}

const Column = styled.div<ColumnProps>`
  ${mediaQuery.minWidth.md} {
    flex: ${(props) => props.size};
  }
`;

const PostTime = styled(Time)`
  font-size: ${(props) => props.theme.fontSizes[4]};
`;

const PostLink = styled(StandardInternalLinkWithTracking)`
  font-size: ${(props) => props.theme.fontSizes[4]};
`;

export interface BlogGenericPostListPageProps {
  title: string;
  posts: ReadonlyArray<{
    readonly node: {
      readonly fields: { readonly slug: string | null } | null;
      readonly frontmatter: {
        readonly title: string | null;
        readonly date: string | null;
      } | null;
    };
  }>;
  author: string;
  location: CurrentLocation;
  ogPageType: OgPageType;
  ogImage: string;
  trackingCategory: string;
}

export const BlogGenericPostListPageTemplate: FC<
  BlogGenericPostListPageProps
> = ({
  title,
  posts,
  author,
  location,
  ogPageType,
  ogImage,
  trackingCategory,
}) => (
  <BlogPageTemplate
    location={location}
    author={author}
    ogPageType={ogPageType}
    ogImage={ogImage}
    trackingCategory={trackingCategory}
  >
    <PageTitle>{title}</PageTitle>
    {posts.map((post) => (
      <PostContainer key={post.node.fields!.slug!}>
        <Column size={"15%"}>
          <PostTime>{post.node.frontmatter?.date}</PostTime>
        </Column>
        <Column size={"85%"}>
          <PostLink
            to={post.node.fields!.slug!}
            trackingData={{
              action: tracking.action.open_blog_post,
              category: trackingCategory,
              label: tracking.label.body,
            }}
          >
            {post.node.frontmatter?.title}
          </PostLink>
        </Column>
      </PostContainer>
    ))}
  </BlogPageTemplate>
);
