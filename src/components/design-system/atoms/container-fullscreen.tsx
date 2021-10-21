import styled from "styled-components";
import { mediaQuery } from "../utils-css/media-query";

export const ContainerFullscreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  min-height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.light.primaryColor};

  ${mediaQuery.dark} {
    background-color: ${(props) => props.theme.dark.primaryColor};
  }
`;
