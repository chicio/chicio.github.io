/*  */
const youtube = () => {
  const intersectionObserver = new IntersectionObserver(
    onIntersection,
    { rootMargin: '50px 0px', threshold: 0.01 }
  )
  const videos = document.querySelectorAll('.youtube')
  for (let i = 0; i < videos.length; i++) {
    intersectionObserver.observe(videos[i])
  }
}

const onIntersection = (entries, observer) => {
  for (let i = 0; i < entries.length; i++) {
    if (entries[i].intersectionRatio > 0) {
      loadYoutube(entries[i].target, observer)
    }
  }
}

const loadYoutube = (element, observer) => {
  observer.unobserve(element)
  var youtubeiFrame = document.createElement('iframe')
  youtubeiFrame.setAttribute('src', 'http://google.com/')
  youtubeiFrame.setAttribute('height', '480')
  youtubeiFrame.setAttribute('width', '700')
  youtubeiFrame.setAttribute('frameborder', '0')
  youtubeiFrame.setAttribute('allowfullscreen', '')
  youtubeiFrame.setAttribute('allow', 'autoplay; encrypted-media')
  youtubeiFrame.setAttribute('src', `https://www.youtube.com/embed/${element.dataset.videoId}`)
  element.appendChild(youtubeiFrame)
}

export { youtube }
