import React from "react";
import { Meta } from "@storybook/react";
import { HamburgerMenu } from "../../src/components/design-system/molecules/hamburger-menu";

export const HamburgerMenuContainer: React.VFC = () => (
  <HamburgerMenu onClick={() => alert("click")} />
);

// @ts-ignore
HamburgerMenuContainer.storyName = "Hamburger Menu";

export default {
  title: "Molecules",
  component: HamburgerMenu,
} as Meta;
