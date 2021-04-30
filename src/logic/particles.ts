import { textAbovePrimaryColor } from "../components/theme";
import { ISourceOptions } from "tsparticles";
import { useIsPowerfulDevice } from "./device";
import { isDesktop, isMobile } from "react-device-detect";

export const useParticlesConfiguration: () => ISourceOptions = () => {
  const isPowerfulDevice = useIsPowerfulDevice();

  return {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: isPowerfulDevice ? 60 : 30,
    interactivity: {
      detectsOn: "canvas",
      events: {
        onHover: {
          enable: isDesktop,
          mode: "repulse",
        },
      },
      modes: {
        repulse: {
          distance: isMobile ? 100 : 150,
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
        distance: isMobile ? 100 : 150,
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
  };
};
