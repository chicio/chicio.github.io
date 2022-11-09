import { Meta, Story } from "@storybook/react";
import {
  BlogMenu,
  MenuProps,
} from "../../src/components/design-system/organism/blog-menu";

const Template: Story<MenuProps> = (args) => <BlogMenu {...args} />;

export const BlogMenuStory = Template.bind({});
BlogMenuStory.args = {
  trackingCategory: "",
  pathname: "/blog/",
};
BlogMenuStory.storyName = "Blog Menu";

export default {
  title: "Organisms/Blog Menu",
  component: BlogMenu,
} as Meta;
