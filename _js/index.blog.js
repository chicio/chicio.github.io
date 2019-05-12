/* @flow */
import { cookieConsent } from './common/cookie-consent.js'
import { lazyLoadImages } from './common/lazy-load-images'

document.addEventListener('DOMContentLoaded', () => {
  lazyLoadImages('.blog-image')
})

window.addEventListener('load', () => {
  cookieConsent()
})
