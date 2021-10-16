import styled from "styled-components";
import { opacity } from "../../opacity-keyframes";
import React, { useLayoutEffect } from "react";

const useLockBodyScroll = () => {
  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body);
    const originalPositionStyle = originalStyle.position;
    const originalTopStyle = originalStyle.top;
    const originalLeftStyle = originalStyle.left;
    const originalRightStyle = originalStyle.right;
    const currentScrollYPosition =
      (window.scrollY || document.documentElement.scrollTop) -
      (document.documentElement.clientTop || 0);
    document.body.style.top = -currentScrollYPosition + "px";
    document.body.style.position = "fixed";
    document.body.style.left = "0";
    document.body.style.right = "0";
    return () => {
      document.body.style.top = originalTopStyle;
      document.body.style.position = originalPositionStyle;
      document.body.style.left = originalLeftStyle;
      document.body.style.right = originalRightStyle;
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
