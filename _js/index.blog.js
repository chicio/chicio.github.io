/* @flow */
import { cookieConsent } from './common/cookie-consent.js'
import { lazyLoadImages } from './common/lazy-load-images'
import { disqus } from './blog/disqus'
import { pullToRefresh } from './blog/pull-to-refresh.js'

window.ChicioCodingBlog = {
  init: (trackingCategory: string) => {
    document.addEventListener('DOMContentLoaded', () => {
      lazyLoadImages('.blog-image')
    })
    window.addEventListener('load', () => {
      cookieConsent()
      disqus()
      pullToRefresh(trackingCategory)
    })
  }
}
