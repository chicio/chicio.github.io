import React from "react";
import { Meta } from "@storybook/react";
import { BlogHeader } from "../../src/components/design-system/organism/blog-header";

export const BlogHeaderContainer: React.VFC = () => <BlogHeader />;

// @ts-ignore
BlogHeaderContainer.storyName = "Header";

export default {
  title: "Organism/Blog",
  component: BlogHeaderContainer,
} as Meta;
