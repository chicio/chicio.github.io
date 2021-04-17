import { css } from "styled-components";

export const standardLinkStyle = css`
  color: ${(props) => props.theme.light.accentColor};

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
