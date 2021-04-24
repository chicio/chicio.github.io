import React from "react";
import { Meta } from "@storybook/react";
import { MenuItem } from "../../src/components/design-system/molecules/menu-item";

export const NotSelected: React.VFC = () => (
  <MenuItem to={""} selected={false}>
    An item
  </MenuItem>
);
export const Selected: React.VFC = () => (
  <MenuItem to={""} selected={true}>
    An item
  </MenuItem>
);

export default {
  title: "Molecules/Menu Item",
} as Meta;
