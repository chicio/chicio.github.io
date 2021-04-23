import { Meta } from "@storybook/react";
import React from "react";
import { CallToActionExternal } from "../../src/components/design-system/atoms/call-to-action-external";

export const External: React.VFC = () => (
  <CallToActionExternal>Example</CallToActionExternal>
);

export default {
  title: "Atoms/Call To Action",
  component: External,
} as Meta;
