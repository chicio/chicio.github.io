import styled from "styled-components";
import { opacity } from "../../opacity-keyframes";

interface OverlayProps {
  zIndex: number;
  delay: string;
}

export const Overlay = styled.div<OverlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${(props) => props.zIndex};
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;
  animation: ${opacity} 0.25s linear ${(props) => `${props.delay}`};
  animation-fill-mode: forwards;
  backdrop-filter: blur(4px);
`;
