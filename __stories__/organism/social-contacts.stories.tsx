import React from "react";
import { Meta, Story } from "@storybook/react";
import {
  SocialContacts,
  SocialContactsProps,
} from "../../src/components/design-system/organism/social-contacts";

export const SocialContactsStory: Story<SocialContactsProps> = (args) => (
  <SocialContacts {...args} />
);
SocialContactsStory.args = {
  trackingCategory: "",
  trackingLabel: "",
};
SocialContactsStory.storyName = "Social Contacts";

export default {
  title: "Organisms/Social Contacts",
  component: SocialContacts,
} as Meta;
