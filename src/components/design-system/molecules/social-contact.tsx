import * as React from "react";
import { track } from "../../../utils/tracking";
import { CallToActionExternal } from "../atoms/call-to-action-external";
import { Icon } from "../atoms/icon";
import styled from "styled-components";

export interface SocialContactProps {
  link: string;
  trackingAction: string;
  trackingCategory: string;
  trackingLabel: string;
  icon: React.ReactElement;
}

const CallToActionBlock = styled(CallToActionExternal)`
  display: block;
`;

export const SocialContact: React.FC<SocialContactProps> = ({
  link,
  trackingAction,
  trackingCategory,
  trackingLabel,
  icon,
}) => (
  <CallToActionBlock
    href={link}
    onClick={() => {
      track(trackingAction, trackingCategory, trackingLabel);
    }}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon>{icon}</Icon>
  </CallToActionBlock>
);
