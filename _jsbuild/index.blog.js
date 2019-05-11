/*  */
import { cookieConsent } from './common/cookie-consent.js'
import { lazyLoadImages } from './common/lazy-load-images'

document.addEventListener('DOMContentLoaded', () => {
  cookieConsent()
  lazyLoadImages('.blog-image')
})
