import React from "react";
import { Icon } from "../../src/components/design-system/atoms/icon";
import { Github } from "@styled-icons/fa-brands";
import { Meta } from "@storybook/react";

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
