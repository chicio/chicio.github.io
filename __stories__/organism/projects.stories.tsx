import React from "react";
import { Meta, Story } from "@storybook/react";
import { Projects } from "../../src/components/design-system/organism/projects";

const Template: Story = () => <Projects />;

export const ProjectsStory = Template.bind({});
ProjectsStory.storyName = "Projects";

export default {
  title: "Organism/Projects",
  component: Projects,
} as Meta;
