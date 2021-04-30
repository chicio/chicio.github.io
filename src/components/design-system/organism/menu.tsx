import React from "react";
import { track, tracking } from "../../../logic/tracking";
import { MenuItem } from "../molecules/menu-item";
import styled, { css } from "styled-components";
import { Container } from "../atoms/container";
import { slugs } from "../../../logic/slug";

const MenuContainer = styled.div`
  background-color: ${(props) => props.theme.light.primaryColor};
  box-shadow: inset 0 -2px 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  width: 100%;
  height: 55px;
  z-index: 300;

  @media (prefers-color-scheme: dark) {
    background-color: ${(props) => props.theme.dark.primaryColor};
  }
`;

const NavBar = styled(Container)`
  display: flex;
  align-items: center;
  height: 55px;
`;

const NavBarMenuItem = styled(MenuItem)`
  position: relative;
  display: inline-block;
  margin-right: 15px;
  height: 55px;
  line-height: 70px;
  font-size: ${(props) => props.theme.fontSizes[5]};

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
`;

export interface MenuProps {
  trackingCategory: string;
  pathname: string;
}

export const Menu: React.FC<MenuProps> = ({ trackingCategory, pathname }) => (
  <MenuContainer>
    <NavBar>
      <NavBarMenuItem
        selected={pathname === "/"}
        to={"/"}
        onClick={() => {
          track(
            tracking.action.open_home,
            trackingCategory,
            tracking.label.header
          );
        }}
      >
        {"Home"}
      </NavBarMenuItem>
      <NavBarMenuItem
        selected={pathname !== slugs.aboutMe}
        to={slugs.blog}
        onClick={() => {
          track(
            tracking.action.open_blog,
            trackingCategory,
            tracking.label.header
          );
        }}
      >
        {"Blog"}
      </NavBarMenuItem>
      <NavBarMenuItem
        selected={pathname === slugs.aboutMe}
        to={slugs.aboutMe}
        onClick={() => {
          track(
            tracking.action.open_about_me,
            trackingCategory,
            tracking.label.header
          );
        }}
      >
        {"About me"}
      </NavBarMenuItem>
    </NavBar>
  </MenuContainer>
);
