import React from "react";
import { Meta, Story } from "@storybook/react";
import {
  BlogPageTemplate,
  BlogPageProps,
} from "../../src/components/design-system/templates/blog-page-template";
import { Paragraph } from "../../src/components/design-system/atoms/paragraph";
import { OgPageType } from "../../src/logic/seo";

export const BlogPageTemplateStory: Story<BlogPageProps> = (args) => (
  <BlogPageTemplate {...args}>
    <Paragraph>Example page</Paragraph>
  </BlogPageTemplate>
);
BlogPageTemplateStory.args = {
  location: {
    pathname: "/blog/",
    url: "http://localhost:8000/blog/",
  },
  author: "Fabrizio Duroni",
  ogPageType: OgPageType.WebSite,
  ogImage: "/a-photo.jpg",
  trackingCategory: "blog",
};
BlogPageTemplateStory.storyName = "Blog Page Template";

export default {
  title: "Templates/Blog Page Template",
  component: BlogPageTemplate,
} as Meta;
