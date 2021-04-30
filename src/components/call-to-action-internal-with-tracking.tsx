import React from "react";
import { CallToActionInternal } from "./design-system/atoms/call-to-action-internal";
import { Tracking, trackWith } from "../logic/tracking";

interface CallToActionInternalWithTrackingProps {
  to: string;
  tracking: Tracking;
}

export const CallToActionInternalWithTracking: React.FC<CallToActionInternalWithTrackingProps> = ({
  children,
  to,
  tracking,
}) => (
  <CallToActionInternal
    to={to}
    onClick={() => {
      trackWith(tracking);
    }}
  >
    {children}
  </CallToActionInternal>
);
