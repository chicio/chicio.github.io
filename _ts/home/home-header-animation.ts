import { animation } from '../common/animation'

const homeHeaderAnimation = (): void => {
  animation('center-content', 'show')
  animation('center-content-buttons', 'show')
  animation('down-arrow', 'show')
}

export { homeHeaderAnimation }
