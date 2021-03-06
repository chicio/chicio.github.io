import { cookieConsent } from './common/cookie-consent'
import { lazyLoadImages } from './common/lazy-load-images'
import { disqus } from './blog/disqus'
import { pullToRefresh } from './blog/pull-to-refresh'
import { registerToServicerWorker } from './common/service-worker'
import { youtube } from './blog/youtube'

document.addEventListener('DOMContentLoaded', () => {
  lazyLoadImages('.blog-image')
})

window.addEventListener('load', () => {
  registerToServicerWorker()
  cookieConsent()
  pullToRefresh()
  youtube()
  disqus()
})
