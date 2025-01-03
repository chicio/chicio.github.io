import styled, { TransientProps } from "styled-components";
import { opacity } from "../utils-css/opacity-keyframes";
import { FC } from "react";
import { useLockBodyScroll } from "../hooks/use-lock-body-scroll";

export interface OverlayProps {
  zIndex: number;
  delay: string;
  onClick: () => void;
}

const StyledOverlay = styled.div<TransientProps<OverlayProps, "div">>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${(props) => props.$zIndex};
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;
  animation: ${opacity} 0.25s linear ${(props) => `${props.$delay}`};
  animation-fill-mode: forwards;
  backdrop-filter: blur(4px);
`;

export const Overlay: FC<OverlayProps> = ({ zIndex, onClick, delay }) => {
  useLockBodyScroll();

  return <StyledOverlay $zIndex={zIndex} onClick={onClick} $delay={delay} />;
};
