import React from "react";
import { Meta, Story } from "@storybook/react";
import {
  BlogPage,
  BlogPageProps,
} from "../../src/components/design-system/templates/blog-page";
import { Paragraph } from "../../src/components/design-system/atoms/paragraph";

export const BlogPageStory: Story<BlogPageProps> = (args) => (
  <BlogPage {...args}>
    <Paragraph>Example page</Paragraph>
  </BlogPage>
);
BlogPageStory.args = {
  location: {
    pathname: "/blog/",
    url: "http://localhost:8000/blog/",
  },
  author: "Fabrizio Duroni",
  ogPageType: "WebSite",
  ogImage: "/a-photo.jpg",
  trackingCategory: "blog",
};
BlogPageStory.storyName = "Blog Page";

export default {
  title: "Templates/Blog Page",
  component: BlogPage,
} as Meta;
