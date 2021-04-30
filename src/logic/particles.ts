import { textAbovePrimaryColor } from "../components/theme";
import { ISourceOptions } from "tsparticles";

export const useParticlesConfiguration: () => ISourceOptions = () => ({
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
});
