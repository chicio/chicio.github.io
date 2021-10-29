import * as React from "react";
import { Icon } from "../atoms/icon";
import styled from "styled-components";
import { ChevronDown } from "styled-icons/boxicons-regular";

const IconContainer = styled(Icon)`
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing[10]};
`;

export const DownArrow: React.FC = () => (
  <IconContainer>
    <ChevronDown size={50} title={"Github"} />
  </IconContainer>
);
