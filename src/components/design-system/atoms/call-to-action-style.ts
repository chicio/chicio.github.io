import { css } from "styled-components";
import { mediaQuery } from "../utils-css/media-query";
import { borderRadius } from "./border-radius";

export const callToActionStyle = css`
  font-size: ${(props) => props.theme.fontSizes[3]};
  background-color: ${(props) => props.theme.light.accentColor};
  color: ${(props) => props.theme.light.textAbovePrimaryColor};
  padding: ${(props) => props.theme.spacing[2]};
  border: none;
  ${borderRadius};
  margin: ${(props) => props.theme.spacing[0]};
  line-height: 1;
  text-align: center;
  display: inline-block;

  ${mediaQuery.dark} {
    background-color: ${(props) => props.theme.dark.accentColor};
    color: ${(props) => props.theme.dark.textAbovePrimaryColor};
  }

  color: ${(props) => props.theme.light.textAbovePrimaryColor};
  text-decoration: none;

  ${mediaQuery.inputDevice.mouse} {
    transition: transform 0.15s;
  }

  &:hover {
    color: ${(props) => props.theme.light.textAbovePrimaryColor};
    text-decoration: none;

    @media (prefers-color-scheme: dark) {
      color: ${(props) => props.theme.dark.textAbovePrimaryColor};
    }

    ${mediaQuery.inputDevice.mouse} {
      transform: scale(1.1);
    }
  }
`;
