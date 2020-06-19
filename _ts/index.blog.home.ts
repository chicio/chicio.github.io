import { cookieConsent } from './common/cookie-consent'
import { lazyLoadImages } from './common/lazy-load-images'
import { pullToRefresh } from './blog/pull-to-refresh'
import { registerToServicerWorker } from './common/service-worker'

document.addEventListener('DOMContentLoaded', () => {
  lazyLoadImages('.blog-image')
})

window.addEventListener('load', () => {
  registerToServicerWorker()
  cookieConsent()
  pullToRefresh()
})
