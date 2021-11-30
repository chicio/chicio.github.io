import styled from "styled-components";
import { Paragraph } from "../atoms/paragraph";
import { tracking } from "../../../logic/tracking";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import { PostAuthors } from "./post-authors";
import { PostMeta } from "./post-meta";
import * as React from "react";
import { Heading5 } from "../atoms/heading5";
import { StandardInternalLinkWithTracking } from "../../standard-internal-link-with-tracking";
import { mediaQuery } from "../utils-css/media-query";
import PostTags from "./post-tags";

const PostDescription = styled(Paragraph)`
  margin-right: 0;
  margin-left: 0;
`;

const PostCardContainer = styled.div`
  border-radius: 4px;
  margin-top: ${(props) => props.theme.spacing[4]};
  background-color: ${(props) => props.theme.light.generalBackgroundLight};
  box-shadow: 0 3px 10px 0 ${(props) => props.theme.light.boxShadowLight};

  ${mediaQuery.minWidth.md} {
    ${mediaQuery.inputDevice.mouse} {
      transition: transform 0.2s;

      &:hover {
        transform: scale(1.025);
      }
    }
  }

  ${mediaQuery.dark} {
    background-color: ${(props) => props.theme.dark.generalBackgroundLight};
    box-shadow: 0 3px 10px 0 ${(props) => props.theme.dark.boxShadowLight};
  }
`;

const PostCardImageContainer = styled(GatsbyImage)`
  width: 100%;
  object-fit: cover;
  height: 200px;

  ${mediaQuery.minWidth.sm} {
    height: 250px;
  }
`;

const A = styled.div`
  border-radius: 20px;
`;

const PostCardLink = styled(StandardInternalLinkWithTracking)`
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

const PostCardTitle = styled(Heading5)`
  margin: 0 0 ${(props) => props.theme.spacing[2]};
  word-wrap: break-word;
`;

const PostCardMetaContainer = styled.div`
  padding: ${(props) => props.theme.spacing[4]};
`;

export interface PostCardProps {
  slug: string;
  title: string;
  image: IGatsbyImageData;
  authors: (string | null | undefined)[];
  tags: (string | null | undefined)[] | null | undefined;
  date: string;
  readingTime: string;
  description: string;
  trackingCategory: string;
}

export const PostCard: React.FC<PostCardProps> = ({
  slug,
  title,
  image,
  authors,
  tags,
  date,
  readingTime,
  description,
  trackingCategory,
}) => (
  <PostCardContainer key={slug}>
    <A>
      <PostCardLink
        to={slug}
        trackingData={{
          action: tracking.action.open_blog_post,
          category: trackingCategory,
          label: tracking.label.body,
        }}
      >
        <PostCardImageContainer
          alt={title}
          image={image}
          imgStyle={{
            borderRadius: "4px 4px 0 0",
          }}
        />
      </PostCardLink>
      <PostCardMetaContainer>
        <PostCardLink
          to={slug}
          trackingData={{
            action: tracking.action.open_blog_post,
            category: trackingCategory,
            label: tracking.label.body,
          }}
        >
          <PostCardTitle>{title}</PostCardTitle>
          <PostAuthors
            authors={authors}
            trackingCategory={trackingCategory}
            trackingLabel={tracking.label.body}
            enableUrl={false}
          />
          <PostMeta date={date} readingTime={readingTime} />
          <PostDescription>{`${description} [...]`}</PostDescription>
        </PostCardLink>
        {tags && (
          <PostTags
            tags={tags}
            trackingCategory={tracking.category.blog_home}
            trackingLabel={tracking.label.body}
          />
        )}
      </PostCardMetaContainer>
    </A>
  </PostCardContainer>
);
