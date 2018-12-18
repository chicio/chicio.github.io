/* @flow */
import { TweenLite, TweenMax } from 'gsap'
import { scene3D } from './scene-3D'

const homeHeaderAnimation = () => {
  hideLoaderAnimation(() => {
    profileAnimation(() => {
      scene3D()
    })
  })
}

const hideLoaderAnimation = (completionFunction: () => void) => {
  TweenLite.to('#loader', 0.3, {
    opacity: 0,
    onComplete: completionFunction
  })
}

const profileAnimation = (completeFunction: () => void) => {
  TweenMax.to('.center-content', 0.5, {
    opacity: 1,
    onComplete: completeFunction
  })
  downArrowAnimation()
}

const downArrowAnimation = () => {
  TweenMax.to('#down-arrow', 0.5, {
    opacity: 1
  })
}

export { homeHeaderAnimation }
