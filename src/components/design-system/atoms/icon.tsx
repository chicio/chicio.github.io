import styled from "styled-components";
import { StyledIconBase } from "@styled-icons/styled-icon";
import { mediaQuery } from "../utils-css/media-query";

export const Icon = styled.div`
  ${StyledIconBase} {
    color: ${(props) => props.theme.light.textAbovePrimaryColor};

    ${mediaQuery.dark} {
      color: ${(props) => props.theme.dark.textAbovePrimaryColor};
    }
`;
