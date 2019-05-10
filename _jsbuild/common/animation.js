/*  */
import { addCssClass } from '../common/css-class'

const animation = (elementId, animation) => {
  const element = document.getElementById(elementId)
  if (element) {
    addCssClass(element, animation)
  }
}

export { animation }
