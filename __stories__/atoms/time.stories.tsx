import React from "react";
import { Meta } from "@storybook/react";
import { Time } from "../../src/components/design-system/atoms/time";

export const TimeContainer: React.VFC = () => (
  <>
    <div>
      <Time>{"24 Apr 2021"}</Time>
    </div>
    <div>
      <Time>{"7 min"}</Time>
    </div>
  </>
);

// @ts-ignore
TimeContainer.storyName = "Time";

export default {
  title: "Atoms/Typography",
  component: TimeContainer,
} as Meta;
