import { css } from "styled-components";

export const headingStyle = css`
  color: ${(props) => props.theme.light.primaryColorText};
  margin: ${(props) => props.theme.spacing[0]};

  @media (prefers-color-scheme: dark) {
    color: ${(props) => props.theme.dark.primaryColorText};
  }
`;
