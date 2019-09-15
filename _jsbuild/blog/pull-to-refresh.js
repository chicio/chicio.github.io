
const pullToRefresh = () => {
  if (!('serviceWorker' in navigator)) {
    return
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

  const pullToRefreshElement = document.querySelector('#pull-to-refresh')
  const pullToRefreshElementHeight = pullToRefreshElement.offsetHeight
  const pullToRefreshStatusElement = document.querySelector('#pull-to-refresh-status')
  const pullToRefreshLoaderElement = document.querySelector('#pull-to-refresh-loader')
  const pullableContent = document.querySelector('.pullable-content')
  const pullToRefreshStatusRepository = createPullToRefreshStatusRepository()
  let dragStartPoint = createTouchCoordinates(0, 0)

  const sendMessageToServiceWoker = (message) => {
    return new Promise((resolve, reject) => {
      const messageChannel = new MessageChannel()
      messageChannel.port1.onmessage = (event) => {
        if (event.data.error) {
          reject(event.data.error)
        } else {
          resolve(event.data)
        }
      }
      navigator.serviceWorker.controller.postMessage(message, [messageChannel.port2])
    })
  }

  const getTouchesCoordinatesFrom = (event) => {
    if (event.targetTouches && event.targetTouches.length) {
      return createTouchCoordinates(
        event.targetTouches[0].screenX,
        event.targetTouches[0].screenY
      )
    } else {
      return createTouchCoordinates(
        event.screenX,
        event.screenY
      )
    }
  }

  const dragUpdate = (dragMovement, pullToRefreshLoaderOpacity) => {
    pullToRefreshElement.style.transform = `translateY(${dragMovement}px)`
    pullableContent.style.transform = `translateY(${dragMovement}px)`
    pullToRefreshLoaderElement.style.opacity = pullToRefreshLoaderOpacity
  }

  const isDraggingForPullToRefresh = (yMovement) => window.scrollY <= 0 && yMovement <= 0

  const closePullToRefresh = () => {
    pullToRefreshElement.classList.add('end-pull')
    pullableContent.classList.add('end-pull')
    pullToRefreshElement.style.transform = ``
    pullableContent.style.transform = ``
    pullToRefreshLoaderElement.style.opacity = 0
  }

  const preparePullToRefreshToStart = () => {
    pullToRefreshElement.classList.add('start-pull')
    pullToRefreshElement.classList.remove('end-pull')
    pullableContent.classList.add('start-pull')
    pullableContent.classList.remove('end-pull')
  }

  const showPullToRefresh = () => {
    pullToRefreshElement.classList.add('visible-pull')
    pullToRefreshElement.classList.remove('hidden-pull')
  }

  const setRefreshingStatus = () => {
    pullToRefreshStatusElement.innerHTML = 'Refreshing'
    pullToRefreshLoaderElement.classList.add('animate')
  }

  const isPullToRefreshDragCompleted = (yAbsoluteMovement) => yAbsoluteMovement >= pullToRefreshElementHeight

  const setRefreshStatusCompleted = () => {
    pullToRefreshStatusElement.innerHTML = 'Refresh completed'
    pullToRefreshElement.classList.add('hidden-pull')
    pullToRefreshElement.classList.remove('visible-pull')
  }

  const resetPullToRefreshStatus = () => {
    pullToRefreshStatusElement.innerHTML = 'Pull down to refresh'
    pullToRefreshLoaderElement.classList.remove('animate')
  }

  document.addEventListener('touchstart', (e) => {
    dragStartPoint = getTouchesCoordinatesFrom(e)
    preparePullToRefreshToStart()
  }, { passive: false })

  document.addEventListener('touchmove', (e) => {
    const dragCurrentPoint = getTouchesCoordinatesFrom(e)
    const yMovement = dragStartPoint.y - dragCurrentPoint.y
    const yAbsoluteMovement = Math.abs(yMovement)

    if (isDraggingForPullToRefresh(yMovement) && !pullToRefreshStatusRepository.refreshStarted) {
      e.preventDefault()
      showPullToRefresh()

      if (isPullToRefreshDragCompleted(yAbsoluteMovement)) {
        pullToRefreshStatusRepository.startRefresh()
        dragUpdate(0, 1)
        setRefreshingStatus()
        sendMessageToServiceWoker({ message: 'refresh', url: window.location.href }).then((data) => {
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

export { pullToRefresh }
