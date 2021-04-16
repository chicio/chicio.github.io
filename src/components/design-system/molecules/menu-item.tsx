import styled, { css } from "styled-components";
import { Link } from "gatsby";

interface MenuItemProps {
  selected: boolean;
}

export const MenuItem = styled(Link)<MenuItemProps>`
  color: ${(props) =>
    props.selected
      ? props.theme.light.primaryColorText
      : props.theme.light.primaryColorLight};
  position: relative;
  display: inline-block;
  font-weight: 500;
  margin-right: 15px;
  height: 55px;
  line-height: 70px;

  &:hover,
  &:focus {
    color: ${(props) => props.theme.light.primaryColorText};
    text-decoration: none;
  }

  ${(props) =>
    props.selected &&
    css`
      &:after {
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 0;
        margin-left: -5px;
        content: " ";
        border-right: 5px solid transparent;
        border-bottom: 5px solid
          ${(props) => props.theme.light.generalBackground};
        border-left: 5px solid transparent;

        @media (prefers-color-scheme: dark) {
          border-bottom: 5px solid ${(props) =>
            props.theme.dark.generalBackground};
        }
    `};

  @media (prefers-color-scheme: dark) {
    color: ${(props) =>
      props.selected
        ? props.theme.dark.primaryColorText
        : props.theme.dark.primaryColorLight};
  }
`;
