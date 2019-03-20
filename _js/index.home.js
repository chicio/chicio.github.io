/* @flow */
import 'intersection-observer'
import { cookieConsent } from './common/cookie-consent'
import { loadFont } from './common/load-font'
import { enableScroll } from './common/scroll-manager'
import { tabs } from './home/tabs'
import { homeHeaderAnimation } from './home/home-header-animation'
import { lazyLoadImages } from './common/lazy-load-images'
import { lazyLoadImageAnimation } from './common/lazy-load-image-animation'

document.addEventListener('DOMContentLoaded', () => {
  loadFont()
  cookieConsent()
  homeHeaderAnimation()
  enableScroll()
  tabs()
  lazyLoadImages('.profile-image, .who-am-i-icon, .project-image, .timeline-image', (image: Element) => lazyLoadImageAnimation(image, 0.2))
})
