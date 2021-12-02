import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import styled from "styled-components";
import { mediaQuery } from "../utils-css/media-query";
import { gatsbyImagePlaceholderSelector } from "../utils-css/gatsby-image-selector";

const BlogHeaderContainer = styled.div`
  display: flex;
  align-items: center;

  ${mediaQuery.minWidth.sm} {
    margin-top: ${(props) => props.theme.spacing[10]};
    margin-bottom: ${(props) => props.theme.spacing[14]};
  }
`;

const BlogHeaderColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BlogTitle = styled.span`
  color: ${(props) => props.theme.light.textAbovePrimaryColor};
  margin: 0;
  font-weight: bold;
  display: block;
  line-height: 1.5;
  font-size: ${(props) => props.theme.fontSizes[4]};

  ${mediaQuery.dark} {
    color: ${(props) => props.theme.dark.textAbovePrimaryColor};
  }

  ${mediaQuery.minWidth.xs} {
    font-size: ${(props) => props.theme.fontSizes[6]};
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
    color: ${(props) => props.theme.light.textAbovePrimaryColor};
    line-height: 1.5;

    ${mediaQuery.dark} {
      color: ${(props) => props.theme.dark.textAbovePrimaryColor};
    }
  }
`;

const ImageContainer = styled.div`
  width: 35px;
  height: 35px;
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

  ${gatsbyImagePlaceholderSelector} {
    border-radius: 10px;
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

const Background = styled.div<DesktopHeaderProps>`
  background-image: linear-gradient(
    to bottom,
    ${(props) => props.theme.dark.secondaryColor},
    ${(props) => props.theme.dark.primaryColor}
  );
  height: ${(props) => (props.big ? "400px" : "220px")};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: -100;
`;

export const BlogHeader: React.FC = () => (
  <BlogHeaderContainer>
    <ImageContainer>
      <StaticImage
        src={"../../../images/blog-logo.jpg"}
        alt={"blog logo"}
        width={80}
        height={80}
        placeholder={"blurred"}
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

interface DesktopHeaderProps {
  big: boolean;
}

export const DesktopBlogHeader: React.FC<DesktopHeaderProps> = ({ big }) => (
  <DesktopContainer>
    <BlogHeader />
    <Background big={big} />
  </DesktopContainer>
);

export const MobileBlogHeader: React.FC<MobileContainerProps> = ({
  height,
}) => (
  <MobileContainer height={height}>
    <BlogHeader />
  </MobileContainer>
);
