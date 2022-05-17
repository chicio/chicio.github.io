import styled from "styled-components";
import { FC } from "react";
import { tracking } from "../../../logic/tracking";
import { CallToActionInternalWithTracking } from "../../call-to-action-internal-with-tracking";

const CenterHorizontallyContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: ${(props) => props.theme.spacing[4]};
`;

const PageNavigationCallToAction = styled(CallToActionInternalWithTracking)`
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

export const PaginationNavigation: FC<PageNavigationProps> = ({
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
        trackingData={{
          category: trackingCategory,
          label: tracking.label.body,
          action: previousPageTrackingAction,
        }}
      >
        Previous
      </PageNavigationCallToAction>
    )}
    {!isLast && (
      <PageNavigationCallToAction
        to={nextPageUrl}
        trackingData={{
          category: trackingCategory,
          label: tracking.label.body,
          action: nextPageTrackingAction,
        }}
      >
        Next
      </PageNavigationCallToAction>
    )}
  </CenterHorizontallyContainer>
);
