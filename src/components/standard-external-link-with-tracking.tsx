import { FC, ReactNode } from "react";
import { TrackingElementProps, trackWith } from "../logic/tracking";
import { StandardExternalLink } from "./design-system/atoms/standard-external-link";

type StandardExternalLinkWithTrackingProps = TrackingElementProps & {
  href: string;
  target?: string;
  rel?: string;
  children?: ReactNode;
};

export const StandardExternalLinkWithTracking: FC<StandardExternalLinkWithTrackingProps> =
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
