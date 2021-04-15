import styled from "styled-components";
import { DivFullscreenCenterContent } from "../molecules/div-fullscreen-center-content";

export const ContainerCenterContent = styled(DivFullscreenCenterContent)`
  background-color: ${(props) => props.theme.light.primaryColor};

  @media (prefers-color-scheme: dark) {
    background-color: ${(props) => props.theme.dark.primaryColor};
  }
`;
