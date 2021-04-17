import styled from "styled-components";
import { headingStyle } from "./heading-style";

export const Heading1 = styled.h1`
  font-size: ${(props) => props.theme.fontSizes[12]};
  ${headingStyle}
`;
