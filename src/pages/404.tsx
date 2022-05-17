import { FC } from "react";
import { tracking } from "../logic/tracking";
import { Heading1 } from "../components/design-system/atoms/heading1";
import { Paragraph } from "../components/design-system/atoms/paragraph";
import { ContainerFullscreen } from "../components/design-system/atoms/container-fullscreen";
import { BlogThemePage } from "../components/design-system/templates/blog-theme-page";
import { CallToActionInternalWithTracking } from "../components/call-to-action-internal-with-tracking";

const NotFoundPage: FC = () => {
  return (
    <BlogThemePage>
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
    </BlogThemePage>
  );
};

export default NotFoundPage;
