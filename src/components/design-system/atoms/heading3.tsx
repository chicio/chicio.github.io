import styled, { css } from "styled-components";
import { headingStyle } from "./heading-style";

export const heading3Style = css`
  font-size: ${(props) => props.theme.fontSizes[9]};
  ${headingStyle}
`;

export const Heading3 = styled.h3`
  ${heading3Style}
`;
