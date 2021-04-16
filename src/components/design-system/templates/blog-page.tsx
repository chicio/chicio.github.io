import { Head } from "../../head";
import { Menu } from "../organism/menu";
import { BlogHeader } from "../../BlogHeader";
import { Page } from "./page";
import * as React from "react";
import styled from "styled-components";
import { Container } from "../atoms/container";
import { Footer } from "../../Footer";
import { WindowLocation } from "@reach/router";

const BlogContainer = styled(Container)`
  margin-top: 100px;
  flex: 1 0 auto;
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
      <BlogHeader trackingCategory={trackingCategory} />
      {children}
    </BlogContainer>
    <Footer author={author} trackingCategory={trackingCategory} />
  </Page>
);
