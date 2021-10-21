import styled from "styled-components";
import { Link } from "gatsby";
import { mediaQuery } from "../utils-css/media-query";

export interface MenuItemProps {
  selected?: boolean;
}

export const MenuItem = styled(Link)<MenuItemProps>`
  color: ${(props) =>
    props.selected
      ? props.theme.light.textAbovePrimaryColor
      : props.theme.light.primaryColorLight};
  font-size: ${(props) => props.theme.fontSizes[2]};
  font-weight: 500;
  text-decoration: none;
  line-height: ${(props) => props.theme.lineHeight};

  &:hover,
  &:focus {
    color: ${(props) => props.theme.light.textAbovePrimaryColor};
    text-decoration: none;
  }

  ${mediaQuery.dark} {
    color: ${(props) =>
      props.selected
        ? props.theme.dark.textAbovePrimaryColor
        : props.theme.dark.primaryColorLight};
  }
`;
