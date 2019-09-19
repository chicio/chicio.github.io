/*  */
import 'intersection-observer'
import { addCssClass, removeCssClass } from './css-class'

const lazyLoadImages = (selector) => {
  const intersectionObserver = new IntersectionObserver(
    onIntersection,
    { rootMargin: '50px 0px', threshold: 0.01 }
  )
  const images = document.querySelectorAll(selector)
  for (let i = 0; i < images.length; i++) {
    intersectionObserver.observe(images[i])
  }
}

const onIntersection = (entries, observer) => {
  for (let i = 0; i < entries.length; i++) {
    if (entries[i].intersectionRatio > 0) {
      eventuallyLoadImage(entries[i].target, observer)
    }
  }
}

const eventuallyLoadImage = (element, observer) => {
  if (element instanceof HTMLImageElement) {
    loadImage(element, observer)
  }
}

const loadImage = (image, observer) => {
  const placeholderUrl = image.src
  image.src = image.dataset.src
  image.onload = () => {
    if (image.src !== placeholderUrl) {
      observer.unobserve(image)
      removeCssClass(image, 'lazy')
      addCssClass(image, 'lazy-show')
    }
  }
  image.onerror = () => {
    image.src = placeholderUrl
  }
}

export { lazyLoadImages }
