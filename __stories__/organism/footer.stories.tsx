import { Meta, Story } from "@storybook/react";
import {
  Footer,
  FooterProps,
} from "../../src/components/design-system/organism/footer";

const Template: Story<FooterProps> = (args) => <Footer {...args} />;

export const FooterStory = Template.bind({});
FooterStory.args = {
  author: "Fabrizio Duroni",
  trackingCategory: "",
};
FooterStory.storyName = "Footer";

export default {
  title: "Organisms/Footer",
  component: Footer,
} as Meta;
