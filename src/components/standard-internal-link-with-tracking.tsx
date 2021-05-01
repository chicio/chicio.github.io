import React from "react";
import { TrackingElementProps, trackWith } from "../logic/tracking";
import { StandardInternalLink } from "./design-system/atoms/standard-internal-link";

type StandardInternalLinkWithTrackingProps = TrackingElementProps & {
  to: string;
};

export const StandardInternalLinkWithTracking: React.FC<StandardInternalLinkWithTrackingProps> = ({
  children,
  to,
  trackingData,
}) => (
  <StandardInternalLink
    to={to}
    onClick={() => {
      trackWith(trackingData);
    }}
  >
    {children}
  </StandardInternalLink>
);
