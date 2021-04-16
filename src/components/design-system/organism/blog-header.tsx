import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import styled from "styled-components";
import { Heading3 } from "../atoms/heading3";

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

  @media (prefers-color-scheme: dark) {
    color: ${(props) => props.theme.dark.primaryTextColor};
  }

  @media (max-width: 992px) {
    font-size: 28px;
  }

  @media (max-width: 320px) {
    font-size: 22px;
  }
`;

const BlogDescription = styled.span`
  display: block;
  font-size: ${(props) => props.theme.fontSizes[4]};
  color: ${(props) => props.theme.light.secondaryTextColor};

  @media (prefers-color-scheme: dark) {
    color: ${(props) => props.theme.dark.secondaryTextColor};
  }

  @media (max-width: 992px) {
    font-size: 12px;
  }

  @media (max-width: 320px) {
    font-size: 10px;
  }
`;

export const BlogHeader: React.FC = () => (
  <BlogHeaderContainer>
    <StaticImage
      src={"../../../images/blog-logo.jpg"}
      alt={"blog logo"}
      width={80}
      height={80}
      style={{
        marginRight: "10px",
        borderRadius: "10px",
        boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.575)",
      }}
      imgStyle={{
        borderRadius: "10px",
        boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.575)",
      }}
    />
    <BlogHeaderColumn>
      <BlogTitle>CHICIO CODING</BlogTitle>
      <BlogDescription>
        Dirty clean code. Creative Stuff. Stuff.
      </BlogDescription>
    </BlogHeaderColumn>
  </BlogHeaderContainer>
);
