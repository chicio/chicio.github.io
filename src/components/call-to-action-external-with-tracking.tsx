import React from "react";
import { TrackingElementProps, trackWith } from "../logic/tracking";
import { CallToActionExternal } from "./design-system/atoms/call-to-action-external";

type CallToActionExternalWithTrackingProps = TrackingElementProps & {
  href: string;
};

export const CallToActionExternalWithTracking: React.FC<CallToActionExternalWithTrackingProps> = ({
  children,
  href,
  trackingData,
}) => (
  <CallToActionExternal
    href={href}
    onClick={() => {
      trackWith(trackingData);
    }}
  >
    {children}
  </CallToActionExternal>
);
