import * as React from "react";
import { Icon } from "../atoms/icon";
import styled from "styled-components";
import { ChevronDown } from "styled-icons/boxicons-regular";
import { bounce } from "../utils-css/bounce-keyframes";

const IconContainer = styled(Icon)`
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing[10]};
  z-index: 100;
  animation: ${bounce} 1600ms infinite cubic-bezier(0.445, 0.05, 0.55, 0.95);
`;

export const DownArrow: React.FC = () => (
  <IconContainer>
    <ChevronDown size={50} title={"Github"} />
  </IconContainer>
);
