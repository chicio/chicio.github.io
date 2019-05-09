/* @flow */
import WebFont from 'webfontloader'
import { addCssClass } from './css-class'

const loadFont = (finish: ?(() => void)): void => {
  if (sessionStorage.getItem('fonts') === 'installed' && document.documentElement != null) {
    addCssClass(document.documentElement, 'wf-active')
  } else {
    WebFont.load({
      google: { families: ['Open Sans'] },
      active: () => {
        sessionStorage.setItem('fonts', 'installed')
        if (finish !== null) {
          finish()
        }
      },
      inactive: finish ? finish() : undefined
    })
  }
}

export { loadFont }
