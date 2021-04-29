import React from "react";
import { Meta, Story } from "@storybook/react";
import {
  PostTags,
  PostTagsProps,
} from "../../src/components/design-system/molecules/post-tags";

const Template: Story<PostTagsProps> = (args) => <PostTags {...args} />;

export const PostTagsStory = Template.bind({});
PostTagsStory.args = {
  tags: ["ios", "macos", "mobile app development"],
};
PostTagsStory.storyName = "Post Tags";

export default {
  title: "Molecules/Post Tags",
  component: PostTags,
} as Meta;
