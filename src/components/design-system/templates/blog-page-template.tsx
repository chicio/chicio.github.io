import { DesktopBlogHeader } from "../organism/blog-header";
import { OgPageType } from "../../../logic/seo";
import { CurrentLocation } from "../../../logic/current-location";
import { BlogThemePage } from "./blog-theme-page";
import { Head } from "../../head";
import { BlogMenu } from "../organism/blog-menu";
import styled from "styled-components";
import { Container } from "../atoms/container";
import { blogPrimaryColor } from "../themes/blog-colors";
import { FC, ReactNode } from "react";
import { Footer } from "../organism/footer";

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
  big?: boolean;
  keywords?: ReadonlyArray<string | null>;
  children?: ReactNode;
}

export const BlogPageTemplate: FC<BlogPageProps> = ({
  children,
  location,
  author,
  ogPageType,
  ogImage,
  trackingCategory,
  customTitle,
  description,
  date,
  keywords,
  big = false,
}) => (
  <>
    <Head
      url={location.url}
      pageType={ogPageType}
      imageUrl={ogImage}
      customTitle={customTitle}
      description={description}
      date={date}
      cookieConsentColor={blogPrimaryColor}
      keywords={keywords}
    />
    <BlogThemePage>
      <BlogMenu
        trackingCategory={trackingCategory}
        pathname={location.pathname}
      />
      <ContentContainer>
        <DesktopBlogHeader big={big} />
        {children}
      </ContentContainer>
      <Footer author={author} trackingCategory={trackingCategory} />
    </BlogThemePage>
  </>
);
