import React from "react";
import { TrackingElementProps, trackWith } from "../logic/tracking";
import { CallToActionExternal } from "./design-system/atoms/call-to-action-external";

type CallToActionExternalWithTrackingProps = TrackingElementProps & {
  href: string;
  className?: string;
  target?: string;
  rel?: string;
};

export const CallToActionExternalWithTracking: React.FC<CallToActionExternalWithTrackingProps> =
  ({ children, className, href, trackingData, target, rel }) => (
    <CallToActionExternal
      className={className}
      href={href}
      onClick={() => {
        trackWith(trackingData);
      }}
      target={target}
      rel={rel}
    >
      {children}
    </CallToActionExternal>
  );
