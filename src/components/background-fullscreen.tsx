import React from "react";
import Particles from "react-tsparticles";
import { useIsPowerfulMobileDevice } from "../logic/device";
import { isDesktop } from "react-device-detect";
import { useParticlesConfiguration } from "../logic/particles";

export const BackgroundFullScreen: React.FC = () => {
  const isPowerfulMobileDevice = useIsPowerfulMobileDevice();
  const particlesConfiguration = useParticlesConfiguration();

  return (
    <div>
      {(isDesktop || isPowerfulMobileDevice) && (
        <Particles
          id="tsparticles"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
          options={particlesConfiguration}
        />
      )}
    </div>
  );
};
