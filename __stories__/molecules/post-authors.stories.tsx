// @ts-ignore
import React from "react";
import { Meta, Story } from "@storybook/react";
import {
  PostAuthors,
  PostAuthorsProps,
} from "../../src/components/design-system/molecules/post-authors";

const Template: Story<PostAuthorsProps> = (args) => <PostAuthors {...args} />;

export const PostAuthorsStory = Template.bind({});
PostAuthorsStory.args = {
  authors: ["fabrizio_duroni", "francesco_bonfadelli"],
  trackingCategory: "",
  trackingLabel: "",
  enableUrl: false,
};
PostAuthorsStory.storyName = "Post Authors";

export default {
  title: "Molecules/Post Authors",
  component: PostAuthors,
} as Meta;
