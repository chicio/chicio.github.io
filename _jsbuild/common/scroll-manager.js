/*  */
import { isAMobileDevice } from './mobile-device-detector'

const disableScroll = () => {
  if (isAMobileDevice()) {
    changeHtmlOverflow('hidden')
    changeBodyPosition('fixed')
  }
}

const enableScroll = () => {
  changeHtmlOverflow('auto')
  changeBodyPosition('')
}

const changeHtmlOverflow = (newValue) => {
  let html = document.querySelector('html')
  if (html) {
    html.style.overflowY = newValue
  }
}

const changeBodyPosition = (newValue) => {
  let body = document.querySelector('body')
  if (body) {
    body.style.position = newValue
  }
}

export { disableScroll, enableScroll }
