import React, { useEffect, useState } from "react";
import { tracking } from "../../../logic/tracking";
import styled, { css } from "styled-components";
import { Container } from "../atoms/container";
import { slugs } from "../../../logic/slug";
import { MenuItemWithTracking } from "../../menu-item-with-tracking";

interface MenuContainerProps {
  shouldHide: boolean;
}

const MenuContainer = styled.div<MenuContainerProps>`
  background-color: ${(props) => props.theme.light.primaryColor};
  box-shadow: inset 0 -2px 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: ${(props) => (props.shouldHide ? "-55px" : 0)};
  transition: top 0.3s ease 0s;
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

const NavBarMenuItem = styled(MenuItemWithTracking)`
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

enum ScrollDirection {
  up,
  down,
}

const useScrollDirection = () => {
  const threshold = 100;
  const [scrollDir, setScrollDir] = useState(ScrollDirection.up);

  useEffect(() => {
    let previousScrollYPosition = window.pageYOffset;

    const scrolledMoreThanThreshold = (currentScrollYPosition: number) =>
      Math.abs(currentScrollYPosition - previousScrollYPosition) > threshold;

    const isScrollingUp = (currentScrollYPosition: number) =>
      currentScrollYPosition > previousScrollYPosition;

    const updateScrollDir = () => {
      const currentScrollYPosition = window.pageYOffset;

      if (scrolledMoreThanThreshold(currentScrollYPosition)) {
        const newScrollDirection = isScrollingUp(currentScrollYPosition)
          ? ScrollDirection.down
          : ScrollDirection.up;
        setScrollDir(newScrollDirection);
        previousScrollYPosition =
          currentScrollYPosition > 0 ? currentScrollYPosition : 0;
      }
    };

    const onScroll = () => window.requestAnimationFrame(updateScrollDir);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrollDir;
};

export interface MenuProps {
  trackingCategory: string;
  pathname: string;
}

export const Menu: React.FC<MenuProps> = ({ trackingCategory, pathname }) => {
  const direction = useScrollDirection();

  return (
    <MenuContainer shouldHide={direction == ScrollDirection.down}>
      <NavBar>
        <NavBarMenuItem
          selected={pathname === "/"}
          to={"/"}
          trackingData={{
            action: tracking.action.open_home,
            category: trackingCategory,
            label: tracking.label.header,
          }}
        >
          {"Home"}
        </NavBarMenuItem>
        <NavBarMenuItem
          selected={pathname !== slugs.aboutMe}
          to={slugs.blog}
          trackingData={{
            action: tracking.action.open_blog,
            category: trackingCategory,
            label: tracking.label.header,
          }}
        >
          {"Blog"}
        </NavBarMenuItem>
        <NavBarMenuItem
          selected={pathname === slugs.aboutMe}
          to={slugs.aboutMe}
          trackingData={{
            action: tracking.action.open_about_me,
            category: trackingCategory,
            label: tracking.label.header,
          }}
        >
          {"About me"}
        </NavBarMenuItem>
      </NavBar>
    </MenuContainer>
  );
};
