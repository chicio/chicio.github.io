import { cookieConsent } from './common/cookie-consent'
import { lazyLoadImages } from './common/lazy-load-images'
import { tabs } from './home/tabs'
import { homeHeaderAnimation } from './home/home-header-animation'
import { registerToServicerWorker } from './common/service-worker'
import { scene3D } from './home/scene-3D'

document.addEventListener('DOMContentLoaded', () => {
  tabs()
  lazyLoadImages('.who-am-i-icon, .project-image, .timeline-image')
})

window.addEventListener('load', () => {
  registerToServicerWorker()
  homeHeaderAnimation()
  scene3D()
  cookieConsent()
})
