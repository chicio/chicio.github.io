import { Meta } from "@storybook/react";
import React from "react";
import { Close } from "../../src/components/design-system/molecules/close";

export const CloseContainer: React.FC = () => (
  <Close onClick={() => alert("click")} />
);

// @ts-ignore
CloseContainer.storyName = "Close";

export default {
  title: "Molecules",
  component: Close,
} as Meta;
