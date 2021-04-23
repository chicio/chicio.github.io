import React from "react";
import { Meta } from "@storybook/react";
import { Heading1 } from "../../src/components/design-system/atoms/heading1";
import { Heading2 } from "../../src/components/design-system/atoms/heading2";
import { Heading3 } from "../../src/components/design-system/atoms/heading3";
import { Heading4 } from "../../src/components/design-system/atoms/heading4";
import { Heading5 } from "../../src/components/design-system/atoms/heading5";
import { Heading6 } from "../../src/components/design-system/atoms/heading6";
import { Heading7 } from "../../src/components/design-system/atoms/heading7";

export const Heading: React.VFC = () => (
  <div>
    <Heading1>{"Heading 1"}</Heading1>
    <Heading2>{"Heading 2"}</Heading2>
    <Heading3>{"Heading 3"}</Heading3>
    <Heading4>{"Heading 4"}</Heading4>
    <Heading5>{"Heading 5"}</Heading5>
    <Heading6>{"Heading 6"}</Heading6>
    <Heading7>{"Heading 7"}</Heading7>
  </div>
);

export default {
  title: "Atoms/Typography",
  component: Heading,
} as Meta;
