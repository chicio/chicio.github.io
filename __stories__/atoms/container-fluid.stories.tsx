import React from "react";
import { Meta } from "@storybook/react";
import { ContainerFluid } from "../../src/components/design-system/atoms/container-fluid";
import styled from "styled-components";

const ContainerWithColor = styled(ContainerFluid)`
  background-color: ${(props) => props.theme.light.primaryColor};
`;

export const Fluid: React.VFC = () => (
  <ContainerWithColor>{"A fluid Container"}</ContainerWithColor>
);

export default {
  title: "Atoms/Containers",
  component: Fluid,
} as Meta;
