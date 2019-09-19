/* @flow */
import 'intersection-observer'
import { addCssClass, removeCssClass } from './css-class'

const lazyLoadImages = (selector: string): void => {
  const intersectionObserver: IntersectionObserver = new IntersectionObserver(
    onIntersection,
    { rootMargin: '50px 0px', threshold: 0.01 }
  )
  const images: NodeList<HTMLElement> = document.querySelectorAll(selector)
  for (let i: number = 0; i < images.length; i++) {
    intersectionObserver.observe(images[i])
  }
}

const onIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void => {
  for (let i: number = 0; i < entries.length; i++) {
    if (entries[i].intersectionRatio > 0) {
      eventuallyLoadImage(entries[i].target, observer)
    }
  }
}

const eventuallyLoadImage = (element: HTMLElement, observer: IntersectionObserver): void => {
  if (element instanceof HTMLImageElement) {
    loadImage(element, observer)
  }
}

const loadImage = (image: HTMLImageElement, observer: IntersectionObserver): void => {
  const placeholderUrl: string = image.src
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
