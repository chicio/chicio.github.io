import {TimelineMax} from "gsap";
import {cookieConsent} from './cookie-consent.js'
import {fontLoader} from "./font-loader";
import {isAMobileDevice} from "./mobile-device-detector";

$(document).ready(function () {
    cookieConsent();
    disableScroll();
    fontLoader(showBlog)
});

function disableScroll() {
    if (isAMobileDevice()) {
        $("html").css('overflow-y', 'hidden');
        $("body").css('position', 'fixed');
    }
}

function showBlog() {
    $(document).ready(function () {
        var showBlogTimeline = new TimelineMax({delay: 0.2});
        showBlogTimeline.to("#loader", 0.2, {opacity: 0});
        showBlogTimeline.to("#loading-screen", 0.4, {
            xPercent: -100, onComplete: function () {
                enableScroll()
            }
        }, "+=0.4");
    });
}

function enableScroll() {
    $("html").css('overflow-y', 'auto');
    $("body").css('position', '');
}
