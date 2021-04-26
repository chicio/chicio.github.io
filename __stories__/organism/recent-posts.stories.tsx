import React from "react";
import { Meta, Story } from "@storybook/react";
import {
  RecentPosts,
  RecentPostsProps,
} from "../../src/components/design-system/organism/recent-posts";

const Template: Story<RecentPostsProps> = (args) => <RecentPosts {...args} />;

export const RecentPostsStory = Template.bind({});
RecentPostsStory.args = {
  currentSlug: "/blog",
};
RecentPostsStory.storyName = "Recent Posts";

export default {
  title: "Organism/Recent Posts",
  component: RecentPosts,
} as Meta;
