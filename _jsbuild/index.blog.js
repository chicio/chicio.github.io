import { cookieConsent } from './common/cookie-consent.js'
import { loadFont } from './common/load-font'
import { disableScroll } from './common/scroll-manager'
import { blogAnimation } from './blog/blog-animation'

document.addEventListener('DOMContentLoaded', () => {
  loadFont(blogAnimation)
  cookieConsent()
  disableScroll()
})
