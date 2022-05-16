import { FC, ReactNode } from "react";
import { CallToActionInternal } from "./design-system/atoms/call-to-action-internal";
import { TrackingElementProps, trackWith } from "../logic/tracking";

type CallToActionInternalWithTrackingProps = TrackingElementProps & {
  to: string;
  className?: string;
  children?: ReactNode;
};

export const CallToActionInternalWithTracking: FC<CallToActionInternalWithTrackingProps> =
  ({ children, className, to, trackingData }) => (
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
