import { FC } from "react";
import Particles from "react-tsparticles";
import { useParticlesConfiguration } from "../logic/particles";
import { ContainerFullscreen } from "./design-system/atoms/container-fullscreen";
import styled from "styled-components";
import { loadFull } from "tsparticles";
import { Engine } from "tsparticles-engine";

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

export const BackgroundFullScreen: FC = () => {
  const particlesConfiguration = useParticlesConfiguration();
  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  return (
    <BackgroundContainer>
      <Particles
        className={"tsparticles"}
        init={particlesInit}
        options={particlesConfiguration}
      />
    </BackgroundContainer>
  );
};
