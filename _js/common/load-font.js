/* @flow */
import WebFont from 'webfontloader'

const loadFont = (): void => {
  WebFont.load({
    google: { families: ['Open Sans'] },
    active: () => {
      sessionStorage.setItem('font', 'installed')
    }
  })
}

export { loadFont }
