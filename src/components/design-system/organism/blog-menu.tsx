import { FC, memo, useCallback, useState } from "react";
import { tracking } from "../../../logic/tracking";
import styled, { css } from "styled-components";
import { Container } from "../atoms/container";
import { slugs } from "../../../logic/slug";
import { MenuItemWithTracking } from "../../tracking/menu-item-with-tracking";
import { HamburgerMenu } from "../molecules/hamburger-menu";
import { Overlay } from "../atoms/overlay";
import { CSSTransition } from "react-transition-group";
import { Close } from "../molecules/close";
import { mediaQuery } from "../utils-css/media-query";
import { MobileBlogHeader } from "./blog-header";
import { ContainerFluid } from "../atoms/container-fluid";
import {
  ScrollDirection,
  useScrollDirection,
} from "../hooks/use-scroll-direction";
import { Search } from "../molecules/search";

export const menuHeight = "55px";

const MobileBlogHeaderContainer = styled(ContainerFluid)<{ $hide: boolean }>`
  height: ${menuHeight};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: opacity 0.2s ease ${(props) => (props.$hide ? "0s" : "0.4s")};
  opacity: ${(props) => (props.$hide ? 0 : 1)};

  ${mediaQuery.minWidth.sm} {
    display: none;
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${(props) => props.theme.light.textAbovePrimaryColor};
  position: absolute;
  top: 54px;
  left: ${(props) => props.theme.spacing[3]};
  right: ${(props) => props.theme.spacing[3]};
  opacity: 0.2;

  ${mediaQuery.dark} {
    background-color: ${(props) => props.theme.dark.textAbovePrimaryColor};
  }
`;

const MenuButtonContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;

  ${mediaQuery.minWidth.sm} {
    display: none;
  }
`;

const MenuContainer = styled.div<{
  $shouldHide: boolean;
  $shouldOpenMenu: boolean;
  $delayOpenCloseMenuAnimation: number;
}>`
  background-color: ${(props) => props.theme.light.primaryColorDark};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  position: fixed;
  top: ${(props) => (props.$shouldHide ? `-${menuHeight}` : 0)};
  left: 0;
  right: 0;
  transition:
    top 0.3s ease 0s,
    height 0.3s ease ${(props) => `${props.$delayOpenCloseMenuAnimation}s`};
  width: 100%;
  z-index: 300;
  height: ${(props) => (props.$shouldOpenMenu ? "260px" : menuHeight)};

  ${mediaQuery.dark} {
    background-color: ${(props) => props.theme.dark.primaryColorDark};
  }
`;

const NavBar = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: ${menuHeight};

  ${mediaQuery.minWidth.sm} {
    flex-direction: row;
  }
`;

interface NavBarMenuItemProps {
  shouldOpenMenu: boolean;
  animationDuration: string;
  enterDelayAnimation: string;
  exitDelayAnimation: string;
}

const NavBarMenuItem = memo(styled(MenuItemWithTracking)<NavBarMenuItemProps>`
  position: relative;
  display: inline-block;
  visibility: ${(props) => (props.shouldOpenMenu ? "visible" : "hidden")};
  margin-right: 20px;
  line-height: 50px;
  font-size: ${(props) => props.theme.fontSizes[5]};
  height: auto;

  &.opacity-enter {
    visibility: visible;
    opacity: 0;
  }

  &.opacity-enter-active {
    opacity: 1;
    visibility: visible;
    transition: opacity ${(props) => props.animationDuration} ease
      ${(props) => props.enterDelayAnimation};
  }

  &.opacity-exit {
    visibility: visible;
    opacity: 1;
  }

  &.opacity-exit-active {
    opacity: 0;
    transition: opacity ${(props) => props.animationDuration} ease
      ${(props) => props.exitDelayAnimation};
    visibility: visible;
  }

  ${mediaQuery.minWidth.sm} {
    visibility: visible;
    opacity: 1;
    height: ${menuHeight};

    ${(props) =>
      !props.selected &&
      css`
        ${mediaQuery.inputDevice.mouse} {
          transition: transform 0.15s;

          &:hover {
            transform: scale(1.1);
          }
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
  enterDelayAnimation: string;
  exitDelayAnimation: string;
  onStartAnimation: () => void;
  onFinishAnimation: () => void;
}

const AnimatedNavBarItem: FC<AnimatedNavBarItemProps> = ({
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
      animationDuration={"0.3s"}
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

export interface MenuProps {
  trackingCategory: string;
  pathname: string;
}

export const BlogMenu: FC<MenuProps> = ({ trackingCategory, pathname }) => {
  const direction = useScrollDirection();
  const [shouldOpenMenu, setShouldOpenMenu] = useState(false);
  const [enableMenuButton, setEnableMenuButton] = useState(true);
  const [startSearch, setStartSearch] = useState(false);

  const onStartAnimation = useCallback(
    () => setEnableMenuButton(false),
    [setEnableMenuButton],
  );
  const onFinishAnimation = useCallback(
    () => setEnableMenuButton(true),
    [setEnableMenuButton],
  );
  const changeMenuStatus = useCallback(
    (enableMenuButton: boolean, shouldOpenMenu: boolean) => {
      if (enableMenuButton) {
        setShouldOpenMenu(!shouldOpenMenu);
      }
    },
    [setShouldOpenMenu],
  );

  return (
    <>
      <MenuContainer
        $shouldOpenMenu={shouldOpenMenu}
        $shouldHide={direction === ScrollDirection.down}
        $delayOpenCloseMenuAnimation={shouldOpenMenu ? 0 : 0.4}
      >
        <NavBar>
          <MobileBlogHeaderContainer $hide={startSearch}>
            <MobileBlogHeader height={menuHeight} />
            {shouldOpenMenu && <Divider />}
          </MobileBlogHeaderContainer>
          <AnimatedNavBarItem
            label={"Home"}
            slug={"/"}
            selected={pathname === "/"}
            trackingAction={tracking.action.open_home}
            trackingCategory={trackingCategory}
            shouldOpenMenu={shouldOpenMenu}
            enterDelayAnimation={"0.3s"}
            exitDelayAnimation={"0.4s"}
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
            enterDelayAnimation={"0.4s"}
            exitDelayAnimation={"0.3s"}
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
            enterDelayAnimation={"0.5s"}
            exitDelayAnimation={"0.2s"}
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
            enterDelayAnimation={"0.6s"}
            exitDelayAnimation={"0.1s"}
            onStartAnimation={onStartAnimation}
            onFinishAnimation={onFinishAnimation}
          />
          {!startSearch && (
            <MenuButtonContainer>
              {!shouldOpenMenu && (
                <HamburgerMenu
                  onClick={() => {
                    if (!startSearch) {
                      changeMenuStatus(enableMenuButton, shouldOpenMenu);
                    }
                  }}
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
          )}
          {!shouldOpenMenu && (
            <Search startSearch={startSearch} setStartSearch={setStartSearch} />
          )}
        </NavBar>
      </MenuContainer>
      {(shouldOpenMenu || startSearch) && (
        <Overlay
          zIndex={250}
          delay={"0.4s"}
          onClick={() => {
            if (shouldOpenMenu) {
              setShouldOpenMenu(false);
            }
            if (startSearch) {
              setStartSearch(false);
            }
          }}
        />
      )}
    </>
  );
};
