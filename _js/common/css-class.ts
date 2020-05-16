const addCssClass = (element: HTMLElement, className: string): void => {
  if (element.classList) {
    element.classList.add(className)
  } else {
    element.className += ' ' + className
  }
}

const removeCssClass = (element: HTMLElement, className: string): void => {
  if (element.classList) {
    element.classList.remove(className)
  } else {
    element.className = element.className.replace(
      new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' '
    )
  }
}

export { addCssClass, removeCssClass }
