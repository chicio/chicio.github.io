import React from "react";
import { CallToActionInternal } from "./design-system/atoms/call-to-action-internal";
import { TrackingElementProps, trackWith } from "../logic/tracking";

type CallToActionInternalWithTrackingProps = TrackingElementProps & {
  to: string;
  className?: string;
};

export const CallToActionInternalWithTracking: React.FC<CallToActionInternalWithTrackingProps> = ({
  children,
  className,
  to,
  trackingData,
}) => (
  <CallToActionInternal
    className={className}
    to={to}
    onClick={() => {
      trackWith(trackingData);
    }}
  >
    {children}
  </CallToActionInternal>
);
