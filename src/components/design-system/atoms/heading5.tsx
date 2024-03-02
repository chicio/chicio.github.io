import styled, { css } from "styled-components";
import { headingStyle } from "./heading-style";

export const heading5Style = css`
  font-size: ${(props) => props.theme.fontSizes[7]};
  ${headingStyle}
`;

export const Heading5 = styled.h5`
  font-size: ${(props) => props.theme.fontSizes[7]};
  ${headingStyle}
`;
