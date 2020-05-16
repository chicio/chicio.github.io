import { addCssClass } from '../common/css-class'

const animation = (elementId: string, animation: string): void => {
  const element = document.getElementById(elementId)
  if (element) {
    addCssClass(element, animation)
  }
}

export { animation }
