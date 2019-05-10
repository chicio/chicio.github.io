/* @flow */
import { scene3D } from './scene-3D'
import { addCssClass } from '../common/css-class'

const homeHeaderAnimation = (): void => {
  animation('loader', 'hide')
  animation('center-content', 'show')
  animation('center-content-buttons', 'show')
  animation('down-arrow', 'show')
  scene3D()
}

const animation = (elementId: string, animation: string): void => {
  const element = document.getElementById(elementId)
  if (element) {
    addCssClass(element, animation)
  }
}

export { homeHeaderAnimation }
