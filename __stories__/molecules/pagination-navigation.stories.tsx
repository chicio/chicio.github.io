import React from "react";
import { Meta, Story } from "@storybook/react";
import {
  PageNavigationProps,
  PaginationNavigation,
} from "../../src/components/design-system/molecules/pagination-navigation";

const Template: Story<PageNavigationProps> = (args) => (
  <PaginationNavigation {...args} />
);

export const PaginationNavigationStory = Template.bind({});
PaginationNavigationStory.args = {
  trackingCategory: "",
  previousPageUrl: "",
  previousPageTrackingAction: "",
  nextPageUrl: "",
  nextPageTrackingAction: "",
  isFirst: false,
  isLast: false,
};
PaginationNavigationStory.storyName = "Pagination Navigation";

export default {
  title: "Molecules/Pagination Navigation",
  component: PaginationNavigation,
} as Meta;
