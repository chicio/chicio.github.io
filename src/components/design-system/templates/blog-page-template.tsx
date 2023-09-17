import { DesktopBlogHeader } from "../organism/blog-header";
import { OgPageType } from "../../../logic/seo";
import { CurrentLocation } from "../../../logic/current-location";
import { BlogThemePage } from "./blog-theme-page";
import { Head } from "../../head";
import { BlogMenu } from "../organism/blog-menu";
import loadable from "@loadable/component";
import styled from "styled-components";
import { Container } from "../atoms/container";
import { blogPrimaryColor } from "../blog-colors";
import { FC, ReactNode } from "react";

const Footer = loadable(() => import(`../organism/footer`));

const ContentContainer = styled(Container)`
  margin-top: ${(props) => props.theme.spacing[12]};
  flex: 1 0 auto;
`;

const ContentContainerApp = styled(Container)`
  flex: 1 0 auto;
`;

export interface BlogPageProps {
  location: CurrentLocation;
  author: string;
  ogPageType: OgPageType;
  ogImage: string;
  trackingCategory: string;
  pageOpenedInApp: boolean;
  customTitle?: string;
  description?: string;
  date?: string;
  big?: boolean;
  children?: ReactNode;
}

const StandardLayout: FC<{
  location: CurrentLocation;
  trackingCategory: string;
  children?: ReactNode;
  big: boolean;
  author: string;
}> = ({ location, trackingCategory, big, author, children }) => {
  return (
    <div>
      <BlogMenu
        trackingCategory={trackingCategory}
        pathname={location.pathname}
      />
      <ContentContainer>
        <DesktopBlogHeader big={big} />
        {children}
      </ContentContainer>
      <Footer author={author} trackingCategory={trackingCategory} />
    </div>
  );
};

export const BlogPageTemplate: FC<BlogPageProps> = ({
  children,
  location,
  author,
  ogPageType,
  ogImage,
  trackingCategory,
  pageOpenedInApp,
  customTitle,
  description,
  date,
  big = false,
}) => {
  console.log("from app", pageOpenedInApp);
  return (
    <BlogThemePage>
      <Head
        url={location.url}
        pageType={ogPageType}
        imageUrl={ogImage}
        customTitle={customTitle}
        description={description}
        date={date}
        cookieConsentColor={blogPrimaryColor}
      />
      {!pageOpenedInApp ? (
        <StandardLayout
          location={location}
          big={big}
          trackingCategory={trackingCategory}
          author={author}
        >
          {children}
        </StandardLayout>
      ) : (
        <ContentContainerApp>{children}</ContentContainerApp>
      )}
    </BlogThemePage>
  );
};
