import { addCssClass, removeCssClass } from './css-class'

const loadImage = (image: HTMLImageElement, observer: IntersectionObserver): void => {
  const placeholderUrl: string = image.src
  image.src = image.dataset.src as string
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

const startLazyLoad = (selector: string): void => {
  const intersectionObserver: IntersectionObserver = new IntersectionObserver(
    onIntersection,
    { rootMargin: '50px 0px', threshold: 0.01 }
  )
  const images: NodeList = document.querySelectorAll(selector)
  for (let i = 0; i < images.length; i++) {
    intersectionObserver.observe((images[i] as Element))
  }
}

const lazyLoadImages = (selector: string): void => {
  if ('IntersectionObserver' in window &&
  'IntersectionObserverEntry' in window &&
  'intersectionRatio' in window.IntersectionObserverEntry.prototype &&
  'isIntersecting' in window.IntersectionObserverEntry.prototype) {
    startLazyLoad(selector)
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: intersection observer polifyll doesn't have types available
    import(/* webpackChunkName: "intersection-observer" */ 'intersection-observer').then(() => startLazyLoad())
  }
}

export { lazyLoadImages }