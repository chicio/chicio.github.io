import styled from "styled-components";
import { headingStyle } from "./heading-style";

export const Heading4 = styled.h4`
  font-size: ${(props) => props.theme.fontSizes[8]};
  ${headingStyle}
`;
