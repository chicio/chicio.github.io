import styled from "styled-components";
import { Paragraph } from "../atoms/paragraph";
import { StandardInternalLink } from "../atoms/standard-internal-link";
import { track, tracking } from "../../../utils/tracking";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import { PostAuthors } from "./post-authors";
import { PostMeta } from "./post-meta";
import * as React from "react";
import { Maybe } from "../../../../graphql-types";
import { Heading5 } from "../atoms/heading5";

const PostDescription = styled(Paragraph)`
  margin-right: 0;
  margin-left: 0;
`;

const PostCardContainer = styled.div`
  border-radius: 4px;
  padding: ${(props) => props.theme.spacing[4]};
  margin-top: ${(props) => props.theme.spacing[4]};
  transition: transform 0.2s;
  background-color: ${(props) => props.theme.light.generalBackgroundLight};
  box-shadow: 0 3px 10px 0 ${(props) => props.theme.light.boxShadowLight};

  @media (min-width: 992px) {
    &:hover {
      transform: scale(1.025);
    }
  }

  @media (prefers-color-scheme: dark) {
    background-color: ${(props) => props.theme.dark.generalBackgroundLight};
    box-shadow: 0 3px 10px 0 ${(props) => props.theme.dark.boxShadowLight};
  }
`;

const PostCardImageContainer = styled.div`
  width: 100%;
  margin-top: ${(props) => props.theme.spacing[2]};
  margin-bottom: ${(props) => props.theme.spacing[0]};
  height: 200px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PostCardLink = styled(StandardInternalLink)`
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

interface PostCardProps {
  slug: string;
  title: string;
  image: IGatsbyImageData;
  authors: Maybe<string>[];
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
  date,
  readingTime,
  description,
  trackingCategory,
}) => (
  <PostCardContainer key={slug}>
    <PostCardLink
      to={slug}
      onClick={() => {
        track(
          tracking.action.open_blog_post,
          trackingCategory,
          tracking.label.body
        );
      }}
    >
      <Heading5>{title}</Heading5>
      <PostCardImageContainer>
        <GatsbyImage
          alt={title}
          image={image}
          imgStyle={{ borderRadius: "4px" }}
          style={{
            width: "110%",
            height: "auto",
            borderRadius: "4px",
          }}
        />
      </PostCardImageContainer>
      <PostAuthors
        authors={authors}
        trackingCategory={trackingCategory}
        trackingLabel={tracking.label.body}
        enableUrl={false}
      />
      <PostMeta date={date} readingTime={readingTime} />
      <PostDescription>{description}</PostDescription>
    </PostCardLink>
  </PostCardContainer>
);
