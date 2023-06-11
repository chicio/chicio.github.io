import React from "react";
import { Meta } from "@storybook/react";
import { DownArrow } from "../../src/components/design-system/molecules/down-arrow";

export const DownArrowContainer: React.FC = () => <DownArrow />;

// @ts-ignore
DownArrowContainer.storyName = "Down Arrow";

export default {
  title: "Molecules",
  component: DownArrow,
} as Meta;