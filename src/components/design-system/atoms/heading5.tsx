import styled from "styled-components";
import { headingStyle } from "./heading-style";

export const Heading5 = styled.h5`
  font-size: ${(props) => props.theme.fontSizes[7]};
  ${headingStyle}
`;
