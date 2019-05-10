/* @flow */
import { cookieConsent } from './common/cookie-consent'
import { loadFont } from './common/load-font'
import { tabs } from './home/tabs'
import { homeHeaderAnimation } from './home/home-header-animation'
import { lazyLoadImages } from './common/lazy-load-images'

document.addEventListener('DOMContentLoaded', () => {
  loadFont()
  cookieConsent()
  homeHeaderAnimation()
  tabs()
  lazyLoadImages('.profile-image, .who-am-i-icon, .project-image, .timeline-image')
})
