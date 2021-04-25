import styled from "styled-components";
import React from "react";
import { CallToActionInternal } from "../atoms/call-to-action-internal";
import { track, tracking } from "../../../utils/tracking";

const CenterHorizontallyContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: ${(props) => props.theme.spacing[4]};
`;

const PageNavigationCallToAction = styled(CallToActionInternal)`
  width: 100px;
  text-align: center;
`;

export interface PageNavigationProps {
  trackingCategory: string;
  previousPageUrl: string;
  previousPageTrackingAction: string;
  nextPageUrl: string;
  nextPageTrackingAction: string;
  isFirst: boolean;
  isLast: boolean;
}

export const PaginationNavigation: React.FC<PageNavigationProps> = ({
  trackingCategory,
  previousPageUrl,
  previousPageTrackingAction,
  nextPageUrl,
  nextPageTrackingAction,
  isFirst,
  isLast,
}) => (
  <CenterHorizontallyContainer>
    {!isFirst && (
      <PageNavigationCallToAction
        to={previousPageUrl}
        onClick={() => {
          track(
            previousPageTrackingAction,
            trackingCategory,
            tracking.label.body
          );
        }}
      >
        Previous
      </PageNavigationCallToAction>
    )}
    {!isLast && (
      <PageNavigationCallToAction
        to={nextPageUrl}
        onClick={() => {
          track(nextPageTrackingAction, trackingCategory, tracking.label.body);
        }}
      >
        Next
      </PageNavigationCallToAction>
    )}
  </CenterHorizontallyContainer>
);
