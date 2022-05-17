import React, { FC, useState } from "react";
import { tracking } from "../../../logic/tracking";
import { ContainerFluid } from "../atoms/container-fluid";
import styled from "styled-components";
import { Tabs } from "../molecules/tabs";
import { Projects } from "./projects";
import { Timeline } from "./timeline";
import { mediaQuery } from "../utils-css/media-query";

const ResumeContainer = styled(ContainerFluid)`
  padding-left: 0;
  padding-right: 0;
  background-color: ${(props) => props.theme.light.generalBackground};

  ${mediaQuery.dark} {
    background-color: ${(props) => props.theme.dark.generalBackground};
  }
`;

enum TabContent {
  projects = "projects",
  carrier = "carrier",
}

export const Resume: FC = () => {
  const [currentTab, setTab] = useState<TabContent>(TabContent.projects);

  return (
    <ResumeContainer>
      <Tabs
        tab1={{
          active: currentTab === TabContent.projects,
          label: "Projects",
          link: "#personal-projects",
          trackingAction: tracking.action.open_personal_projects_tab,
          trackingCategory: tracking.category.home,
          trackingLabel: tracking.label.body,
          action: () => setTab(TabContent.projects),
        }}
        tab2={{
          active: currentTab === TabContent.carrier,
          label: "Experience",
          link: "#experience",
          trackingAction: tracking.action.open_education_and_experiences_tab,
          trackingCategory: tracking.category.home,
          trackingLabel: tracking.label.body,
          action: () => setTab(TabContent.carrier),
        }}
      />
      <div>
        {currentTab === TabContent.projects && <Projects />}
        {currentTab === TabContent.carrier && <Timeline />}
      </div>
    </ResumeContainer>
  );
};
