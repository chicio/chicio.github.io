import styled from "styled-components";
import { Link } from "gatsby";

interface MenuItemProps {
  selected?: boolean;
}

export const MenuItem = styled(Link)<MenuItemProps>`
  color: ${(props) =>
    props.selected
      ? props.theme.light.primaryColorText
      : props.theme.light.primaryColorLight};
  font-weight: 500;
  text-decoration: none;

  &:hover,
  &:focus {
    color: ${(props) => props.theme.light.primaryColorText};
    text-decoration: none;
  }

  @media (prefers-color-scheme: dark) {
    color: ${(props) =>
      props.selected
        ? props.theme.dark.primaryColorText
        : props.theme.dark.primaryColorLight};
  }
`;
