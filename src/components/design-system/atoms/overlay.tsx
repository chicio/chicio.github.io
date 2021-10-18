import styled from "styled-components";
import { opacity } from "../../opacity-keyframes";
import React, { useLayoutEffect } from "react";

const useLockBodyScroll = () => {
  useLayoutEffect(() => {
    const originalBodyStyle = window.getComputedStyle(document.body);
    const currentScrollYPosition =
      (window.scrollY || document.documentElement.scrollTop) -
      (document.documentElement.clientTop || 0);
    document.body.style.top = -currentScrollYPosition + "px";
    document.body.style.position = "fixed";
    document.body.style.left = "0";
    document.body.style.right = "0";
    return () => {
      document.body.style.top = originalBodyStyle.top;
      document.body.style.position = originalBodyStyle.position;
      document.body.style.left = originalBodyStyle.left;
      document.body.style.right = originalBodyStyle.right;
      window.scrollTo(0, currentScrollYPosition);
    };
  }, []);
};

export interface OverlayProps {
  zIndex: number;
  delay: string;
  onClick: () => void;
}

const StyledOverlay = styled.div<OverlayProps>`
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

export const Overlay: React.FC<OverlayProps> = (props) => {
  useLockBodyScroll();

  return <StyledOverlay {...props} />;
};
