import WebFont from "webfontloader";

const fontLoader = (finish) => {
    WebFont.load({
        google: {families: ['Open Sans']},
        active: finish ? finish() : undefined,
        inactive: finish ? finish() : undefined
    });
};

export {fontLoader};
