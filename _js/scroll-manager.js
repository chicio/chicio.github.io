import {isAMobileDevice} from "./mobile-device-detector";

const disableScroll = () => {
    if (isAMobileDevice()) {
        $("html").css('overflow-y', 'hidden');
        $("body").css('position', 'fixed');
    }
};

const enableScroll = () => {
    $("html").css('overflow-y', 'auto');
    $("body").css('position', '');
};

export {disableScroll, enableScroll}

