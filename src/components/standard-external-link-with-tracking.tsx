import React from "react";
import { TrackingElementProps, trackWith } from "../logic/tracking";
import { StandardExternalLink } from "./design-system/atoms/standard-external-link";

type StandardExternalLinkWithTrackingProps = TrackingElementProps & {
  href: string;
};

export const StandardExternalLinkWithTracking: React.FC<StandardExternalLinkWithTrackingProps> = ({
  children,
  href,
  trackingData,
}) => (
  <StandardExternalLink
    href={href}
    onClick={() => {
      trackWith(trackingData);
    }}
  >
    {children}
  </StandardExternalLink>
);
