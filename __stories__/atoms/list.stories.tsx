import React from "react";
import { Meta } from "@storybook/react";
import { List } from "../../src/components/design-system/atoms/list";

export const ListContainer: React.VFC = () => (
  <List>
    <li>an element</li>
    <li>another element</li>
    <li>yet another element</li>
  </List>
);

// @ts-ignore
ListContainer.storyName = "List";

export default {
  title: "Atoms/Typography",
  component: ListContainer,
} as Meta;
