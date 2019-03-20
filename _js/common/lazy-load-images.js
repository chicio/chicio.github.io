/* @flow */
import 'intersection-observer'
import { removeCssClass } from './css-class'

const lazyLoadImages = (selector: string, loadCompleted: (image: Element) => void) => {
  const intersectionObserver: IntersectionObserver = new IntersectionObserver(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => onIntersection(entries, observer, loadCompleted),
    { rootMargin: '50px 0px', threshold: 0.01 }
  )
  document.querySelectorAll(selector).forEach(image => intersectionObserver.observe(image))
}

const onIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver, loadCompleted: (image: Element) => void) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      observer.unobserve(entry.target)
      loadImage(entry.target, loadCompleted)
    }
  })
}

const loadImage = (image: Element, loadCompleted: () => void) => {
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
