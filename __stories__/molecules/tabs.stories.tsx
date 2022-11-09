import { Meta, Story } from "@storybook/react";
import {
  Tabs,
  TabsProps,
} from "../../src/components/design-system/molecules/tabs";

const Template: Story<TabsProps> = (args) => <Tabs {...args} />;

export const TabsStory = Template.bind({});
TabsStory.args = {
  tab1: {
    active: true,
    label: "Projects",
    link: "",
    trackingAction: "",
    trackingCategory: "",
    trackingLabel: "",
    action: () => {},
  },
  tab2: {
    active: false,
    label: "Experiences",
    link: "",
    trackingAction: "",
    trackingCategory: "",
    trackingLabel: "",
    action: () => {},
  },
};

TabsStory.storyName = "Tabs";

export default {
  title: "Molecules/Tabs",
  component: Tabs,
} as Meta;
