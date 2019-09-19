/*  */
import { sendMessageToServiceWorker } from '../common/service-worker'
import { addCssClass, removeCssClass } from '../common/css-class'

const pullToRefresh = () => {
  if (!('serviceWorker' in navigator)) {
    return
  }

  const pullToRefreshElement = document.querySelector('#pull-to-refresh')
  const pullToRefreshStatusElement = document.querySelector('#pull-to-refresh-status')
  const pullToRefreshLoaderElement = document.querySelector('#pull-to-refresh-loader')
  const pullableContent = document.querySelector('.pullable-content')

  invariant(pullToRefreshElement instanceof HTMLElement)
  invariant(pullToRefreshStatusElement instanceof HTMLElement)
  invariant(pullToRefreshLoaderElement instanceof HTMLElement)
  invariant(pullableContent instanceof HTMLElement)

  const pullToRefreshElementHeight = pullToRefreshElement.offsetHeight
  const pullToRefreshStatusRepository = createPullToRefreshStatusRepository()
  const decelerationFactor = 0.5
  let dragStartPoint = createTouchCoordinates(0, 0)

  const dragUpdate = (dragMovement, pullToRefreshLoaderOpacity) => {
    pullToRefreshElement.style.transform = `translateY(${dragMovement}px)`
    pullableContent.style.transform = `translateY(${dragMovement}px)`
    pullToRefreshLoaderElement.style.opacity = `${pullToRefreshLoaderOpacity}`
  }

  const isDraggingForPullToRefresh = (yMovement) => {
    const scrollY = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
    return scrollY === 0 && yMovement <= 0
  }

  const closePullToRefresh = () => {
    addCssClass(pullToRefreshElement, 'end-pull')
    addCssClass(pullableContent, 'end-pull')
    pullToRefreshElement.style.transform = ''
    pullableContent.style.transform = ''
    pullToRefreshLoaderElement.style.opacity = '0'
  }

  const preparePullToRefreshToStart = () => {
    addCssClass(pullToRefreshElement, 'start-pull')
    removeCssClass(pullToRefreshElement, 'end-pull')
    addCssClass(pullableContent, 'start-pull')
    removeCssClass(pullableContent, 'end-pull')
  }

  const showPullToRefresh = () => {
    addCssClass(pullToRefreshElement, 'visible-pull')
    removeCssClass(pullToRefreshElement, 'hidden-pull')
  }

  const setRefreshingStatus = () => {
    pullToRefreshStatusElement.innerHTML = 'Refreshing'
    addCssClass(pullToRefreshLoaderElement, 'animate')
  }

  const isPullToRefreshDragCompleted = (yAbsoluteMovement) => yAbsoluteMovement >= pullToRefreshElementHeight

  const setRefreshStatusCompleted = () => {
    pullToRefreshStatusElement.innerHTML = 'Refresh completed'
    addCssClass(pullToRefreshElement, 'hidden-pull')
    removeCssClass(pullToRefreshElement, 'visible-pull')
  }

  const resetPullToRefreshStatus = () => {
    pullToRefreshStatusElement.innerHTML = 'Pull down to refresh'
    removeCssClass(pullToRefreshLoaderElement, 'animate')
  }

  document.addEventListener('touchstart', (event) => {
    dragStartPoint = getTouchesCoordinatesFrom(event)
    preparePullToRefreshToStart()
  }, { passive: false })

  document.addEventListener('touchmove', (event) => {
    const dragCurrentPoint = getTouchesCoordinatesFrom(event)
    const yMovement = (dragStartPoint.y - dragCurrentPoint.y) * decelerationFactor
    const yAbsoluteMovement = Math.abs(yMovement)

    if (isDraggingForPullToRefresh(yMovement) && !pullToRefreshStatusRepository.refreshStarted) {
      event.preventDefault()
      event.stopPropagation()
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

const createTouchCoordinates = (x, y) => ({ x, y })

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

const invariant = (statement) => {
  if (!statement) {
    throw new Error('Pull to refresh invariant failed')
  }
}

const getTouchesCoordinatesFrom = (event) => {
  return createTouchCoordinates(
    event.targetTouches[0].screenX,
    event.targetTouches[0].screenY
  )
}

export { pullToRefresh }
