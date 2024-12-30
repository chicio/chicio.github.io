import styled from "styled-components";
import { backgroundGradients } from "./gradients";

export const ContainerFullscreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  min-height: 100vh;
  width: 100%;
  ${backgroundGradients}
`;
