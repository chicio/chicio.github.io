declare module "gsap" {
  declare export class Animation { }

  declare export class TweenLite extends Animation {
    static to(target: any, duration: number, vars: any): TweenLite;
    static from(target: any, duration: number, vars: any): TweenLite;
  }

  declare export class TweenMax extends Animation {
    static to(target: any, duration: number, vars: any): TweenMax;
  }

  declare export class TimelineMax extends Animation {
    constructor(vars?: {}): TimelineMax;
    to(target: any, duration: number, vars: any, position?: any): TimelineLite;
  }

  declare export class TimelineLite extends Animation {
    constructor(vars?: {}): TimelineLite;
    staggerFrom(
      targets: any,
      duration: number,
      vars: {},
      stagger?: number,
      position?: any,
      onCompleteAll?: () => void,
      onCompleteAllParams?: any[],
      onCompleteScope?: any
    ): TimelineLite;
  }

  declare export class Ease {
    constructor(func?: () => void, extraParams?: any[], type?: number, power?: number): Ease;
    getRatio(p: number): number;
  }

  declare export class Elastic extends Ease {
    static easeIn: Elastic;
    static easeInOut: Elastic;
    static easeOut: Elastic;
    config(amplitude: number, period: number): Elastic;
  }
}
