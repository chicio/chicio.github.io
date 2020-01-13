/*  */
const disqus = () => {
  window.disqus_config = function () {
    this.page.url = window.location.href
    this.page.identifier = window.location.href
  }
  const intersectionObserver = new IntersectionObserver(
    onIntersection,
    { rootMargin: '100px 0px', threshold: 0.01 }
  )
  const disquisThread = document.getElementById('disqus_thread')
  if (disquisThread) {
    intersectionObserver.observe(disquisThread)
  }
}

const onIntersection = (entries, observer) => {
  for (let i = 0; i < entries.length; i++) {
    if (entries[i].intersectionRatio > 0) {
      loadDisqus(entries[i].target, observer)
    }
  }
}

const loadDisqus = (element, observer) => {
  observer.unobserve(element)
  const s = document.createElement('script')
  s.src = 'https://fabrizio-duroni.disqus.com/embed.js'
  s.setAttribute('data-timestamp', `${+new Date()}`)
  if (document.body) {
    document.body.appendChild(s)
  }
}

export { disqus }
