import React from "react";
import { Meta } from "@storybook/react";
import { BlogHeader } from "../../src/components/design-system/organism/blog-header";

export const BlogHeaderContainer: React.VFC = () => <BlogHeader />;

// @ts-ignore
BlogHeaderContainer.storyName = "Blog Header";

export default {
  title: "Organism/Blog Header",
  component: BlogHeaderContainer,
} as Meta;
