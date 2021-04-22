import React from "react";
import styled from "styled-components";
import { heading3Style } from "./design-system/atoms/heading3";
import { heading4Style } from "./design-system/atoms/heading4";
import { standardLinkStyle } from "./design-system/atoms/standard-link-style";
import { syntax } from "./design-system/atoms/syntax";

export const PostContentContainer = styled.div`
  color: ${(props) => props.theme.light.primaryTextColor};
  line-height: 1.5;

  & ul li {
    font-size: ${(props) => props.theme.fontSizes[2]};
    line-height: ${(props) => props.theme.lineHeight};
  }

  & p {
    font-size: ${(props) => props.theme.fontSizes[2]};
    margin-left: 0;
    margin-right: 0;
    line-height: ${(props) => props.theme.lineHeight};
  }

  & figure figcaption {
    font-size: ${(props) => props.theme.fontSizes[1]};
    text-align: center;
    line-height: ${(props) => props.theme.lineHeight};
  }

  & h3 {
    ${heading3Style};
    margin-left: 0;
    margin-right: 0;
    line-height: ${(props) => props.theme.lineHeight};
  }

  & h4 {
    ${heading4Style};
    margin-left: 0;
    margin-right: 0;
    line-height: ${(props) => props.theme.lineHeight};
  }

  & a {
    ${standardLinkStyle};
    line-height: ${(props) => props.theme.lineHeight};
  }

  & blockquote {
    line-height: ${(props) => props.theme.lineHeight};
    color: ${(props) => props.theme.light.secondaryTextColor};
    border-left: 5px solid ${(props) => props.theme.light.secondaryTextColor};
    margin-left: 0;
    margin-right: 0;
    padding: ${(props) => props.theme.spacing[4]}
      ${(props) => props.theme.spacing[2]};
  }

  & blockquote p {
    line-height: ${(props) => props.theme.lineHeight};
    margin-bottom: 0;
    margin-top: 0;
  }

  & hr {
    color: ${(props) => props.theme.light.dividerColor};
    background-color: ${(props) => props.theme.light.dividerColor};
    width: 100%;
    margin: ${(props) => props.theme.spacing[4]} 0;
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  @media (prefers-color-scheme: dark) {
    color: ${(props) => props.theme.dark.primaryTextColor};

    & blockquote {
      color: ${(props) => props.theme.dark.secondaryTextColor};
      border-left: 5px solid ${(props) => props.theme.dark.secondaryTextColor};
    }

    & hr {
      color: ${(props) => props.theme.dark.dividerColor};
      background-color: ${(props) => props.theme.dark.dividerColor};
    }
  }

  & .embedVideo-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 100%;
    width: 100%;
    overflow: hidden;
    margin: ${(props) => props.theme.spacing[2]} 0;
  }

  & .embedVideo-container iframe,
  .embedVideo-container object,
  .embedVideo-container embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  & .katex-display > .katex {
    display: inline-block;
    white-space: nowrap;
    max-width: 100%;
    overflow-x: scroll;
    text-align: initial;
    line-height: ${(props) => props.theme.lineHeight};
  }

  & .katex * {
    font-size: ${(props) => props.theme.fontSizes[4]};
  }

  & .emoji-icon {
    top: 4px;
  }

  ${syntax}
`;

interface PostContentProps {
  html: string;
}

export const PostContent: React.FC<PostContentProps> = ({ html }) => (
  <PostContentContainer dangerouslySetInnerHTML={{ __html: html }} />
);
