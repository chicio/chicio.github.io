import React from "react";
import { Meta, Story } from "@storybook/react";
import {
  Menu,
  MenuProps,
} from "../../src/components/design-system/organism/menu";

const Template: Story<MenuProps> = (args) => <Menu {...args} />;

export const MenuStory = Template.bind({});
MenuStory.args = {
  trackingCategory: "",
  pathname: "/blog/",
};
MenuStory.storyName = "Menu";

export default {
  title: "Organisms/Menu",
  component: Menu,
} as Meta;
