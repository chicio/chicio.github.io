import React from "react";
import { Meta } from "@storybook/react";
import styled from "styled-components";
import { ContainerFullscreen } from "../../src/components/design-system/atoms/container-fullscreen";

const ContainerWithColor = styled(ContainerFullscreen)`
  background-color: ${(props) => props.theme.light.primaryColor};
`;

export const FullScreen: React.VFC = () => (
  <ContainerWithColor>{"A fluid Container"}</ContainerWithColor>
);

export default {
  title: "Atoms/Containers",
  component: FullScreen,
} as Meta;
