import styled, { css } from "styled-components";
import { StandardExternalLink } from "../atoms/standard-external-link";
import { trackWith } from "../../../logic/tracking";
import { FC } from "react";
import { mediaQuery } from "../utils-css/media-query";

interface TabLinkProps {
  active: boolean;
}

const TabContainer = styled.li`
  width: 50%;
`;

const TabLink = styled(StandardExternalLink)<TabLinkProps>`
  font-size: ${(props) => props.theme.fontSizes[4]};
  display: block;
  background-color: ${(props) => props.theme.light.generalBackgroundLight};
  padding: ${(props) => props.theme.spacing[5]};
  border-radius: 0;
  border-top: ${(props) => props.theme.light.generalBackgroundLight} 1px solid;
  border-bottom: ${(props) => props.theme.light.dividerColor} 1px solid;
  border-left: ${(props) => props.theme.light.dividerColor} 1px solid;
  border-right: ${(props) => props.theme.light.dividerColor} 1px solid;
  text-align: center;

  ${mediaQuery.dark} {
    border-top: ${(props) => props.theme.dark.generalBackgroundLight} 1px solid;
    background-color: ${(props) => props.theme.dark.generalBackgroundLight};
    border-bottom: ${(props) => props.theme.dark.dividerColor} 1px solid;
    border-left: ${(props) => props.theme.dark.dividerColor} 1px solid;
    border-right: ${(props) => props.theme.dark.dividerColor} 1px solid;
  }

  ${mediaQuery.maxWidth.md} {
    font-size: 16px;
  }

  ${(props) =>
    props.active &&
    css`
      background-color: ${(props) => props.theme.light.generalBackground};
      border-right: ${(props) => props.theme.light.generalBackground} 1px solid;
      border-left: ${(props) => props.theme.light.generalBackground} 1px solid;
      border-bottom: ${(props) => props.theme.light.generalBackground} 1px solid;

      ${mediaQuery.dark} {
        background-color: ${(props) => props.theme.dark.generalBackground};
        border-right: ${(props) => props.theme.dark.generalBackground} 1px solid;
        border-left: ${(props) => props.theme.dark.generalBackground} 1px solid;
        border-bottom: ${(props) => props.theme.dark.generalBackground} 1px
          solid;
      }
    `}
`;

type TabProps = TabLinkProps & {
  label: string;
  link: string;
  trackingAction: string;
  trackingCategory: string;
  trackingLabel: string;
  action: () => void;
};

const Tab: FC<TabProps> = ({
  active,
  label,
  link,
  trackingAction,
  trackingCategory,
  trackingLabel,
  action,
}) => (
  <TabContainer>
    <TabLink
      active={active}
      href={link}
      onClick={(event) => {
        event.preventDefault();
        trackWith({
          action: trackingAction,
          category: trackingCategory,
          label: trackingLabel,
        });
        action();
      }}
    >
      {label}
    </TabLink>
  </TabContainer>
);

const TabsContainer = styled.ul`
  list-style: none;
  display: flex;
  padding-left: 0;
  margin: 0;
  border: 1px solid transparent;
`;

export interface TabsProps {
  tab1: TabProps;
  tab2: TabProps;
}

export const Tabs: FC<TabsProps> = ({ tab1, tab2 }) => (
  <TabsContainer>
    <Tab
      active={tab1.active}
      label={tab1.label}
      link={tab1.link}
      trackingAction={tab1.trackingAction}
      trackingCategory={tab1.trackingCategory}
      trackingLabel={tab1.trackingLabel}
      action={tab1.action}
    />
    <Tab
      active={tab2.active}
      label={tab2.label}
      link={tab2.link}
      trackingAction={tab2.trackingAction}
      trackingCategory={tab2.trackingCategory}
      trackingLabel={tab2.trackingLabel}
      action={tab2.action}
    />
  </TabsContainer>
);
