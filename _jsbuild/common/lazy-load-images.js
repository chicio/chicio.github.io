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
      loadImage(entry.target, loadCompleted)
    }
  })
}

const loadImage = (image, loadCompleted) => {
  const src = image.dataset.src
  fetchImage(src).then(() => {
    image.src = src
    removeCssClass(image, 'lazy')
    loadCompleted(image)
  })
}

const fetchImage = (src) => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = src
    image.onload = resolve
    image.onerror = reject
  })
}

export { lazyLoadImages }
