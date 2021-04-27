import React from "react";
import { Meta, Story } from "@storybook/react";
import {
  SocialContact,
  SocialContactProps,
} from "../../src/components/design-system/molecules/social-contact";
import { Linkedin } from "@styled-icons/fa-brands";

const Template: Story<SocialContactProps> = (args) => (
  <SocialContact {...args} />
);

export const SocialContactStory = Template.bind({});
SocialContactStory.args = {
  link: "",
  trackingAction: "",
  trackingCategory: "",
  trackingLabel: "",
  icon: <Linkedin size={30} title={"Linkedin"} />,
};

SocialContactStory.storyName = "Social Contact";

export default {
  title: "Molecules/Social Contact",
  component: SocialContact,
} as Meta;
