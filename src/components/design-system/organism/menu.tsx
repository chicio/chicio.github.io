import React, { useEffect, useState } from "react";
import { tracking } from "../../../logic/tracking";
import styled, { css } from "styled-components";
import { Container } from "../atoms/container";
import { slugs } from "../../../logic/slug";
import { MenuItemWithTracking } from "../../menu-item-with-tracking";
import { HamburgerMenu } from "../molecules/hamburger-menu";

const MenuButtonContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;

  @media (min-width: 768px) {
    display: none;
  }
`;

interface MenuContainerProps {
  shouldHide: boolean;
  shouldOpenMenu: boolean;
}

const MenuContainer = styled.div<MenuContainerProps>`
  background-color: ${(props) => props.theme.light.primaryColor};
  box-shadow: inset 0 -2px 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: ${(props) => (props.shouldHide ? "-55px" : 0)};
  transition: top 0.3s ease 0s;
  width: 100%;
  z-index: 300;
  height: ${(props) => (props.shouldOpenMenu ? "200px" : "55px")};

  @media (prefers-color-scheme: dark) {
    background-color: ${(props) => props.theme.dark.primaryColor};
  }
`;

interface NavBarProps {
  shouldOpenMenu: boolean;
}

const NavBar = styled(Container)<NavBarProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

interface NavBarMenuItemProps {
  shouldOpenMenu: boolean;
}

const NavBarMenuItem = styled(MenuItemWithTracking)<NavBarMenuItemProps>`
  position: relative;
  display: ${(props) => (props.shouldOpenMenu ? "inline-block" : "none")};
  margin-right: 15px;
  line-height: 50px;
  font-size: ${(props) => props.theme.fontSizes[5]};
  height: ${(props) => (props.shouldOpenMenu ? "auto" : "55px")};

  @media (min-width: 768px) {
    display: inline-block;
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
  }
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
  const [shouldOpenMenu, setShouldOpenMenu] = useState(false);

  return (
    <MenuContainer
      shouldOpenMenu={shouldOpenMenu}
      shouldHide={direction == ScrollDirection.down}
    >
      <NavBar shouldOpenMenu={shouldOpenMenu}>
        <NavBarMenuItem
          shouldOpenMenu={shouldOpenMenu}
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
          shouldOpenMenu={shouldOpenMenu}
          selected={pathname !== slugs.aboutMe && pathname !== slugs.art}
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
          shouldOpenMenu={shouldOpenMenu}
          selected={pathname === slugs.art}
          to={slugs.art}
          trackingData={{
            action: tracking.action.open_about_me,
            category: trackingCategory,
            label: tracking.label.header,
          }}
        >
          {"Art"}
        </NavBarMenuItem>
        <NavBarMenuItem
          shouldOpenMenu={shouldOpenMenu}
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
        <MenuButtonContainer>
          <HamburgerMenu
            onClick={() => {
              setShouldOpenMenu(!shouldOpenMenu);
            }}
          />
        </MenuButtonContainer>
      </NavBar>
    </MenuContainer>
  );
};
