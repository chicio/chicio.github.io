import styled from "styled-components";
import { headingStyle } from "./heading-style";

export const Heading7 = styled.h6`
  font-size: ${(props) => props.theme.fontSizes[5]};
  ${headingStyle}
`;
