import React from "react";
import { Meta } from "@storybook/react";
import { Projects } from "../../src/components/design-system/organism/projects";

export const ProjectsStory: React.FC = () => <Projects />;

// @ts-ignore
ProjectsStory.storyName = "Projects";

export default {
  title: "Organisms/Projects",
  component: Projects,
} as Meta;
