import { Meta, Story } from "@storybook/react";
import {
  ProfilePresentation,
  ProfilePresentationProps,
} from "../../src/components/design-system/organism/profile-presentation";

const Template: Story<ProfilePresentationProps> = (args) => (
  <ProfilePresentation {...args} />
);

export const ProfilePresentationStory = Template.bind({});
ProfilePresentationStory.args = {
  author: "Fabrizio Duroni",
};
ProfilePresentationStory.storyName = "Profile Presentation";

export default {
  title: "Organisms/Profile Presentation",
  component: ProfilePresentation,
} as Meta;
