/* @flow */
import { TweenLite } from 'gsap'

const lazyLoadImageAnimation = (image: Element, delay: number): void => {
  TweenLite.from(image, 0.3, {
    opacity: 0,
    delay
  })
}

export { lazyLoadImageAnimation }
