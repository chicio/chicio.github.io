import {TimelineMax} from "gsap";
import {cookieConsent} from './cookie-consent.js'
import {fontLoader} from "./font-loader";
import {disableScroll, enableScroll} from "./scroll-manager";

$(document).ready(() => {
    cookieConsent();
    disableScroll();
    fontLoader(showBlog)
});

const showBlog = () => {
    const showBlogTimeline = new TimelineMax({delay: 0.2});
    showBlogTimeline.to("#loader", 0.2, {opacity: 0});
    showBlogTimeline.to("#loading-screen", 0.4, {
        xPercent: -100,
        onComplete: enableScroll
    }, "+=0.4");
};
