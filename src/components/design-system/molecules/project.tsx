import { FC } from "react";
import { Heading3 } from "../atoms/heading3";
import styled, { TransientProps } from "styled-components";
import { Container } from "../atoms/container";
import { CallToActionExternalWithTracking } from "../../tracking/call-to-action-external-with-tracking";
import { mediaQuery } from "../utils-css/media-query";
import { ProjectCallToAction } from "../../../logic/projects";
import { Paragraph } from "../atoms/paragraph";
import { List } from "../atoms/list";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import { gatsbyImageWrapperSelector } from "../utils-css/gatsby-image-selector";
import { borderRadius } from "../atoms/border-radius";

interface ProjectContainerProps {
  reverse: boolean;
}

type Created = TransientProps<ProjectContainerProps>;

const ProjectContainer = styled(Container)<Created>`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: ${(props) => props.theme.spacing[7]} auto;

  ${mediaQuery.minWidth.md} {
    flex-direction: ${(props) => (props.$reverse ? "row-reverse" : "row")};
    max-width: 1100px;
  }
`;

const ProjectContentContainer = styled.div`
  flex: 50%;
  padding: ${(props) => props.theme.spacing[2]};
`;

const ProjectImageContainer = styled(ProjectContentContainer)`
  display: flex;
  justify-content: center;
  align-items: center;

  ${gatsbyImageWrapperSelector} {
    overflow: hidden;
    ${borderRadius};
    box-shadow: 0 3px 10px 0 ${(props) => props.theme.light.boxShadowLight};

    ${mediaQuery.dark} {
      box-shadow: 0 3px 10px 0 ${(props) => props.theme.dark.boxShadowLight};
    }
  }
`;

const CallToActionContainer = styled.div`
  margin: ${(props) => props.theme.spacing[6]} 0;
`;

export type ProjectProps = ProjectContainerProps & {
  name: string;
  image: IGatsbyImageData;
  description: string;
  features: string[];
  callToActions: ProjectCallToAction[];
};

export const Project: FC<ProjectProps> = ({
  reverse,
  name,
  image,
  description,
  features,
  callToActions,
}) => (
  <ProjectContainer $reverse={reverse}>
    <ProjectImageContainer>
      <GatsbyImage
        style={{
          width: 500,
          height: 500,
        }}
        alt={name}
        image={image}
      />
    </ProjectImageContainer>
    <ProjectContentContainer>
      <Heading3>{name}</Heading3>
      <Paragraph>{description}</Paragraph>
      <List className="project-features">
        {features.map((feature) => (
          <li key={`${name}${feature}`}>{feature}</li>
        ))}
      </List>
      <CallToActionContainer>
        {callToActions.map((callToAction) => (
          <CallToActionExternalWithTracking
            key={callToAction.label}
            href={callToAction.link}
            trackingData={{
              action: callToAction.trackingAction,
              category: callToAction.trackingCategory,
              label: callToAction.trackingLabel,
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {callToAction.label}
          </CallToActionExternalWithTracking>
        ))}
      </CallToActionContainer>
    </ProjectContentContainer>
  </ProjectContainer>
);
