import React from "react";
import Particles from "react-tsparticles";
import { useParticlesConfiguration } from "../logic/particles";

export const BackgroundFullScreen: React.FC = () => {
  const particlesConfiguration = useParticlesConfiguration();

  return (
    <Particles
      id="tsparticles"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
      }}
      options={particlesConfiguration}
    />
  );
};
