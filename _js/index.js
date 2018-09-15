import { cookieConsent } from './cookie-consent'
import { loadFont } from './load-font'
import { enableScroll } from './scroll-manager'
import { tabs } from './tabs'
import { homeHeaderAnimation } from './home-header-animation'
import { whoIAmAnimation } from './whoIAmAnimation'

document.addEventListener('DOMContentLoaded', () => {
  loadFont()
  cookieConsent()
  homeHeaderAnimation()
  enableScroll()
  tabs()
  whoIAmAnimation()
})
