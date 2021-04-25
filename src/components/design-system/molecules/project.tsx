import React from "react";
import { Heading3 } from "../atoms/heading3";
import { CallToActionExternal } from "../atoms/call-to-action-external";
import { track } from "../../../utils/tracking";
import styled from "styled-components";
import { Container } from "../atoms/container";

interface ProjectContainerProps {
  reverse: boolean;
}

const ProjectContainer = styled(Container)<ProjectContainerProps>`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: ${(props) => props.theme.spacing[7]} auto;

  @media (min-width: 992px) {
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
          <CallToActionExternal
            key={callToAction.label}
            href={callToAction.link}
            onClick={() => {
              track(
                callToAction.trackingAction,
                callToAction.trackingCategory,
                callToAction.trackingLabel
              );
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {callToAction.label}
          </CallToActionExternal>
        ))}
      </CallToActionContainer>
    </ProjectContentContainer>
  </ProjectContainer>
);
