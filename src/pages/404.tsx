import React from "react";
import { track, tracking } from "../utils/tracking";
import { Heading1 } from "../components/design-system/atoms/heading1";
import { Paragraph } from "../components/design-system/atoms/paragraph";
import styled from "styled-components";
import { ContainerFullscreen } from "../components/design-system/atoms/container-fullscreen";
import { InternalCallToAction } from "../components/design-system/atoms/internal-call-to-action";
import { Page } from "../components/page";

const CallToAction = styled(InternalCallToAction)`
  font-size: ${(props) => props.theme.fontSizes[2]};
`;

const NotFoundPage: React.FC = () => {
  return (
    <Page>
      <ContainerFullscreen>
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
      </ContainerFullscreen>
    </Page>
  );
};

export default NotFoundPage;
