/*  */
import { TweenLite } from 'gsap'

const lazyLoadImageAnimation = (image, delay) => {
  TweenLite.from(image, 0.3, {
    opacity: 0,
    delay
  })
}

export { lazyLoadImageAnimation }
