import styled from "styled-components";
import { Container } from "../atoms/container";
import React from "react";
import { InternalCallToAction } from "../atoms/internal-call-to-action";
import { track, tracking } from "../../../utils/tracking";

const CenterHorizontallyContainer = styled(Container)`
  display: flex;
  justify-content: center;
  padding: ${(props) => props.theme.spacing[2]};
`;

const PageNavigationCallToAction = styled(InternalCallToAction)`
  width: 100px;
  text-align: center;
`;

interface PageNavigationProps {
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
