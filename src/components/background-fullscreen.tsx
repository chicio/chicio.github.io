import React from "react";
import Particles from "react-tsparticles";
import { textAbovePrimaryColor } from "./theme";
import { useHardwareConcurrency, useMemoryStatus } from "react-adaptive-hooks";
import { isSafari, isDesktop } from "react-device-detect";

export const BackgroundFullScreen: React.FC = () => {
  const { deviceMemory } = useMemoryStatus({ deviceMemory: 4 });
  const { numberOfLogicalProcessors } = useHardwareConcurrency();

  return (
    <div>
      {((isSafari && isDesktop) ||
        (isDesktop &&
          deviceMemory >= 8 &&
          numberOfLogicalProcessors != null &&
          numberOfLogicalProcessors >= 8)) && (
        <Particles
          id="tsparticles"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
          options={{
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 60,
            interactivity: {
              detectsOn: "canvas",
              events: {
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
              },
              modes: {
                repulse: {
                  distance: 150,
                  duration: 0.5,
                },
              },
            },
            particles: {
              color: {
                value: textAbovePrimaryColor,
              },
              links: {
                enable: true,
                color: textAbovePrimaryColor,
                blink: true,
                distance: 150,
                opacity: 0.5,
                width: 1,
              },
              collisions: {
                enable: false,
                mode: "bounce",
              },
              move: {
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: false,
                speed: 3,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  value_area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                random: true,
                value: 3,
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </div>
  );
};
