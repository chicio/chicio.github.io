/* @flow */
import 'intersection-observer'
import { addCssClass, removeCssClass } from './css-class'

const lazyLoadImages = (selector: string, loadCompleted: (image: HTMLImageElement) => void) => {
  const intersectionObserver: IntersectionObserver = new IntersectionObserver(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => onIntersection(entries, observer, loadCompleted),
    { rootMargin: '50px 0px', threshold: 0.01 }
  )
  document.querySelectorAll(selector).forEach(image => intersectionObserver.observe(image))
}

const onIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver, loadCompleted: (image: HTMLImageElement) => void) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      observer.unobserve(entry.target)
      eventuallyLoadImage(entry.target, loadCompleted)
    }
  })
}

const eventuallyLoadImage = (element: HTMLElement, loadCompleted: (image: HTMLImageElement) => void) => {
  if (element instanceof HTMLImageElement) {
    loadImage(element, loadCompleted)
  }
}

const loadImage = (image: HTMLImageElement, loadCompleted: (image: HTMLImageElement) => void) => {
  image.src = image.dataset.src
  image.onload = () => {
    removeCssClass(image, 'lazy')
    addCssClass(image, 'lazy-show')
  }
}

export { lazyLoadImages }
