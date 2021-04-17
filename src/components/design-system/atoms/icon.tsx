import styled from "styled-components";
import { StyledIconBase } from "@styled-icons/styled-icon";

export const Icon = styled.div`
  ${StyledIconBase} {
    color: ${(props) => props.theme.light.primaryColorText};
  }
`;
