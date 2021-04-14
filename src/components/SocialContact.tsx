import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import * as React from "react";
import { track } from "../utils/tracking";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SocialContactProps {
  link: string;
  trackingAction: string;
  trackingCategory: string;
  trackingLabel: string;
  icon: IconDefinition;
  iconClass: string;
}

export const SocialContact: React.FC<SocialContactProps> = ({
  link,
  trackingAction,
  trackingCategory,
  trackingLabel,
  icon,
  iconClass,
}) => (
  <a
    href={link}
    onClick={() => {
      track(trackingAction, trackingCategory, trackingLabel);
    }}
    target="_blank"
    rel="noopener noreferrer"
  >
    <span className={`${iconClass}`}>
      <FontAwesomeIcon icon={icon} />
    </span>
  </a>
);
