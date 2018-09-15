import { cookieConsent } from './cookie-consent.js'
import { loadFont } from './load-font'
import { disableScroll } from './scroll-manager'
import { blogAnimation } from './blog-animation'

document.addEventListener('DOMContentLoaded', () => {
  loadFont(blogAnimation)
  cookieConsent()
  disableScroll()
})
