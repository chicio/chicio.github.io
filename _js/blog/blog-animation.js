/* @flow */
import { TweenLite } from 'gsap'
import { enableScroll } from '../common/scroll-manager'
import { addCssClass } from '../common/css-class'

const blogAnimation = (): void => {
  TweenLite.to('#loading-screen', 0.3, {
    opacity: 0,
    onComplete: onCompleteAnimation,
    delay: 0.5
  })
}

const onCompleteAnimation = () => {
  addCssClass(document.getElementById('loading-screen'), 'd-none')
  enableScroll()
}

export { blogAnimation }
