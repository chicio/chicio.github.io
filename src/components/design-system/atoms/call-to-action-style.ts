import { css } from "styled-components";

export const callToActionStyle = css`
  font-size: ${(props) => props.theme.fontSizes[3]};
  background-color: ${(props) => props.theme.light.accentColor};
  color: ${(props) => props.theme.light.primaryColorText};
  padding: ${(props) => props.theme.spacing[2]};
  border: none;
  border-radius: 4px;
  margin: ${(props) => props.theme.spacing[0]};
  line-height: 1;
  text-align: center;

  @media (prefers-color-scheme: dark) {
    background-color: ${(props) => props.theme.dark.accentColor};
    color: ${(props) => props.theme.dark.primaryColorText};
  }

  color: ${(props) => props.theme.light.primaryColorText};
  text-decoration: none;

  &:hover {
    color: ${(props) => props.theme.light.primaryColorText};
    text-decoration: none;

    @media (prefers-color-scheme: dark) {
      color: ${(props) => props.theme.dark.primaryColorText};
    }
  }
`;
