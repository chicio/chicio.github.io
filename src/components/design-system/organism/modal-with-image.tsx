import styled from "styled-components";
import { CallToActionExternal } from "../atoms/call-to-action-external";
import * as React from "react";
import { opacity } from "../../opacity-keyframes";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 400;
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;
  animation: ${opacity} 0.25s linear 0.25s;
  animation-fill-mode: forwards;
`;

const ModalContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 100%;
  max-width: 100%;
  width: 700px;
  height: 700px;
  z-index: 400;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: ${(props) => props.theme.spacing[4]};
  opacity: 0;
  animation: ${opacity} 0.25s linear 0.25s;
  animation-fill-mode: forwards;
`;

const ModalImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: contain;
`;

export interface ModalWithImageProps {
  imageUrl: string;
  imageAlt: string;
  onClick: () => void;
}

export const ModalWithImage: React.FC<ModalWithImageProps> = ({
  imageUrl,
  imageAlt,
  onClick,
}) => (
  <>
    <ModalOverlay onClick={onClick} />
    <ModalContainer>
      <ModalImage src={imageUrl} alt={imageAlt} />
      <CallToActionExternal onClick={onClick}>Close</CallToActionExternal>
    </ModalContainer>
  </>
);
