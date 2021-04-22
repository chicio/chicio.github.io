import styled from "styled-components";
import { Link } from "gatsby";

interface MenuItemProps {
  selected?: boolean;
}

export const MenuItem = styled(Link)<MenuItemProps>`
  color: ${(props) =>
    props.selected
      ? props.theme.light.textAbovePrimaryColor
      : props.theme.light.primaryColorLight};
  font-weight: 500;
  text-decoration: none;
  line-height: ${(props) => props.theme.lineHeight};

  &:hover,
  &:focus {
    color: ${(props) => props.theme.light.textAbovePrimaryColor};
    text-decoration: none;
  }

  @media (prefers-color-scheme: dark) {
    color: ${(props) =>
      props.selected
        ? props.theme.dark.textAbovePrimaryColor
        : props.theme.dark.primaryColorLight};
  }
`;
