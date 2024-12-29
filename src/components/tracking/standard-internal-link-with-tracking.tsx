import { FC, ReactNode } from "react";
import { TrackingElementProps, trackWith } from "../../logic/tracking";
import { StandardInternalLink } from "../design-system/atoms/standard-internal-link";

type StandardInternalLinkWithTrackingProps = TrackingElementProps & {
  to: string;
  className?: string;
  children?: ReactNode;
};

export const StandardInternalLinkWithTracking: FC<
  StandardInternalLinkWithTrackingProps
> = ({ children, className, to, trackingData }) => (
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
