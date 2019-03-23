/* @flow */
import 'intersection-observer'
import { removeCssClass } from './css-class'

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
  const src: string = image.dataset.src
  fetchImage(src).then(() => {
    image.src = src
    removeCssClass(image, 'lazy')
    loadCompleted(image)
  })
}

const fetchImage = (src: string) => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = src
    image.onload = resolve
    image.onerror = reject
  })
}

export { lazyLoadImages }
