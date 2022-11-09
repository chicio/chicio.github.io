import { Meta, Story } from "@storybook/react";
import {
  Overlay,
  OverlayProps,
} from "../../src/components/design-system/atoms/overlay";
import { Paragraph } from "../../src/components/design-system/atoms/paragraph";

const OverlayContainer: React.FC<OverlayProps> = (args) => (
  <Overlay {...args} />
);

const Template: Story<OverlayProps> = (args) => (
  <>
    <OverlayContainer {...args} />
    <Paragraph>
      {"An overlay covers 100% of the visible contain with opacity"}
    </Paragraph>
  </>
);

export const OverlayStory = Template.bind({});
OverlayStory.args = {
  zIndex: 200,
  delay: "0.3s",
};
OverlayStory.storyName = "Overlay";

export default {
  title: "Atoms",
  component: Overlay,
} as Meta;
