import { Head } from "../../head";
import { Menu } from "../organism/menu";
import { BlogHeader } from "../organism/blog-header";
import { Page } from "./page";
import * as React from "react";
import styled from "styled-components";
import { Container } from "../atoms/container";
import { Footer } from "../organism/footer";
import { WindowLocation } from "@reach/router";

const BlogContainer = styled(Container)`
  width: 90%;
  padding: 0;
  margin: ${(props) => props.theme.spacing[12]} auto auto;
`;

interface BlogPageProps {
  location: WindowLocation<WindowLocation["state"]>;
  author: string;
  ogPageType: string;
  ogImage: string;
  trackingCategory: string;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  children,
  location,
  author,
  ogPageType,
  ogImage,
  trackingCategory,
}) => (
  <Page>
    <Head url={location.href} pageType={ogPageType} imageUrl={ogImage} />
    <Menu trackingCategory={trackingCategory} pathname={location.pathname} />
    <BlogContainer>
      <BlogHeader />
      {children}
    </BlogContainer>
    <Footer author={author} trackingCategory={trackingCategory} />
  </Page>
);
