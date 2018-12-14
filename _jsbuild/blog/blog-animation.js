import { TimelineMax } from 'gsap'
import { enableScroll } from '../common/scroll-manager'

const blogAnimation = () => {
  const showBlogTimeline = new TimelineMax({ delay: 0.2 })
  showBlogTimeline.to('#loader', 0.2, { opacity: 0 })
  showBlogTimeline.to('#loading-screen', 0.4, {
    xPercent: -100,
    onComplete: enableScroll
  }, '+=0.4')
}

export { blogAnimation }
