import {Elastic, TimelineLite, TweenLite, TweenMax} from "gsap";
import ScrollMagic from 'scrollmagic';
import "scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap"
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import {cookieConsent} from './cookie-consent'
import {fontLoader} from './font-loader';
import {isAMobileDevice} from "./mobile-device-detector";
import {enableScroll} from "./scroll-manager";
import {scene3D} from "./scene-3D";
import {tabs} from "./tabs";

document.addEventListener("DOMContentLoaded", () => {
    cookieConsent();
    startHeaderAnimation(isAMobileDevice());
    fontLoader();
    enableScroll();
    tabs();
    whoIAmAnimation();
});

const resizeViewport = (isMobile) => {
    if (isMobile === true) {
        const bg = $("#profile-introduction, #rendering-surface, canvas");
        $(window).resize(() => bg.height($(window).height() + 60));
        bg.height($(window).height() + 60);
    }
};

function profileAnimation(completeFunction) {
    TweenMax.to(".center-content", 0.5, {
        opacity: 1,
        onComplete: completeFunction
    });
    downArrowAnimation();
}

function whoIAmAnimation() {
    const controller = new ScrollMagic.Controller();
    const whoAmIIconsRandomed = getRandomSortedIcons();
    const whoAmITimeline = createTimeLineWhoIAm(whoAmIIconsRandomed, "#who-am-i-description", function () {
        sceneWhoAmI.destroy();
    });
    const sceneWhoAmI = createScrollMagicScene(controller, "#who-am-i-description", whoAmITimeline);
}

function getRandomSortedIcons() {
    const whoIAmIcons = Array.from(document.querySelectorAll(".who-am-i-icon"));
    whoIAmIcons.sort(function () {
        return 0.5 - Math.random()
    });
    return whoIAmIcons;
}

function createTimeLineWhoIAm(whoIAmIconsRandomed, idWhoIAmDescription, completeFunction) {
    var whoIAmTimeline = new TimelineLite({onComplete: completeFunction});
    whoIAmTimeline.staggerFrom(whoIAmIconsRandomed, 1, {
        opacity: 0,
        scale: 0,
        ease: Elastic.easeInOut
    }, 0.1);
    return whoIAmTimeline;
}

function createScrollMagicScene(controller, idElementTrigger, tween) {
    return new ScrollMagic.Scene({
        triggerElement: idElementTrigger
    }).setTween(tween).addTo(controller);
}

function downArrowAnimation() {
    TweenMax.to("#down-arrow", 0.5, {
        opacity: 1
    });
}

function hideLoaderAnimation(completionFunction) {
    TweenLite.to("#loader", 0.3, {
        opacity: 0,
        onComplete: completionFunction
    });
}

function startHeaderAnimation(isMobileDevice) {
    hideLoaderAnimation(function () {
        resizeViewport(isMobileDevice);
        profileAnimation(function () {
            scene3D();
        });
    });
}

