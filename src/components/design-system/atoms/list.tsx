import styled from "styled-components";
import { mediaQuery } from "../utils-css/media-query";

export const List = styled.ul`
  font-size: ${(props) => props.theme.fontSizes[2]};
  color: ${(props) => props.theme.light.primaryTextColor};
  line-height: ${(props) => props.theme.lineHeight};

  ${mediaQuery.dark} {
    color: ${(props) => props.theme.dark.primaryTextColor};
  }
`;
