/* @flow */
import { isAMobileDevice } from './mobile-device-detector'

const disableScroll = (): void => {
  if (isAMobileDevice()) {
    changeHtmlOverflow('hidden')
    changeBodyPosition('fixed')
  }
}

const enableScroll = (): void => {
  changeHtmlOverflow('auto')
  changeBodyPosition('')
}

const changeHtmlOverflow = (newValue: string): void => {
  let html: ?HTMLHtmlElement = document.querySelector('html')
  if (html) {
    html.style.overflowY = newValue
  }
}

const changeBodyPosition = (newValue: string): void => {
  let body: ?HTMLBodyElement = document.querySelector('body')
  if (body) {
    body.style.position = newValue
  }
}

export { disableScroll, enableScroll }
