/*  */
import WebFont from 'webfontloader'

const loadFont = () => {
  WebFont.load({
    google: { families: ['Open Sans'] },
    active: () => {
      sessionStorage.setItem('font', 'installed')
    }
  })
}

export { loadFont }
