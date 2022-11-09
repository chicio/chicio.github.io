import React from "react";
import { Meta } from "@storybook/react";
import { BlogHeader } from "../../src/components/design-system/organism/blog-header";

export const BlogHeaderContainer: React.FC = () => <BlogHeader />;

// @ts-ignore
BlogHeaderContainer.storyName = "Blog Header";

export default {
  title: "Organisms/Blog Header",
  component: BlogHeaderContainer,
} as Meta;
