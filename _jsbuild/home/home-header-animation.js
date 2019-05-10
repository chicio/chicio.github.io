/*  */
import { scene3D } from './scene-3D'
import { addCssClass } from '../common/css-class'

const homeHeaderAnimation = () => {
  animation('loader', 'hide')
  animation('center-content', 'show')
  animation('center-content-buttons', 'show')
  animation('down-arrow', 'show')
  scene3D()
}

const animation = (elementId, animation) => {
  const element = document.getElementById(elementId)
  if (element) {
    addCssClass(element, animation)
  }
}

export { homeHeaderAnimation }
