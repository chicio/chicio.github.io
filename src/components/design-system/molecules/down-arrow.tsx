import * as React from "react";
import { Icon } from "../atoms/icon";
import styled from "styled-components";
import { ChevronDown } from "styled-icons/boxicons-regular";

const IconContainer = styled(Icon)`
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing[2]};
`;

export const DownArrow: React.FC = () => (
  <IconContainer>
    <ChevronDown size={30} title={"Github"} />
  </IconContainer>
);
