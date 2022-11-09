import { Meta } from "@storybook/react";
import { PageTitle } from "../../src/components/design-system/molecules/page-title";
import React from "react";

export const PageTitleContainer: React.FC = () => (
  <PageTitle>{"Page Title"}</PageTitle>
);

// @ts-ignore
PageTitleContainer.storyName = "Page Title";

export default {
  title: "Molecules/Page Title",
  component: PageTitle,
} as Meta;
