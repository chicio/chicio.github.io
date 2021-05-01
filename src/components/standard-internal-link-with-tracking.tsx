import React from "react";
import { TrackingElementProps, trackWith } from "../logic/tracking";
import { StandardInternalLink } from "./design-system/atoms/standard-internal-link";

type StandardInternalLinkWithTrackingProps = TrackingElementProps & {
  to: string;
  className?: string;
};

export const StandardInternalLinkWithTracking: React.FC<StandardInternalLinkWithTrackingProps> = ({
  children,
  className,
  to,
  trackingData,
}) => (
  <StandardInternalLink
    className={className}
    to={to}
    onClick={() => {
      trackWith(trackingData);
    }}
  >
    {children}
  </StandardInternalLink>
);
