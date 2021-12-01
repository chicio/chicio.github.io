import React from "react";
import Particles from "react-tsparticles";
import { useParticlesConfiguration } from "../logic/particles";
import { ContainerFullscreen } from "./design-system/atoms/container-fullscreen";
import styled from "styled-components";

const BackgroundContainer = styled(ContainerFullscreen)`
  position: absolute;

  & canvas {
    position: absolute !important;
  }
`;

export const BackgroundFullScreen: React.FC = () => {
  const particlesConfiguration = useParticlesConfiguration();

  return (
    <BackgroundContainer>
      <Particles className={"tsparticles"} options={particlesConfiguration} />
    </BackgroundContainer>
  );
};
