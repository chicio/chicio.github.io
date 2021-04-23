import styled from "styled-components";
import { headingStyle } from "./heading-style";

export const Heading2 = styled.h2`
  font-size: ${(props) => props.theme.fontSizes[10]};
  ${headingStyle}
`;
