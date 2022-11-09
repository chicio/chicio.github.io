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

export const MenuItemStory = Template.bind({});
MenuItemStory.args = {
  selected: false,
};

MenuItemStory.storyName = "Menu Item";

export default {
  title: "Molecules/Menu Item",
  component: MenuItem,
} as Meta;
