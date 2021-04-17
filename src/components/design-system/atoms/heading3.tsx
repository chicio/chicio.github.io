import styled from "styled-components";
import { headingStyle } from "./heading-style";

export const Heading3 = styled.h3`
  font-size: ${(props) => props.theme.fontSizes[9]};
  ${headingStyle}
`;
