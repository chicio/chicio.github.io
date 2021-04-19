import React from "react";
import "../styles/post-content.css";
import "../styles/syntax.css";
import styled from "styled-components";
import { heading3Style } from "./design-system/atoms/heading3";
import { heading4Style } from "./design-system/atoms/heading4";

interface PostContentProps {
  html: string;
}

export const PostContentContainer = styled.div`
  & ul li {
    font-size: ${(props) => props.theme.fontSizes[2]};
  }

  & p {
    font-size: ${(props) => props.theme.fontSizes[2]};
  }

  & figure figcaption {
    font-size: ${(props) => props.theme.fontSizes[1]};
    text-align: center;
  }

  & h3 {
    ${heading3Style}
  }

  & h4 {
    ${heading4Style}
  }
`;

export const PostContent: React.FC<PostContentProps> = ({ html }) => (
  <PostContentContainer dangerouslySetInnerHTML={{ __html: html }} />
);
