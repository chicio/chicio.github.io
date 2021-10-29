import { DesktopBlogHeader } from "../organism/blog-header";
import * as React from "react";
import { OgPageType } from "../../../logic/seo";
import { CurrentLocation } from "../../../logic/current-location";
import { PageWithContent } from "./page-with-content";

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
  <PageWithContent
    location={location}
    author={author}
    ogPageType={ogPageType}
    ogImage={ogImage}
    trackingCategory={trackingCategory}
    customTitle={customTitle}
    description={description}
    date={date}
  >
    <DesktopBlogHeader />
    {children}
  </PageWithContent>
);
