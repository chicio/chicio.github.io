import { css } from "styled-components";
import { mediaQuery } from "../utils-css/media-query";

export const standardLinkStyle = css`
  font-size: ${(props) => props.theme.fontSizes[2]};
  color: ${(props) => props.theme.light.accentColor};
  text-decoration: none;
  line-height: ${(props) => props.theme.lineHeight};

  ${mediaQuery.dark} {
    color: ${(props) => props.theme.dark.accentColor};
  }

  &:hover {
    color: ${(props) => props.theme.light.accentColor};

    ${mediaQuery.dark} {
      color: ${(props) => props.theme.dark.accentColor};
    }
  }
`;
