import { Icon } from "../atoms/icon";
import { Menu } from "@styled-icons/boxicons-regular/Menu";
import React from "react";

interface HamburgerMenuProps {
  onClick: () => void;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ onClick }) => (
  <Icon>
    <Menu size={35} onClick={onClick} />
  </Icon>
);
