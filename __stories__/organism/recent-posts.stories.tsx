import { Meta, Story } from "@storybook/react";
import {
  RecentPosts,
  RecentPostsProps,
} from "../../src/components/design-system/organism/read-next";

const Template: Story<RecentPostsProps> = (args) => <RecentPosts {...args} />;

export const RecentPostsStory = Template.bind({});
RecentPostsStory.args = {
  currentSlug: "/blog",
};
RecentPostsStory.storyName = "Recent Posts";

export default {
  title: "Organisms/Recent Posts",
  component: RecentPosts,
} as Meta;
