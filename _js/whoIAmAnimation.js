import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap'
import { TimelineLite, Elastic } from 'gsap'
import ScrollMagic from 'scrollmagic'

const whoIAmAnimation = () => {
  const scrollMagicScene = whoIAmScrollMagicScene(
    createTimeLineWhoIAm(getRandomSortedIcons(), () => scrollMagicScene.destroy())
  )
}

const getRandomSortedIcons = () => {
  const whoIAmIcons = Array.from(document.querySelectorAll('.who-am-i-icon'))
  whoIAmIcons.sort(function () {
    return 0.5 - Math.random()
  })
  return whoIAmIcons
}

const createTimeLineWhoIAm = (randomSortedIcons, completeFunction) => {
  const whoIAmTimeline = new TimelineLite({ onComplete: completeFunction })
  whoIAmTimeline.staggerFrom(randomSortedIcons, 1, {
    opacity: 0,
    scale: 0,
    ease: Elastic.easeInOut
  }, 0.1)
  return whoIAmTimeline
}

const whoIAmScrollMagicScene = (tween) => {
  return new ScrollMagic.Scene({
    triggerElement: '#who-am-i-description'
  }).setTween(tween).addTo(new ScrollMagic.Controller())
}

export { whoIAmAnimation }
