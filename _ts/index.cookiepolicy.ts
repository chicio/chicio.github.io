import { cookieConsent } from './common/cookie-consent'
import { registerToServicerWorker } from './common/service-worker'

window.addEventListener('load', () => {
  registerToServicerWorker()
  cookieConsent()
})
