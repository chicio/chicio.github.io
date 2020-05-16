import 'intersection-observer'
import { addCssClass, removeCssClass } from './css-class'

const loadImage = (image: HTMLImageElement, observer: IntersectionObserver): void => {
  const placeholderUrl: string = image.src
  image.src = image.dataset.src
  image.onload = (): void => {
    if (image.src !== placeholderUrl) {
      observer.unobserve(image)
      removeCssClass(image, 'lazy')
      addCssClass(image, 'lazy-show')
    }
  }
  image.onerror = (): void => {
    image.src = placeholderUrl
  }
}

const eventuallyLoadImage = (element: HTMLElement, observer: IntersectionObserver): void => {
  if (element instanceof HTMLImageElement) {
    loadImage(element, observer)
  }
}

const onIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void => {
  for (let i = 0; i < entries.length; i++) {
    if (entries[i].intersectionRatio > 0) {
      eventuallyLoadImage((entries[i].target as HTMLElement), observer)
    }
  }
}

const lazyLoadImages = (selector: string): void => {
  const intersectionObserver: IntersectionObserver = new IntersectionObserver(
    onIntersection,
    { rootMargin: '50px 0px', threshold: 0.01 }
  )
  const images: NodeList = document.querySelectorAll(selector)
  for (let i = 0; i < images.length; i++) {
    intersectionObserver.observe((images[i] as Element))
  }
}

export { lazyLoadImages }
