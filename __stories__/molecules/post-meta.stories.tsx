import { Meta, Story } from "@storybook/react";
import {
  PostMeta,
  PostMetaProps,
} from "../../src/components/design-system/molecules/post-meta";

const Template: Story<PostMetaProps> = (args) => <PostMeta {...args} />;

export const PostMetaStory = Template.bind({});
PostMetaStory.args = {
  date: "25 Apr 2021",
  readingTime: "7 min read",
};
PostMetaStory.storyName = "Post Meta";

export default {
  title: "Molecules/Post Meta",
  component: PostMeta,
} as Meta;
