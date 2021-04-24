import React from "react";
import { Meta } from "@storybook/react";
import styled from "styled-components";
import { ContainerSection } from "../../src/components/design-system/atoms/container-section";

const ContainerWithColor = styled(ContainerSection)`
  background-color: ${(props) => props.theme.light.primaryColor};
`;

export const Section: React.VFC = () => (
  <ContainerWithColor>{"A fluid Container"}</ContainerWithColor>
);

export default {
  title: "Atoms/Containers",
  component: Section,
} as Meta;
