import React from "react";
import { Meta, Story } from "@storybook/react";
import { Timeline } from "../../src/components/design-system/organism/timeline";

export const TimelineStory: Story = () => <Timeline />;

TimelineStory.storyName = "Timeline";

export default {
  title: "Organism/Timeline",
  component: Timeline,
} as Meta;
