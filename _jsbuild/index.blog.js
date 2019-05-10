/*  */
import { cookieConsent } from './common/cookie-consent.js'
import { loadFont } from './common/load-font'
import { lazyLoadImages } from './common/lazy-load-images'

document.addEventListener('DOMContentLoaded', () => {
  loadFont()
  cookieConsent()
  lazyLoadImages('.blog-image')
})
