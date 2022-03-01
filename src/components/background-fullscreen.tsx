import React from "react";
import Particles from "react-tsparticles";
import { useParticlesConfiguration } from "../logic/particles";
import { ContainerFullscreen } from "./design-system/atoms/container-fullscreen";
import styled from "styled-components";

const BackgroundContainer = styled(ContainerFullscreen)`
  position: absolute;

  & canvas {
    width: 100% !important;
    height: 100% !important;
    z-index: 0 !important;
    top: 0 !important;
    left: 0 !important;
    position: absolute;
    pointer-events: initial;
  }
`;

export const BackgroundFullScreen: React.FC = () => {
  const particlesConfiguration = useParticlesConfiguration();

  return (
    <BackgroundContainer>
      <Particles
        className={"tsparticles"}
        options={particlesConfiguration}
      />
    </BackgroundContainer>
  );
};
