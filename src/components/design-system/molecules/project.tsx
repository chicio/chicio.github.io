import React from "react";
import { Heading3 } from "../atoms/heading3";
import styled from "styled-components";
import { Container } from "../atoms/container";
import { CallToActionExternalWithTracking } from "../../call-to-action-external-with-tracking";
import { mediaQuery } from "../utils-css/media-query";

interface ProjectContainerProps {
  reverse: boolean;
}

const ProjectContainer = styled(Container)<ProjectContainerProps>`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: ${(props) => props.theme.spacing[7]} auto;

  ${mediaQuery.minWidth.md} {
    flex-direction: ${(props) => (props.reverse ? "row-reverse" : "row")};
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
`;

interface ProjectCallToAction {
  label: string;
  link: string;
  trackingAction: string;
  trackingCategory: string;
  trackingLabel: string;
}

const CallToActionContainer = styled.div`
  margin: ${(props) => props.theme.spacing[6]} 0;
`;

export type ProjectProps = ProjectContainerProps & {
  name: string;
  image: React.ReactElement;
  description: React.ReactElement;
  callToActions: ProjectCallToAction[];
};

export const Project: React.FC<ProjectProps> = ({
  reverse,
  name,
  image,
  description,
  callToActions,
}) => (
  <ProjectContainer reverse={reverse}>
    <ProjectImageContainer>{image}</ProjectImageContainer>
    <ProjectContentContainer>
      <Heading3>{name}</Heading3>
      {description}
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
