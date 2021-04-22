import styled from "styled-components";
import { StyledIconBase } from "@styled-icons/styled-icon";

export const Icon = styled.div`
  ${StyledIconBase} {
    color: ${(props) => props.theme.light.textAbovePrimaryColor};

    @media (prefers-color-scheme: dark) {
      color: ${(props) => props.theme.dark.textAbovePrimaryColor};
    }
`;
