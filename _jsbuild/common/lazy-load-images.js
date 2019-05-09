/*  */
import 'intersection-observer'
import { removeCssClass } from './css-class'

const lazyLoadImages = (selector, loadCompleted) => {
  const intersectionObserver = new IntersectionObserver(
    (entries, observer) => onIntersection(entries, observer, loadCompleted),
    { rootMargin: '50px 0px', threshold: 0.01 }
  )
  document.querySelectorAll(selector).forEach(image => intersectionObserver.observe(image))
}

const onIntersection = (entries, observer, loadCompleted) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      observer.unobserve(entry.target)
      eventuallyLoadImage(entry.target, loadCompleted)
    }
  })
}

const eventuallyLoadImage = (element, loadCompleted) => {
  if (element instanceof HTMLImageElement) {
    loadImage(element, loadCompleted)
  }
}

const loadImage = (image, loadCompleted) => {
  image.src = image.dataset.src
  image.onload = () => {
    removeCssClass(image, 'lazy')
    loadCompleted(image)
  }
}

export { lazyLoadImages }
