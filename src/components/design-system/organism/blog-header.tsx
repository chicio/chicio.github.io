import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import styled from "styled-components";
import { mediaQuery } from "../utils-css/media-query";

const BlogHeaderContainer = styled.div`
  display: flex;
  align-items: center;

  ${mediaQuery.minWidth.sm} {
    margin-top: ${(props) => props.theme.spacing[10]};
    margin-bottom: ${(props) => props.theme.spacing[10]};
  }
`;

const BlogHeaderColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BlogTitle = styled.span`
  color: ${(props) => props.theme.light.primaryTextColor};
  margin: 0;
  font-weight: bold;
  display: block;
  line-height: 1.5;
  font-size: ${(props) => props.theme.fontSizes[6]};

  ${mediaQuery.dark} {
    color: ${(props) => props.theme.dark.primaryTextColor};
  }

  ${mediaQuery.minWidth.sm} {
    font-size: ${(props) => props.theme.fontSizes[9]};
  }
`;

const BlogDescription = styled.span`
  display: none;

  ${mediaQuery.minWidth.sm} {
    display: block;
    font-size: ${(props) => props.theme.fontSizes[4]};
    color: ${(props) => props.theme.light.secondaryTextColor};
    line-height: 1.5;

    ${mediaQuery.dark} {
      color: ${(props) => props.theme.dark.secondaryTextColor};
    }
  }
`;

const ImageContainer = styled.div`
  width: 35px;
  height: 35px;

  background-color: ${(props) => props.theme.light.generalBackgroundLight};
  margin-right: ${(props) => props.theme.spacing[2]};
  border-radius: 10px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.575);

  ${mediaQuery.minWidth.sm} {
    width: 80px;
    height: 80px;
  }

  ${mediaQuery.dark} {
    background-color: ${(props) => props.theme.dark.generalBackgroundLight};
  }
`;

export const DesktopContainer = styled.div`
  display: none;

  ${mediaQuery.minWidth.sm} {
    display: block;
  }
`;

interface MobileContainerProps {
  height: string;
}

export const MobileContainer = styled.div<MobileContainerProps>`
  display: flex;
  height: ${(props) => props.height};

  ${mediaQuery.minWidth.sm} {
    display: none;
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

export const DesktopBlogHeader: React.FC = () => (
  <DesktopContainer>
    <BlogHeader />
  </DesktopContainer>
);

export const MobileBlogHeader: React.FC<MobileContainerProps> = ({
  height,
}) => (
  <MobileContainer height={height}>
    <BlogHeader />
  </MobileContainer>
);
