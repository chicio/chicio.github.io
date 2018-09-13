import {isAMobileDevice} from "./mobile-device-detector";

const disableScroll = () => {
    if (isAMobileDevice()) {
        document.querySelector("html").style.overflowY = "hidden";
        document.querySelector("body").style.position = "fixed";
    }
};

const enableScroll = () => {
    document.querySelector("html").style.overflowY = "auto";
    document.querySelector("body").style.position = "";
};

export {disableScroll, enableScroll}
