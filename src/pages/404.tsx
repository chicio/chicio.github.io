import React from "react";
import { track, tracking } from "../utils/tracking";
import { Heading1 } from "../components/design-system/atoms/heading1";
import { Paragraph } from "../components/design-system/atoms/paragraph";
import { ContainerFullscreen } from "../components/design-system/atoms/container-fullscreen";
import { CallToActionInternal } from "../components/design-system/atoms/internal-call-to-action";
import { Page } from "../components/design-system/templates/page";

const NotFoundPage: React.FC = () => {
  return (
    <Page>
      <ContainerFullscreen>
        <Heading1>404!</Heading1>
        <Paragraph>Opss!?! Keep calm and go to</Paragraph>
        <CallToActionInternal
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
        </CallToActionInternal>
      </ContainerFullscreen>
    </Page>
  );
};

export default NotFoundPage;
