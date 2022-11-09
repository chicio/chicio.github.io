import { Meta, Story } from "@storybook/react";
import { Resume } from "../../src/components/design-system/organism/resume";

export const ResumeStory: Story = () => <Resume />;

ResumeStory.storyName = "Resume";

export default {
  title: "Organisms/Resume",
  component: Resume,
} as Meta;
