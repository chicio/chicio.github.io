declare global {
  interface Window {
    disqus_config: () => void;
  }
}

const loadDisqus = (element: HTMLElement, observer: IntersectionObserver): void => {
  observer.unobserve(element)
  const s = document.createElement('script')
  s.src = 'https://fabrizio-duroni.disqus.com/embed.js'
  s.setAttribute('data-timestamp', `${+new Date()}`)
  if (document.body) {
    document.body.appendChild(s)
  }
}

const onIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void => {
  for (let i = 0; i < entries.length; i++) {
    if (entries[i].intersectionRatio > 0) {
      loadDisqus((entries[i].target as HTMLElement), observer)
    }
  }
}

interface DisqusConfig {
  page: {
    url: string;
    identifier: string;
  };
}

const disqus = (): void => {
  window.disqus_config = (): DisqusConfig => ({
    page: {
      url: window.location.href,
      identifier: window.location.href
    }
  })
  const intersectionObserver: IntersectionObserver = new IntersectionObserver(
    onIntersection,
    { rootMargin: '100px 0px', threshold: 0.01 }
  )
  const disquisThread = document.getElementById('disqus_thread')
  if (disquisThread) {
    intersectionObserver.observe(disquisThread)
  }
}

export { disqus }
