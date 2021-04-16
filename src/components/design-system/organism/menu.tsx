import React from "react";
import { track, tracking } from "../../../utils/tracking";
import { MenuItem } from "../molecules/menu-item";
import { Container } from "../atoms/container";
import styled from "styled-components";

const NavBar = styled(Container)`
  display: flex;
  align-items: center;
  height: 55px;
`;

interface MastheadProps {
  trackingCategory: string;
  pathname: string;
}

export const Menu: React.FC<MastheadProps> = ({
  trackingCategory,
  pathname,
}) => (
  <div className="blog-masthead">
    <NavBar>
      <MenuItem
        active={pathname === "/"}
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
      </MenuItem>
      <MenuItem
        active={pathname !== "/2017/05/10/about-me/"}
        to={"/blog/"}
        onClick={() => {
          track(
            tracking.action.open_blog,
            trackingCategory,
            tracking.label.header
          );
        }}
      >
        {"Blog"}
      </MenuItem>
      <MenuItem
        active={pathname === "/2017/05/10/about-me/"}
        to={"/2017/05/10/about-me/"}
        onClick={() => {
          track(
            tracking.action.open_about_me,
            trackingCategory,
            tracking.label.header
          );
        }}
      >
        {"About me"}
      </MenuItem>
    </NavBar>
  </div>
);
