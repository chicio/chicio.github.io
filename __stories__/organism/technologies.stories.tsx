import { Meta, Story } from "@storybook/react";
import {
  Technologies,
  TechnologiesProps,
} from "../../src/components/design-system/organism/technologies";

export const TechnologiesStory: Story<TechnologiesProps> = (args) => (
  <Technologies {...args} />
);

TechnologiesStory.storyName = "Technologies";

export default {
  title: "Organisms/Technologies",
  component: Technologies,
} as Meta;
