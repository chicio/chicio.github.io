import * as React from "react";
import { track } from "../../../utils/tracking";
import { ExternalCallToAction } from "../atoms/external-call-to-action";
import { Icon } from "../atoms/icon";

interface SocialContactProps {
  link: string;
  trackingAction: string;
  trackingCategory: string;
  trackingLabel: string;
  icon: React.ReactElement;
}

export const SocialContact: React.FC<SocialContactProps> = ({
  link,
  trackingAction,
  trackingCategory,
  trackingLabel,
  icon,
}) => (
  <ExternalCallToAction
    href={link}
    onClick={() => {
      track(trackingAction, trackingCategory, trackingLabel);
    }}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon>{icon}</Icon>
  </ExternalCallToAction>
);