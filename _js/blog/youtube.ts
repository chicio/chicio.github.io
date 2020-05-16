const loadYoutube = (element: HTMLElement, observer: IntersectionObserver): void => {
  observer.unobserve(element)
  const youtubeiFrame = document.createElement('iframe')
  youtubeiFrame.setAttribute('src', 'http://google.com/')
  youtubeiFrame.setAttribute('height', '480')
  youtubeiFrame.setAttribute('width', '700')
  youtubeiFrame.setAttribute('frameborder', '0')
  youtubeiFrame.setAttribute('allowfullscreen', '')
  youtubeiFrame.setAttribute('allow', 'autoplay; encrypted-media')
  youtubeiFrame.setAttribute('src', `https://www.youtube.com/embed/${element.dataset.videoId}`)
  element.appendChild(youtubeiFrame)
}

const onIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void => {
  for (let i = 0; i < entries.length; i++) {
    if (entries[i].intersectionRatio > 0) {
      loadYoutube((entries[i].target as HTMLElement), observer)
    }
  }
}

const youtube = (): void => {
  const intersectionObserver: IntersectionObserver = new IntersectionObserver(
    onIntersection,
    { rootMargin: '50px 0px', threshold: 0.01 }
  )
  const videos: NodeList = document.querySelectorAll('.youtube')
  for (let i = 0; i < videos.length; i++) {
    intersectionObserver.observe((videos[i] as Element))
  }
}

export { youtube }
