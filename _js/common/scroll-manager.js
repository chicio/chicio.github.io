/* @flow */
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

const changeHtmlOverflow = (newValue: string) => {
  let html: ?HTMLHtmlElement = document.querySelector('html')
  if (html) {
    html.style.overflowY = newValue
  }
}

const changeBodyPosition = (newValue: string) => {
  let body: ?HTMLBodyElement = document.querySelector('body')
  if (body) {
    body.style.position = newValue
  }
}

export { disableScroll, enableScroll }
