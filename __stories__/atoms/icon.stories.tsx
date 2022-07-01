import React from "react";
import { Icon } from "../../src/components/design-system/atoms/icon";
import { Meta } from "@storybook/react";
import { Github } from "@styled-icons/boxicons-logos";

export const IconContainer: React.VFC = () => (
  <Icon>
    <Github size={50} />
  </Icon>
);

// @ts-ignore
IconContainer.storyName = "Icon";

export default {
  title: "Atoms/Typography",
  component: Icon,
} as Meta;
