import { Animation } from "gsap"

declare module "scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap" {
  declare export type SceneConfig = {
    triggerElement: string;
  }

  declare export class Scene {
    constructor(config: SceneConfig): Scene;
    setTween(tweenObject: Animation | string, duration?: number | any, params?: any, parentScene?: Scene): Scene;
  }
}