import { Icon } from "../atoms/icon";
import { X } from "@styled-icons/boxicons-regular/X";
import React from "react";

interface CloseProps {
  onClick: () => void;
}

export const Close: React.FC<CloseProps> = ({ onClick }) => (
  <Icon>
    <X size={35} onClick={onClick} />
  </Icon>
);
