/*  */
import WebFont from 'webfontloader'

const loadFont = (finish) => {
  WebFont.load({
    google: { families: ['Open Sans'] },
    active: finish ? finish() : undefined,
    inactive: finish ? finish() : undefined
  })
}

export { loadFont }
