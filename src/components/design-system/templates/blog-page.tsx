import { Head } from "../../head";
import { Menu } from "../organism/menu";
import { BlogHeader } from "../organism/blog-header";
import { Page } from "./page";
import * as React from "react";
import styled from "styled-components";
import { Container } from "../atoms/container";
import { Footer } from "../organism/footer";
import { OgPageType } from "../../../logic/seo";
import { CurrentLocation } from "../../../logic/url";

const BlogContainer = styled(Container)`
  margin-top: ${(props) => props.theme.spacing[12]};
  flex: 1 0 auto;
`;

export interface BlogPageProps {
  location: CurrentLocation;
  author: string;
  ogPageType: OgPageType;
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
    <Head url={location.url} pageType={ogPageType} imageUrl={ogImage} />
    <Menu trackingCategory={trackingCategory} pathname={location.pathname} />
    <BlogContainer>
      <BlogHeader />
      {children}
    </BlogContainer>
    <Footer author={author} trackingCategory={trackingCategory} />
  </Page>
);
