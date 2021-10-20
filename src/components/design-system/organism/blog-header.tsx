import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import styled from "styled-components";
import { Heading3 } from "../atoms/heading3";
import { mediaQuery } from "../utils-css/media-query";

const BlogHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 20px;
`;

const BlogHeaderColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BlogTitle = styled(Heading3)`
  color: ${(props) => props.theme.light.primaryTextColor};
  margin: 0;
  font-weight: bold;
  display: block;
  line-height: 1.5;

  @media (prefers-color-scheme: dark) {
    color: ${(props) => props.theme.dark.primaryTextColor};
  }

  ${mediaQuery.maxWidth.md} {
    font-size: 28px;
  }

  ${mediaQuery.maxWidth.xs} {
    font-size: 22px;
  }
`;

const BlogDescription = styled.span`
  display: block;
  font-size: ${(props) => props.theme.fontSizes[4]};
  color: ${(props) => props.theme.light.secondaryTextColor};
  line-height: 1.5;

  @media (prefers-color-scheme: dark) {
    color: ${(props) => props.theme.dark.secondaryTextColor};
  }

  ${mediaQuery.maxWidth.md} {
    font-size: 12px;
  }

  ${mediaQuery.maxWidth.xs} {
    font-size: 10px;
  }
`;

const ImageContainer = styled.div`
  width: 80px;
  height: 80px;
  background-color: ${(props) => props.theme.light.generalBackgroundLight};
  margin-right: ${(props) => props.theme.spacing[2]};
  border-radius: 10px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.575);

  @media (prefers-color-scheme: dark) {
    background-color: ${(props) => props.theme.dark.generalBackgroundLight};
  }
`;

export const BlogHeader: React.FC = () => (
  <BlogHeaderContainer>
    <ImageContainer>
      <StaticImage
        src={"../../../images/blog-logo.jpg"}
        alt={"blog logo"}
        width={80}
        height={80}
        imgStyle={{
          borderRadius: "10px",
          boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.575)",
        }}
      />
    </ImageContainer>
    <BlogHeaderColumn>
      <BlogTitle>CHICIO CODING</BlogTitle>
      <BlogDescription>
        Dirty clean code. Creative Stuff. Stuff.
      </BlogDescription>
    </BlogHeaderColumn>
  </BlogHeaderContainer>
);
