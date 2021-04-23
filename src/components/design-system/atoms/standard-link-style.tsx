import { css } from "styled-components";

export const standardLinkStyle = css`
  font-size: ${(props) => props.theme.fontSizes[2]};
  color: ${(props) => props.theme.light.accentColor};
  text-decoration: none;
  line-height: ${(props) => props.theme.lineHeight};

  @media (prefers-color-scheme: dark) {
    color: ${(props) => props.theme.dark.accentColor};
  }

  &:hover {
    color: ${(props) => props.theme.light.accentColor};

    @media (prefers-color-scheme: dark) {
      color: ${(props) => props.theme.dark.accentColor};
    }
  }
`;
