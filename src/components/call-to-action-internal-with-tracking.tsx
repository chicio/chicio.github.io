import React from "react";
import { CallToActionInternal } from "./design-system/atoms/call-to-action-internal";
import { TrackingElementProps, trackWith } from "../logic/tracking";

type CallToActionInternalWithTrackingProps = TrackingElementProps & {
  to: string;
};

export const CallToActionInternalWithTracking: React.FC<CallToActionInternalWithTrackingProps> = ({
  children,
  to,
  trackingData,
}) => (
  <CallToActionInternal
    to={to}
    onClick={() => {
      trackWith(trackingData);
    }}
  >
    {children}
  </CallToActionInternal>
);
