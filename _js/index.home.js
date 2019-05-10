/* @flow */
import { cookieConsent } from './common/cookie-consent'
import { loadFont } from './common/load-font'
import { lazyLoadImages } from './common/lazy-load-images'
import { tabs } from './home/tabs'
import { homeHeaderAnimation } from './home/home-header-animation'
import { scene3D } from './home/scene-3D'

document.addEventListener('DOMContentLoaded', () => {
  loadFont()
  cookieConsent()
  tabs()
  lazyLoadImages('.profile-image, .who-am-i-icon, .project-image, .timeline-image')
  homeHeaderAnimation()
  scene3D()
})
