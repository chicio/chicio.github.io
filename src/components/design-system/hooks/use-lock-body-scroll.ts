import { useLayoutEffect } from "react";

export const useLockBodyScroll = () => {
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
