import React from "react";
import { track, tracking } from "../utils/tracking";
import { GlobalStyle } from "../components/global-style";
import { Heading1 } from "../components/atoms/heading1";
import { Paragraph } from "../components/atoms/paragraph";
import { ThemeProvider } from "styled-components";
import { theme } from "../components/theme";
import { ContainerCenterContent } from "../components/organism/container-center-content";
import { CallToActionHome } from "../components/molecules/call-to-action-home";

const NotFoundPage: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ContainerCenterContent>
        <Heading1>404!</Heading1>
        <Paragraph>Opss!?! Keep calm and go to</Paragraph>
        <CallToActionHome
          onClick={() => {
            track(
              tracking.action.open_home,
              tracking.category.notfound,
              tracking.label.body
            );
          }}
        />
      </ContainerCenterContent>
    </ThemeProvider>
  );
};

export default NotFoundPage;
