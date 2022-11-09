import { Meta, Story } from "@storybook/react";
import {
  Tag,
  TagProps,
} from "../../src/components/design-system/molecules/tag";

const Template: Story<TagProps> = (args) => <Tag {...args} />;

export const TagStory = Template.bind({});
TagStory.args = {
  link: "an url",
  tag: "macOS",
};
TagStory.storyName = "Tag";

export default {
  title: "Molecules/Tag",
  component: Tag,
} as Meta;
