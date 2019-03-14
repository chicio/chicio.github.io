/*  */
import 'intersection-observer'
import { TweenLite } from 'gsap'
import { cookieConsent } from './common/cookie-consent'
import { loadFont } from './common/load-font'
import { enableScroll } from './common/scroll-manager'
import { tabs } from './home/tabs'
import { homeHeaderAnimation } from './home/home-header-animation'
import { removeCssClass } from './common/css-class'

document.addEventListener('DOMContentLoaded', () => {
  loadFont()
  cookieConsent()
  homeHeaderAnimation()
  enableScroll()
  tabs()
  lazyLoadImages('.who-am-i-icon, .project-image, .timeline-image')
})

const lazyLoadImages = (selector) => {
  const intersectionObserver = new IntersectionObserver(onIntersection, { rootMargin: '50px 0px', threshold: 0.01 })
  document.querySelectorAll(selector).forEach(image => intersectionObserver.observe(image))
}

const onIntersection = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      observer.unobserve(entry.target)
      loadImage(entry.target)
    }
  })
}

const loadImage = (image) => {
  const src = image.dataset.src
  fetchImage(src).then(() => {
    image.src = src
    removeCssClass(image, 'lazy')
    TweenLite.from(image, 0.3, {
      opacity: 0
    })
  })
}

const fetchImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = url
    image.onload = resolve
    image.onerror = reject
  })
}
