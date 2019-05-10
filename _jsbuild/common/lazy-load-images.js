/*  */
import 'intersection-observer'
import { addCssClass, removeCssClass } from './css-class'

const lazyLoadImages = (selector) => {
  const intersectionObserver = new IntersectionObserver(
    onIntersection,
    { rootMargin: '50px 0px', threshold: 0.01 }
  )
  document.querySelectorAll(selector).forEach(image => intersectionObserver.observe(image))
}

const onIntersection = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      observer.unobserve(entry.target)
      eventuallyLoadImage(entry.target)
    }
  })
}

const eventuallyLoadImage = (element) => {
  if (element instanceof HTMLImageElement) {
    loadImage(element)
  }
}

const loadImage = (image) => {
  image.src = image.dataset.src
  image.onload = () => {
    removeCssClass(image, 'lazy')
    addCssClass(image, 'lazy-show')
  }
}

export { lazyLoadImages }
