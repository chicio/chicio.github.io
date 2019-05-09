/*  */
import { cookieConsent } from './common/cookie-consent.js'
import { loadFont } from './common/load-font'
import { lazyLoadImages } from './common/lazy-load-images'
import { lazyLoadImageAnimation } from './common/lazy-load-image-animation'

document.addEventListener('DOMContentLoaded', () => {
  loadFont()
  cookieConsent()
  lazyLoadImages('.blog-image', (image) => lazyLoadImageAnimation(image, 0.5))
})
