/* @flow */
import { TweenLite } from 'gsap'
import { removeCssClass } from './css-class'

const lazyLoadImages = (selector: string) => {
  const intersectionObserver = new IntersectionObserver(onIntersection, { rootMargin: '50px 0px', threshold: 0.01 })
  document.querySelectorAll(selector).forEach(image => intersectionObserver.observe(image))
}

const onIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      observer.unobserve(entry.target)
      loadImage(entry.target)
    }
  })
}

const loadImage = (image) => {
  const src = image.dataset.src
  fetchImage(src).then(() => {
    image.src = src
    removeCssClass(image, 'lazy')
    TweenLite.from(image, 0.3, {
      opacity: 0
    })
  })
}

const fetchImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = url
    image.onload = resolve
    image.onerror = reject
  })
}

export { lazyLoadImages }
