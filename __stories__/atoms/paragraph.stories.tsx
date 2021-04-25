import React from "react";
import { Meta } from "@storybook/react";
import { Paragraph } from "../../src/components/design-system/atoms/paragraph";

export const MultipleParagraph: React.VFC = () => (
  <>
    <Paragraph>{"Lorem ipsum dolor sit amet"}</Paragraph>
    <Paragraph>
      {
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum magna metus, condimentum et leo sit amet, rutrum lobortis turpis. Curabitur eget pulvinar turpis. Duis eget eros et nisi hendrerit tincidunt vitae vel eros. Sed id ex consequat, accumsan sapien ut, mollis urna. Aliquam bibendum nulla non lacinia sodales. Morbi eu enim enim. Aenean vel sapien fringilla erat suscipit tempus vel sit amet justo. Maecenas condimentum placerat lorem non lobortis."
      }
    </Paragraph>
  </>
);

// @ts-ignore
MultipleParagraph.storyName = "Paragraph";

export default {
  title: "Atoms/Typography",
  component: Paragraph,
} as Meta;
