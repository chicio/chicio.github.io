import * as React from "react";
import { Icon } from "../atoms/icon";
import { ChevronDown } from "@styled-icons/fa-solid";
import styled from "styled-components";

const IconContainer = styled(Icon)`
  text-align: center;
`;

export const DownArrow: React.FC = () => (
  <IconContainer>
    <ChevronDown size={30} title={"Github"} />
  </IconContainer>
);
