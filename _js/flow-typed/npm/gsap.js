declare module "gsap" {
  declare export class TweenLite {
    static to(target: any, duration: number, vars: any): TweenLite;
  }

  declare export class TweenMax {
    static to(target: any, duration: number, vars: any): TweenMax;
  }
}