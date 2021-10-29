import React from "react";
import { Meta } from "@storybook/react";
import styled from "styled-components";
import { ContainerFluid } from "../src/components/design-system/atoms/container-fluid";
import { blogDark, blogLight } from "../src/components/design-system/theme";

const ColorsContainer = styled.div`
  display: flex;
`;

const ColorColumnContainer = styled(ContainerFluid)`
  flex: 50%;
  text-align: center;
`;

interface ColorProps {
  color: string;
}

const Color = styled(ContainerFluid)<ColorProps>`
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  color: red;
  font-size: 18px;
  font-style: italic;
  border: 1px solid lightgray;
`;

const ColorColumnTitle = styled.span`
  color: white;
  font-size: 22px;
  color: red;
`;

export const Colors: React.VFC = () => (
  <ColorsContainer>
    <ColorColumnContainer>
      <ColorColumnTitle>Dark theme</ColorColumnTitle>
      {Object.keys(blogDark).map((color, index) => (
        // @ts-ignore
        <Color key={`${color}${index}dark`} color={blogDark[color]}>
          {color}
        </Color>
      ))}
    </ColorColumnContainer>
    <ColorColumnContainer>
      <ColorColumnTitle>Light theme</ColorColumnTitle>
      {Object.keys(blogLight).map((color, index) => (
        // @ts-ignore
        <Color key={`${color}${index}light`} color={blogLight[color]}>
          {color}
        </Color>
      ))}
    </ColorColumnContainer>
  </ColorsContainer>
);

export default {
  title: "Colors",
} as Meta;
