import React from "react";
import "../styles/syntax.css";
import styled from "styled-components";
import { heading3Style } from "./design-system/atoms/heading3";
import { heading4Style } from "./design-system/atoms/heading4";
import { standardLinkStyle } from "./design-system/atoms/standard-link-style";

export const PostContentContainer = styled.div`
  line-height: 1.5;
  
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

  & a {
    ${standardLinkStyle}
  }
  
  & blockquote {
    color: ${(props) => props.theme.light.secondaryTextColor};
    border-left: 5px solid ${(props) => props.theme.light.secondaryTextColor};
    padding: ${(props) => props.theme.spacing[4]} ${(props) =>
  props.theme.spacing[2]};
  }

  & blockquote p {
    margin-bottom: 0
  }

  & hr {
    background-color: ${(props) => props.theme.light.dividerColor}
    width: 100%;
    margin: ${(props) => props.theme.spacing[4]} 0;
  }

  @media (prefers-color-scheme: dark) {
    & blockquote {
      color: ${(props) => props.theme.dark.secondaryTextColor};
      border-left: 5px solid ${(props) => props.theme.dark.secondaryTextColor};
    }
    
    & hr {
      background-color: ${(props) => props.theme.dark.dividerColor}
    }
  }

  .embedVideo-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 100%;
    width: 100%;
    overflow: hidden;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .embedVideo-container iframe, .embedVideo-container object, .embedVideo-container embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .gist {
    max-width:100%;
    overflow:auto;
  }

  .gist .blob-wrapper.data {
    max-height:600px;
    overflow:auto;
  }

  .katex-display > .katex {
    display: inline-block;
    white-space: nowrap;
    max-width: 100%;
    overflow-x: scroll;
    text-align: initial;
  }
`;

interface PostContentProps {
  html: string;
}

export const PostContent: React.FC<PostContentProps> = ({ html }) => (
  <PostContentContainer dangerouslySetInnerHTML={{ __html: html }} />
);
