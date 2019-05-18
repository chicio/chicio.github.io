/* @flow */
const disqus = () => {
  window.disqus_config = function () {
    this.page.url = window.location.href
    this.page.identifier = window.location.href
  }
  const intersectionObserver: IntersectionObserver = new IntersectionObserver(
    loadDisqus,
    { rootMargin: '250px 0px', threshold: 0.01 }
  )
  const disquisThread = document.getElementById('disqus_thread')
  if (disquisThread) {
    intersectionObserver.observe(disquisThread)
  }
}

const loadDisqus = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
  observer.unobserve(entries[0].target)
  const s = document.createElement('script')
  s.src = 'https://fabrizio-duroni.disqus.com/embed.js'
  s.setAttribute('data-timestamp', `${+new Date()}`)
  if (document.body) {
    document.body.appendChild(s)
  }
}

export { disqus }
