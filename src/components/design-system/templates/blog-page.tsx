import { DesktopBlogHeader } from "../organism/blog-header";
import * as React from "react";
import { OgPageType } from "../../../logic/seo";
import { CurrentLocation } from "../../../logic/current-location";
import { Page } from "./page";
import { Head } from "../../head";
import { BlogMenu } from "../organism/blog-menu";
import loadable from "@loadable/component";
import styled from "styled-components";
import { Container } from "../atoms/container";

const Footer = loadable(() => import(`../organism/footer`));

const ContentContainer = styled(Container)`
  margin-top: ${(props) => props.theme.spacing[12]};
  flex: 1 0 auto;
`;

export interface BlogPageProps {
  location: CurrentLocation;
  author: string;
  ogPageType: OgPageType;
  ogImage: string;
  trackingCategory: string;
  customTitle?: string;
  description?: string;
  date?: string;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  children,
  location,
  author,
  ogPageType,
  ogImage,
  trackingCategory,
  customTitle,
  description,
  date,
}) => (
  <Page>
    <Head
      url={location.url}
      pageType={ogPageType}
      imageUrl={ogImage}
      customTitle={customTitle}
      description={description}
      date={date}
    />
    <BlogMenu
      trackingCategory={trackingCategory}
      pathname={location.pathname}
    />
    <ContentContainer>
      <DesktopBlogHeader />
      {children}
    </ContentContainer>
    <Footer author={author} trackingCategory={trackingCategory} />
  </Page>
);
