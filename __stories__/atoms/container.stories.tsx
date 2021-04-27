import React from "react";
import { Meta } from "@storybook/react";
import styled from "styled-components";
import { Container } from "../../src/components/design-system/atoms/container";

const ContainerWithColor = styled(Container)`
  background-color: ${(props) => props.theme.light.primaryColor};
`;

export const Standard: React.VFC = () => (
  <ContainerWithColor>{"A Standard Container"}</ContainerWithColor>
);

export default {
  title: "Atoms/Containers",
  component: Container,
} as Meta;
