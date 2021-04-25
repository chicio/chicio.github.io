import React from "react";
import { Meta, Story } from "@storybook/react";
import {
  MenuItem,
  MenuItemProps,
} from "../../src/components/design-system/molecules/menu-item";

const Template: Story<MenuItemProps> = (args) => (
  <MenuItem {...args} to={""}>
    A menu item
  </MenuItem>
);

export const NotSelected = Template.bind({});
NotSelected.args = {
  selected: false,
};

export const SelectedSelected = Template.bind({});
SelectedSelected.args = {
  selected: true,
};

export default {
  title: "Molecules/Menu Item",
  component: MenuItem,
} as Meta;
