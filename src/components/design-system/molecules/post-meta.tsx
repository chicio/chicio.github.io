import React from "react";
import { Time } from "../atoms/time";
import { Paragraph } from "../atoms/paragraph";
import styled from "styled-components";

export interface PostMetaProps {
  date: string;
  readingTime: string;
}

const PostMetaParagraph = styled(Paragraph)`
  margin: ${(props) => props.theme.spacing[0]} 0
    ${(props) => props.theme.spacing[3]} 0;
  color: ${(props) => props.theme.light.secondaryTextColor};

  @media (prefers-color-scheme: dark) {
    color: ${(props) => props.theme.dark.secondaryTextColor};
  }
`;

export const PostMeta: React.FC<PostMetaProps> = ({ date, readingTime }) => (
  <PostMetaParagraph>
    <Time>{date}</Time> · <Time>{readingTime}</Time>
  </PostMetaParagraph>
);
