import { Icon } from "../atoms/icon";
import styled from "styled-components";
import { CallToActionExternalWithTracking } from "../../tracking/call-to-action-external-with-tracking";
import { FC, ReactElement } from "react";

export interface SocialContactProps {
  link: string;
  trackingAction: string;
  trackingCategory: string;
  trackingLabel: string;
  icon: ReactElement;
}

const CallToActionBlock = styled(CallToActionExternalWithTracking)`
  display: block;
`;

export const SocialContact: FC<SocialContactProps> = ({
  link,
  trackingAction,
  trackingCategory,
  trackingLabel,
  icon,
}) => (
  <CallToActionBlock
    href={link}
    trackingData={{
      action: trackingAction,
      category: trackingCategory,
      label: trackingLabel,
    }}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon>{icon}</Icon>
  </CallToActionBlock>
);
