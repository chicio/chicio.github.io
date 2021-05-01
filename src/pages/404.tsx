import React from "react";
import { tracking } from "../logic/tracking";
import { Heading1 } from "../components/design-system/atoms/heading1";
import { Paragraph } from "../components/design-system/atoms/paragraph";
import { ContainerFullscreen } from "../components/design-system/atoms/container-fullscreen";
import { Page } from "../components/design-system/templates/page";
import { CallToActionInternalWithTracking } from "../components/call-to-action-internal-with-tracking";

const NotFoundPage: React.FC = () => {
  return (
    <Page>
      <ContainerFullscreen>
        <Heading1>404!</Heading1>
        <Paragraph>Opss!?! Keep calm and go to</Paragraph>
        <CallToActionInternalWithTracking
          to={"/"}
          trackingData={{
            action: tracking.action.open_home,
            category: tracking.category.notfound,
            label: tracking.label.body,
          }}
        >
          Homepage
        </CallToActionInternalWithTracking>
      </ContainerFullscreen>
    </Page>
  );
};

export default NotFoundPage;
