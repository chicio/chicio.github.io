/* @flow */
import { sendMessageToServiceWorker } from '../common/service-worker'
import { addCssClass, removeCssClass } from '../common/css-class'

const pullToRefresh = (): void => {
  if (!('serviceWorker' in navigator)) {
    return
  }

  const pullToRefreshElement: ?HTMLElement = document.querySelector('#pull-to-refresh')
  const pullToRefreshStatusElement: ?HTMLElement = document.querySelector('#pull-to-refresh-status')
  const pullToRefreshLoaderElement: ?HTMLElement = document.querySelector('#pull-to-refresh-loader')
  const pullableContent: ?HTMLElement = document.querySelector('.pullable-content')

  invariant(pullToRefreshElement instanceof HTMLElement)
  invariant(pullToRefreshStatusElement instanceof HTMLElement)
  invariant(pullToRefreshLoaderElement instanceof HTMLElement)
  invariant(pullableContent instanceof HTMLElement)

  const pullToRefreshElementHeight: number = pullToRefreshElement.offsetHeight
  const pullToRefreshStatusRepository = createPullToRefreshStatusRepository()
  let dragStartPoint = createTouchCoordinates(0, 0)

  const dragUpdate = (dragMovement: number, pullToRefreshLoaderOpacity: number): void => {
    pullToRefreshElement.style.transform = `translateY(${dragMovement}px)`
    pullableContent.style.transform = `translateY(${dragMovement}px)`
    pullToRefreshLoaderElement.style.opacity = `${pullToRefreshLoaderOpacity}`
  }

  const isDraggingForPullToRefresh = (yMovement: number): boolean => window.scrollY <= 0 && yMovement <= 0

  const closePullToRefresh = (): void => {
    addCssClass(pullToRefreshElement, 'end-pull')
    addCssClass(pullableContent, 'end-pull')
    pullToRefreshElement.style.transform = ''
    pullableContent.style.transform = ''
    pullToRefreshLoaderElement.style.opacity = '0'
  }

  const preparePullToRefreshToStart = (): void => {
    addCssClass(pullToRefreshElement, 'start-pull')
    removeCssClass(pullToRefreshElement, 'end-pull')
    addCssClass(pullableContent, 'start-pull')
    removeCssClass(pullableContent, 'end-pull')
  }

  const showPullToRefresh = (): void => {
    addCssClass(pullToRefreshElement, 'visible-pull')
    removeCssClass(pullToRefreshElement, 'hidden-pull')
  }

  const setRefreshingStatus = (): void => {
    pullToRefreshStatusElement.innerHTML = 'Refreshing'
    addCssClass(pullToRefreshLoaderElement, 'animate')
  }

  const isPullToRefreshDragCompleted = (yAbsoluteMovement: number): boolean => yAbsoluteMovement >= pullToRefreshElementHeight

  const setRefreshStatusCompleted = (): void => {
    pullToRefreshStatusElement.innerHTML = 'Refresh completed'
    addCssClass(pullToRefreshElement, 'hidden-pull')
    removeCssClass(pullToRefreshElement, 'visible-pull')
  }

  const resetPullToRefreshStatus = (): void => {
    pullToRefreshStatusElement.innerHTML = 'Pull down to refresh'
    removeCssClass(pullToRefreshLoaderElement, 'animate')
  }

  document.addEventListener('touchstart', (event: TouchEvent) => {
    dragStartPoint = getTouchesCoordinatesFrom(event)
    preparePullToRefreshToStart()
  }, { passive: false })

  document.addEventListener('touchmove', (event: TouchEvent) => {
    const dragCurrentPoint = getTouchesCoordinatesFrom(event)
    const yMovement: number = dragStartPoint.y - dragCurrentPoint.y
    const yAbsoluteMovement: number = Math.abs(yMovement)

    if (isDraggingForPullToRefresh(yMovement) && !pullToRefreshStatusRepository.refreshStarted) {
      event.preventDefault()
      showPullToRefresh()

      if (isPullToRefreshDragCompleted(yAbsoluteMovement)) {
        pullToRefreshStatusRepository.startRefresh()
        dragUpdate(0, 1)
        setRefreshingStatus()
        sendMessageToServiceWorker({ message: 'refresh', url: window.location.href }).then((data) => {
          pullToRefreshStatusRepository.completeRefresh()
          setTimeout(() => {
            setRefreshStatusCompleted()
            closePullToRefresh()
          }, 1500)
        })
      } else {
        dragUpdate(yAbsoluteMovement - pullToRefreshElementHeight, yAbsoluteMovement / pullToRefreshElementHeight)
      }
    }
  }, { passive: false })

  document.addEventListener('touchend', () => {
    if (!pullToRefreshStatusRepository.refreshStarted) {
      closePullToRefresh()
    }
  }, { passive: false })

  pullToRefreshElement.addEventListener('transitionend', () => {
    if (pullToRefreshStatusRepository.refreshCompleted) {
      window.location.reload()
    } else {
      resetPullToRefreshStatus()
    }
  })
}

const createTouchCoordinates = (x: number, y: number): {x: number, y: number} => ({ x, y })

const createPullToRefreshStatusRepository = () => ({
  refreshStarted: false,
  refreshCompleted: false,
  startRefresh () {
    this.refreshStarted = true
  },
  completeRefresh () {
    this.refreshCompleted = true
  }
})

const invariant = (statement: boolean) => {
  if (!statement) {
    throw new Error('Pull to refresh invariant failed')
  }
}

const getTouchesCoordinatesFrom = (event: TouchEvent): {x: number, y: number} => {
  return createTouchCoordinates(
    event.targetTouches[0].screenX,
    event.targetTouches[0].screenY
  )
}

export { pullToRefresh }
