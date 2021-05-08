import React from "react";
import { Meta, Story } from "@storybook/react";
import {
  ModalWithImage,
  ModalWithImageProps,
} from "../../src/components/design-system/organism/modal-with-image";
import styled from "styled-components";
import { Paragraph } from "../../src/components/design-system/atoms/paragraph";

const ExampleBackgroundContent = styled.div`
  background-color: lightgray;
`;

const Template: Story<ModalWithImageProps> = (args) => (
  <ExampleBackgroundContent>
    <Paragraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum magna
      metus, condimentum et leo sit amet, rutrum lobortis turpis. Curabitur eget
      pulvinar turpis. Duis eget eros et nisi hendrerit tincidunt vitae vel
      eros. Sed id ex consequat, accumsan sapien ut, mollis urna. Aliquam
      bibendum nulla non lacinia sodales. Morbi eu enim enim. Aenean vel sapien
      fringilla erat suscipit tempus vel sit amet justo. Maecenas condimentum
      placerat lorem non lobortis.
    </Paragraph>
    <ModalWithImage {...args} />
  </ExampleBackgroundContent>
);

export const ModalWithImageStory = Template.bind({});
ModalWithImageStory.args = {
  imageUrl: "https://via.placeholder.com/150",
  onClick: () => {},
};
ModalWithImageStory.storyName = "Modal with Image";

export default {
  title: "Organisms/Modal with Image",
  component: ModalWithImage,
} as Meta;
