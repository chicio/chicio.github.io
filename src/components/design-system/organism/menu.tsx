import React, { memo, useCallback, useEffect, useState } from "react";
import { tracking } from "../../../logic/tracking";
import styled, { css } from "styled-components";
import { Container } from "../atoms/container";
import { slugs } from "../../../logic/slug";
import { MenuItemWithTracking } from "../../menu-item-with-tracking";
import { HamburgerMenu } from "../molecules/hamburger-menu";
import { Overlay } from "../atoms/overlay";
import { CSSTransition } from "react-transition-group";
import { Close } from "../molecules/close";

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
  delayOpenCloseMenuAnimation: number;
}

const MenuContainer = styled.div<MenuContainerProps>`
  background-color: ${(props) => props.theme.light.primaryColor};
  box-shadow: inset 0 -2px 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: ${(props) => (props.shouldHide ? "-55px" : 0)};
  transition: top 0.3s ease 0s,
    height 0.3s ease ${(props) => `${props.delayOpenCloseMenuAnimation}s`};
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
  animationDuration: number;
  enterDelayAnimation: number;
  exitDelayAnimation: number;
}

const NavBarMenuItem = memo(styled(MenuItemWithTracking)<NavBarMenuItemProps>`
  position: relative;
  display: inline-block;
  visibility: ${(props) => (props.shouldOpenMenu ? "visible" : "hidden")};
  margin-right: 15px;
  line-height: 50px;
  font-size: ${(props) => props.theme.fontSizes[5]};
  height: auto;

  &.opacity-enter {
    visibility: visible;
    opacity: 0;
  }

  &.opacity-enter-active {
    opacity: 1;
    transition: opacity ${(props) => `${props.animationDuration}ms`} ease
      ${(props) => `${props.enterDelayAnimation}s`};
  }

  &.opacity-exit {
    visibility: visible;
    opacity: 1;
  }

  &.opacity-exit-active {
    opacity: 0;
    transition: opacity ${(props) => `${props.animationDuration}ms`} ease
      ${(props) => `${props.exitDelayAnimation}s`};
    visibility: visible;
  }

  @media (min-width: 768px) {
    visibility: visible;
    opacity: 1;
    height: 55px;
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
`);

interface AnimatedNavBarItemProps {
  label: string;
  slug: string;
  selected: boolean;
  trackingAction: string;
  trackingCategory: string;
  shouldOpenMenu: boolean;
  enterDelayAnimation: number;
  exitDelayAnimation: number;
  onStartAnimation: () => void;
  onFinishAnimation: () => void;
}

const AnimatedNavBarItem: React.FC<AnimatedNavBarItemProps> = ({
  label,
  slug,
  selected,
  trackingAction,
  trackingCategory,
  shouldOpenMenu,
  enterDelayAnimation,
  exitDelayAnimation,
  onStartAnimation,
  onFinishAnimation,
}) => (
  <CSSTransition
    in={shouldOpenMenu}
    classNames="opacity"
    addEndListener={(node, done) => {
      node.addEventListener("transitionend", done, false);
    }}
    onEnter={onStartAnimation}
    onEntered={onFinishAnimation}
    onExit={onStartAnimation}
    onExited={onFinishAnimation}
  >
    <NavBarMenuItem
      shouldOpenMenu={shouldOpenMenu}
      animationDuration={300}
      enterDelayAnimation={enterDelayAnimation}
      exitDelayAnimation={exitDelayAnimation}
      selected={selected}
      to={slug}
      trackingData={{
        action: trackingAction,
        category: trackingCategory,
        label: tracking.label.header,
      }}
    >
      {label}
    </NavBarMenuItem>
  </CSSTransition>
);

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
  const [enableMenuButton, setEnableMenuButton] = useState(true);

  const onStartAnimation = useCallback(() => setEnableMenuButton(false), [
    setEnableMenuButton,
  ]);
  const onFinishAnimation = useCallback(() => setEnableMenuButton(true), [
    setEnableMenuButton,
  ]);
  const changeMenuStatus = useCallback(
    (enableMenuButton: boolean, shouldOpenMenu: boolean) => {
      if (enableMenuButton) {
        setShouldOpenMenu(!shouldOpenMenu);
      }
    },
    [setShouldOpenMenu]
  );

  return (
    <>
      <MenuContainer
        shouldOpenMenu={shouldOpenMenu}
        shouldHide={direction == ScrollDirection.down}
        delayOpenCloseMenuAnimation={shouldOpenMenu ? 0 : 0.4}
      >
        <NavBar shouldOpenMenu={shouldOpenMenu}>
          <AnimatedNavBarItem
            label={"Home"}
            slug={"/"}
            selected={pathname === "/"}
            trackingAction={tracking.action.open_home}
            trackingCategory={trackingCategory}
            shouldOpenMenu={shouldOpenMenu}
            enterDelayAnimation={0.3}
            exitDelayAnimation={0.6}
            onStartAnimation={onStartAnimation}
            onFinishAnimation={onFinishAnimation}
          />
          <AnimatedNavBarItem
            label={"Blog"}
            slug={slugs.blog}
            selected={pathname !== slugs.art && pathname !== slugs.aboutMe}
            trackingAction={tracking.action.open_blog}
            trackingCategory={trackingCategory}
            shouldOpenMenu={shouldOpenMenu}
            enterDelayAnimation={0.4}
            exitDelayAnimation={0.4}
            onStartAnimation={onStartAnimation}
            onFinishAnimation={onFinishAnimation}
          />
          <AnimatedNavBarItem
            label={"Art"}
            slug={slugs.art}
            selected={pathname === slugs.art}
            trackingAction={tracking.action.open_art}
            trackingCategory={trackingCategory}
            shouldOpenMenu={shouldOpenMenu}
            enterDelayAnimation={0.5}
            exitDelayAnimation={0.2}
            onStartAnimation={onStartAnimation}
            onFinishAnimation={onFinishAnimation}
          />
          <AnimatedNavBarItem
            label={"About me"}
            slug={slugs.aboutMe}
            selected={pathname === slugs.aboutMe}
            trackingAction={tracking.action.open_about_me}
            trackingCategory={trackingCategory}
            shouldOpenMenu={shouldOpenMenu}
            enterDelayAnimation={0.6}
            exitDelayAnimation={0.0}
            onStartAnimation={onStartAnimation}
            onFinishAnimation={onFinishAnimation}
          />
          <MenuButtonContainer>
            {!shouldOpenMenu && (
              <HamburgerMenu
                onClick={() =>
                  changeMenuStatus(enableMenuButton, shouldOpenMenu)
                }
              />
            )}
            {shouldOpenMenu && (
              <Close
                onClick={() =>
                  changeMenuStatus(enableMenuButton, shouldOpenMenu)
                }
              />
            )}
          </MenuButtonContainer>
        </NavBar>
      </MenuContainer>
      {shouldOpenMenu && (
        <Overlay
          zIndex={250}
          delay={shouldOpenMenu ? "0s" : "0.4s"}
          onClick={() => {
            setShouldOpenMenu(!shouldOpenMenu);
          }}
        />
      )}
    </>
  );
};
