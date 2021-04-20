import { css } from "styled-components";

export const headingStyle = css`
  line-height: ${(props) => props.theme.lineHeight};
  color: ${(props) => props.theme.light.primaryTextColor};
  margin: ${(props) => props.theme.spacing[0]};
  font-weight: normal;

  @media (prefers-color-scheme: dark) {
    color: ${(props) => props.theme.dark.primaryTextColor};
  }
`;
