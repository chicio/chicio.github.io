import React from "react";
import { TrackingElementProps, trackWith } from "../logic/tracking";
import { StandardExternalLink } from "./design-system/atoms/standard-external-link";

type StandardExternalLinkWithTrackingProps = TrackingElementProps & {
  href: string;
  target?: string;
  rel?: string;
};

export const StandardExternalLinkWithTracking: React.FC<StandardExternalLinkWithTrackingProps> =
  ({ children, href, trackingData, target, rel }) => (
    <StandardExternalLink
      href={href}
      onClick={() => {
        trackWith(trackingData);
      }}
      target={target}
      rel={rel}
    >
      {children}
    </StandardExternalLink>
  );
