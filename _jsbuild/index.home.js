/*       */
import { cookieConsent } from './common/cookie-consent'
import { loadFont } from './common/load-font'
import { enableScroll } from './common/scroll-manager'
import { tabs } from './home/tabs'
import { homeHeaderAnimation } from './home/home-header-animation'
import { whoIAmAnimation } from './home/whoIAmAnimation'

document.addEventListener('DOMContentLoaded', () => {
  loadFont()
  cookieConsent()
  homeHeaderAnimation()
  enableScroll()
  tabs()
  whoIAmAnimation()
})
