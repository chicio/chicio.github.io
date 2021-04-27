import React from "react";
import { Meta, Story } from "@storybook/react";
import {
  Project,
  ProjectProps,
} from "../../src/components/design-system/molecules/project";
import { Paragraph } from "../../src/components/design-system/atoms/paragraph";
import { StandardExternalLink } from "../../src/components/design-system/atoms/standard-external-link";
import { List } from "../../src/components/design-system/atoms/list";
import { tracking } from "../../src/logic/tracking";

const Template: Story<ProjectProps> = (args) => <Project {...args} />;

export const ProjectStory = Template.bind({});
ProjectStory.args = {
  name: "Spectral Clara Lux Tracer",
  image: (
    <img
      width={500}
      height={500}
      src={
        "https://www.fabrizioduroni.it/static/bae1c10627e070721e526a5c21453ccf/5f169/spectral-clara-lux-tracer.webp"
      }
      alt={"spectral clara lux tracer"}
    />
  ),
  description: (
    <>
      <Paragraph>
        Physically based ray tracer with multiple shading models support and
        Color Rendering Index (CRI) evaluation. Project developed for my master
        degree thesis at{" "}
        <StandardExternalLink
          href="https://www.disco.unimib.it"
        >
          University Milano-Bicocca
        </StandardExternalLink>{" "}
        -
        <StandardExternalLink
          href="http://www.ivl.disco.unimib.it"
        >
          Imaging and Vision Laboratory
        </StandardExternalLink>
        .
      </Paragraph>
      <List className="project-features">
        <li>Computer graphics</li>
        <li>Ray-tracing</li>
        <li>Physically based rendering</li>
        <li>Color calculation using spectral data</li>
        <li>Color Rendering index calculation</li>
        <li>iOS, macOS, Windows</li>
        <li>Objective-C, C++</li>
      </List>
    </>
  ),
  callToActions: [
    {
      label: "Github",
      trackingCategory: tracking.category.home,
      trackingAction: tracking.action.open_sclt_github,
      trackingLabel: tracking.label.body,
      link: "https://github.com/chicio/Spectral-Clara-Lux-Tracer",
    },
    {
      label: "Thesis",
      trackingCategory: tracking.category.home,
      trackingAction: tracking.action.open_sclt_thesis,
      trackingLabel: tracking.label.body,
      link: "https://drive.google.com/file/d/0BxeVnHLvT8-7dkxQRjV6M29TeUk/view",
    },
  ],
};
ProjectStory.storyName = "Project";

export default {
  title: "Molecules/Project",
  component: Project,
} as Meta;
