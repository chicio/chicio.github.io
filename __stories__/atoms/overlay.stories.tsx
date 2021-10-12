import React from "react";
import { Meta } from "@storybook/react";
import { Overlay } from "../../src/components/design-system/atoms/overlay";
import { Paragraph } from "../../src/components/design-system/atoms/paragraph";

export const Standard: React.VFC = () => (
  <>
    <Overlay zIndex={100} delay={true} />
    <Paragraph>
      {"An overlay covers 100% of the visible contain with opacity"}
    </Paragraph>
  </>
);

export default {
  title: "Atoms/Overlay",
  component: Overlay,
} as Meta;
