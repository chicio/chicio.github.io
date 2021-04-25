import React from "react";
import { Meta, Story } from "@storybook/react";
import {
  PostCard,
  PostCardProps,
} from "../../src/components/design-system/molecules/post-card";

const Template: Story<PostCardProps> = (args) => <PostCard {...args} />;

export const PostCardStory = Template.bind({});
PostCardStory.args = {
  slug: "",
  title: "Unit testing in Kotlin with JUnit 5 and MockK",
  image: {
    layout: "fullWidth",
    backgroundColor: "#e8c8c8",
    images: {
      fallback: {
        src:
          "https://www.fabrizioduroni.it/static/3abc914507de97c6aad016c603c0ce5f/05276/mockk-junit5-kotlin.jpg",
        srcSet:
          "https://www.fabrizioduroni.it/static/3abc914507de97c6aad016c603c0ce5f/20c4c/mockk-junit5-kotlin.jpg 750w,\nhttps://www.fabrizioduroni.it/static/3abc914507de97c6aad016c603c0ce5f/05276/mockk-junit5-kotlin.jpg 1000w",
        sizes: "100vw",
      },
      sources: [
        {
          srcSet:
            "https://www.fabrizioduroni.it/static/3abc914507de97c6aad016c603c0ce5f/0fc4b/mockk-junit5-kotlin.webp 750w,\nhttps://www.fabrizioduroni.it/static/3abc914507de97c6aad016c603c0ce5f/1df1a/mockk-junit5-kotlin.webp 1000w",
          type: "image/webp",
          sizes: "100vw",
        },
      ],
    },
    width: 1,
    height: 0.4,
  },
  authors: ["fabrizio_duroni", "francesco_bonfadelli"],
  date: "25 Apr 20021",
  readingTime: "7 min read",
  description:
    "I recently discovered MockK, a mocking library created for Kotlin. Let's see how it is possible to write modern unit tests with MockK + JUnit 5.",
  trackingCategory: "",
};
PostCardStory.storyName = "Post Card";

export default {
  title: "Molecules/Post Card",
  component: PostCard,
} as Meta;
