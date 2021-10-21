import styled from "styled-components";
import { mediaQuery } from "../utils-css/media-query";

export const Time = styled.time`
  color: ${(props) => props.theme.light.secondaryTextColor};

  ${mediaQuery.dark} {
    color: ${(props) => props.theme.dark.secondaryTextColor};
  }
`;
