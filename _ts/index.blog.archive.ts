import { cookieConsent } from './common/cookie-consent'
import { pullToRefresh } from './blog/pull-to-refresh'
import { registerToServicerWorker } from './common/service-worker'

window.addEventListener('load', () => {
  registerToServicerWorker()
  cookieConsent()
  pullToRefresh()
})
