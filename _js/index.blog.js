/* @flow */
import { cookieConsent } from './common/cookie-consent.js'
import { loadFont } from './common/load-font'
import { disableScroll } from './common/scroll-manager'
import { blogAnimation } from './blog/blog-animation'
import { lazyLoadImages } from './common/lazy-load-images'
import { lazyLoadImageAnimation } from './common/lazy-load-image-animation'

document.addEventListener('DOMContentLoaded', () => {
  loadFont(blogAnimation)
  cookieConsent()
  disableScroll()
  lazyLoadImages('.blog-image', (image: Element) => lazyLoadImageAnimation(image, 0.5))
})
