import React from "react";
import { track, tracking } from "../utils/tracking";
import { Heading1 } from "../components/atoms/heading1";
import { Paragraph } from "../components/atoms/paragraph";
import styled from "styled-components";
import { ContainerCenterContent } from "../components/organism/container-center-content";
import { InternalCallToAction } from "../components/atoms/internal-call-to-action";
import { Page } from "../components/page";

const CallToAction = styled(InternalCallToAction)`
  font-size: ${(props) => props.theme.fontSizes[2]};
`;

const NotFoundPage: React.FC = () => {
  return (
    <Page>
      <ContainerCenterContent>
        <Heading1>404!</Heading1>
        <Paragraph>Opss!?! Keep calm and go to</Paragraph>
        <CallToAction
          to={"/"}
          onClick={() => {
            track(
              tracking.action.open_home,
              tracking.category.notfound,
              tracking.label.body
            );
          }}
        >
          Homepage
        </CallToAction>
      </ContainerCenterContent>
    </Page>
  );
};

export default NotFoundPage;
