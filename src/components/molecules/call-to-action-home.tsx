import styled from "styled-components";
import { CallToActionInternal } from "../atoms/call-to-action-internal";
import React from "react";

const CallToAction = styled(CallToActionInternal)`
  font-size: ${(props) => props.theme.fontSizes[2]};
`;

interface CallToActionHomeProps {
  onClick: () => void;
}

export const CallToActionHome: React.FC<CallToActionHomeProps> = () => (
  <CallToAction to={"/"}>Homepage</CallToAction>
);
