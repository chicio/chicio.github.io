import { Scene, SceneConfig } from "scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap";

declare module "scrollmagic" {
  declare export class Controller {
    constructor(): Controller;
  }

  declare export default class ScrollMagic {
    static Controller(): Controller;
    static Scene(config: SceneConfig): Scene;
  }
}
