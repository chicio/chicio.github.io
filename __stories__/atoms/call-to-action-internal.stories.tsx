import { Meta } from "@storybook/react";
import React from "react";
import { CallToActionInternal } from "../../src/components/design-system/atoms/call-to-action-internal";

export const Internal: React.FC = () => (
  <CallToActionInternal to={""}>Example</CallToActionInternal>
);

export default {
  title: "Atoms/Call To Action",
  component: CallToActionInternal,
} as Meta;