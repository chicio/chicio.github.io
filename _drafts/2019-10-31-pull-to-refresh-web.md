---
layout: post
title: "Tutorial: implement a pull to refresh for you web application"
description: "Implementing a pull to refresh component in vanilla js for your progressive web app (PWA) it's really easy. Let's do it now!"
date: 2019-11-20
image: /assets/images/posts/XXXXXX
tags: [pwa, web development, javascript]
comments: true
seo:
 - type: "BlogPosting"
authors: [fabrizio_duroni]
---

*Implementing a pull to refresh component in vanilla js for your progressive web app (PWA) it's really easy using cutting edge web technology (service worker, CSS new properties). Let's do it now!*

---

Some months ago I [transformed my website into a Progressive Web App]() (yes, the one you're reading now). By leveraging the power of service workers (and other some cool tricks that I will discuss in other posts :stuck_out_tongue_winking_eye:) my website page load time is below 50 milliseconds :open_mouth:. But with "the great power of service workers comes also great responsibility" (you remember [uncle Ben quote](https://www.google.com/search?q=from+great+power+comes+great+responsibility), right?), and one of this responsibility is let the user be able to refresh all the content whenever it wants (to check new/update stuff). Which is a mechanism/UX pattern that every user in the world already know for this kind of functionality? The [pull to refresh](https://en.wikipedia.org/wiki/Pull-to-refresh). The choice of this pattern is also a natural consequence of the fact that, as [I already told you previously in another post](), Progressive Web App are the technology that fill the gap between web and mobile native app. Unfortunately in the web development world there's not yet a standard component for pull to refresh. This is way in this post I will show you how to implement it from scratch without any JavaScript library/framework. I will only use vanilla JavaScript, HTML, CSS and the service worker *message* capability with `postMessage` and `MessageChannel` class. The pull to refresh described in this article is available on this site in all the blog pages (including this one, try it now!!! :smirk:)
Let's start from the implementation of the UI (HTML and CSS)

#### UI: HTML and CSS

You already know what we would like to achieve. The pull to refresh UI component should be something that appears at the top of the page when the user scroll beyond the page borders. At some point during the drag gesture the pull to refresh should stop itself from scrolling and show a loader that explain to the user that the content is reloading.
Let's start from the HTML. I added to the page structure a new div that will act as the container of the pull to refresh.
Inside it I added two other divs:

* one is used to show a loader/activity indicator that will start to rotate as soon as the user scroll to the maximum pull to refresh point (and as already explained above, at this point the reload of the content should have been started).

* the other one is used to show a message to the user that explaing to him/her what it is happening (this is a nice to have that I added because I liked it! :stuck_out_tongue_winking_eye:)

Below you can find the entire html code snippet.

```html
<div id="pull-to-refresh" class="pull-to-refresh start-pull hidden-pull">
    <div id="pull-to-refresh-loader" class="pull-to-refresh-loader"></div>
    <div id="pull-to-refresh-status" class="pull-to-refresh-status">
        Pull down to refresh
    </div>
</div>
```

Let's see what I did on the CSS side. The code reported below here is written in SASS (the XXXXX......), but you can easily transform it in plain CSS if you need. First of all there's a new CSS property used in the `html` rule: `overscroll-behavior-y`. This property let the developers change the browser behaviour when the user researches the edge of the page with a scroll gesture. This is a property supported by Chrome, Firefox and Opera (fuck you Safari!!! :XXXXX:). By setting it's value to `contains`, we can for example disable the native browser pull to refresh on Chrome and avoid the page bounce effect when the user starts to overflow the borders while dragging. Then I defined a property `pullable-content` that I used on the entire content of the page that I want to move in parallel with the pull to refresh. The next class is `pull-to-refresh` and contains all the styles needed to layout the pull to refresh in all its states. As you can see I defined all the animation I needed for this UI component here except for the translation applied while dragging that will be computed on the JavaScript side (because this are simple animation and [CSS is performant enough for this kind of animations](https://medium.com/outsystems-experts/how-to-achieve-60-fps-animations-with-css3-db7b98610108)). Last but not least I defined 2 classes to reset the pull to refresh layout status when the pull to refresh is started or has reached the end and starts the refresh of the content (they will be applied, like other contained here, with JavaScript DOM API).

```scss
html {
  overscroll-behavior-y: contain;
}

.pullable-content {
  margin-top: 10px
}

.pull-to-refresh {
  height: 100px; 
  background-color: $general-background; 
  margin-top: 55px;
  margin-bottom: 10px;
  box-shadow: inset 0px -2px 6px 1px $divider-color;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;

  &.visible-pull {
    visibility: visible;
  }
  
  &.hidden-pull {
    visibility: hidden;
  }
  
  .pull-to-refresh-status {
    font-weight: bold;
    font-size: 14px;
  }

  .pull-to-refresh-loader {
    border: 3px solid $primary-color-dark;
    border-top: 3px solid $primary-color-light;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    margin-bottom: 10px;
    opacity: 0;
  
    &.animate {
      animation: spin 1.25s linear infinite;
    }
  
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  }
}

.start-pull {
  transform: translateY(-100px); 
}

.end-pull {
  transform: translateY(-100px) !important;
  transition: 0.4s ease-in-out;
}
```

#### JavaScript

On the JavaScript side, I wrote the the pull to refresh widget as a standalone widget that export one single function `pullToRefresh()`. The first thing that this widget does is to check the browser support for service worker. Then it checks for some HTML component that are needed by the widget by using the `invariant` function. This HTML components are the loader, the loader message status and the content to be refreshed. The widget will throw an error if one of this HTML component is not present on the page where the it is instantiated.  
Then 3 new listener are attached to the 3 touches event on the entire document: `'touchstart'`, `'touchmove'` and `'touchend'`. In the `'touchstart'` ....

```javascript
import { sendMessageToServiceWorker } from '../common/service-worker'
import { addCssClass, removeCssClass } from '../common/css-class'
import { getTrackingClientId } from '../common/tracking'

const pullToRefresh = (trackingCategory) => {
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

  const isDraggingForPullToRefresh = (yMovement) => window.scrollY <= 0 && yMovement <= 0

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
        sendMessageToServiceWorker({ message: 'refresh', url: window.location.href, clientId: getTrackingClientId(), trackingCategory }).then(() => {
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

export { tryToActivatePullToRefresh }
```

Finally I instantiated the pull to refresh widget inside the blog main js file `index.blog.js` file. Below you can find the startup code for the pull to refresh widget inside a `load` event listener.

```javascript
import { pullToRefresh } from './blog/pull-to-refresh'

//...other code...

window.addEventListener('load', () => {
  //...other code...
  pullToRefresh(trackingCategory)
  //...other code...
})
```

#### Service Worker

```javascript
const sendMessageToServiceWorker = (message: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const messageChannel: MessageChannel = new MessageChannel()
    messageChannel.port1.onmessage = (event: MessageEvent) => {
      if (event.data) {
        if (event.data.error) {
          reject(event.data.error)
        } else {
          resolve(event.data)
        }
      }
    }
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage(message, ([messageChannel.port2]: any))
    }
  })
}
```

```javascript
//...other service worker code...

self.addEventListener('message', (event) => {
  const isARefresh = (event) => event.data.message === 'refresh'

  const createDeleteOperationFor = (url, siteCache, requests) => siteCache
    .delete(requests
    .find((request) => request.url === url))

  const createDeleteOperationsForImages = (siteCache, requests) => requests
    .filter((request) => request.url.endsWith('.jpg') && request.url.includes('posts'))
    .map((request) => siteCache.delete(request))

  const sendRefreshCompletedMessageToClient = (event) => event.ports[0].postMessage({refreshCompleted: true})

  if (isARefresh(event)) {
    caches.open(siteCacheName).then((siteCache) => {
      siteCache.keys().then((requests) => {
        const deleteRequestToBeRefreshed = createDeleteOperationFor(event.data.url, siteCache, requests)
        const deleteRequestsForImagesToBeRefreshed = createDeleteOperationsForImages(siteCache, requests)
        Promise.all([
          deleteRequestToBeRefreshed, 
          ...deleteRequestsForImagesToBeRefreshed, 
          sendAnalyticsEvent(event.data.clientId, '{{ site.data.tracking.action.pull_to_refresh }}', event.data.trackingCategory, '{{ site.data.tracking.label.body }}')
        ])
          .then(() => sendRefreshCompletedMessageToClient(event))
          .catch(() => sendRefreshCompletedMessageToClient(event))
      })
    }) 
  }
})

//...other service worker code...
```

#### Conclusion

As you can see, it is not too difficult to create a pull to refresh UX that almost matches the experience given by a mobile native app. Service Workers, modern CSS and HTML and vanilla JavaScript let you create beautiful native alike experience that can make you user fall in love with you web product before they install your app :heart: (or maybe they will just stick to your site because they hate mobile apps or because you hate mobile apps and you don't want to develop a new one :smiley:).

