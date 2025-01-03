import styled, { TransientProps } from "styled-components";
import { CallToActionExternal } from "../atoms/call-to-action-external";
import { FC } from "react";
import { opacity } from "../utils-css/opacity-keyframes";
import { Overlay } from "../atoms/overlay";

const zIndex = 400;

interface ModalContainerProps {
  zIndex: number;
}

const ModalContainer = styled.div<TransientProps<ModalContainerProps>>`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 100%;
  max-width: 100%;
  width: 700px;
  height: 700px;
  z-index: ${(props) => props.$zIndex};
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

export const ModalWithImage: FC<ModalWithImageProps> = ({
  imageUrl,
  imageAlt,
  onClick,
}) => (
  <>
    <Overlay zIndex={zIndex} onClick={onClick} delay={"0.25s"} />
    <ModalContainer $zIndex={zIndex}>
      <ModalImage src={imageUrl} alt={imageAlt} />
      <CallToActionExternal onClick={onClick}>Close</CallToActionExternal>
    </ModalContainer>
  </>
);
