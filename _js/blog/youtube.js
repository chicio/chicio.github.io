/* @flow */
const youtube = () => {
  const intersectionObserver: IntersectionObserver = new IntersectionObserver(
    onIntersection,
    { rootMargin: '50px 0px', threshold: 0.01 }
  )
  const images: NodeList<HTMLElement> = document.querySelectorAll("youtube")
  for (let i: number = 0; i < images.length; i++) {
    intersectionObserver.observe(images[i])
  }
}

const onIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void => {
  for (let i: number = 0; i < entries.length; i++) {
    if (entries[i].intersectionRatio > 0) {
      loadYoutube(entries[i].target, observer)
    }
  }
}

const loadYoutube = (element: HTMLElement, observer: IntersectionObserver) => {
  observer.unobserve(element)
  //TODO.. implement frame creation and append it.
}

export { disqus }
