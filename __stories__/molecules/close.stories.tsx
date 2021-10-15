import React from "react";
import { Meta } from "@storybook/react";
import { Close } from "../../src/components/design-system/molecules/close";

export const CloseContainer: React.VFC = () => (
  <Close onClick={() => alert("click")} />
);

// @ts-ignore
CloseContainer.storyName = "Close";

export default {
  title: "Molecules",
  component: Close,
} as Meta;
