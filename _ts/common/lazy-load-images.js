"use strict";
exports.__esModule = true;
exports.lazyLoadImages = void 0;
var css_class_1 = require("./css-class");
var loadImage = function (image, observer) {
    var placeholderUrl = image.src;
    image.src = image.dataset.src;
    image.onload = function () {
        if (image.src !== placeholderUrl) {
            observer.unobserve(image);
            css_class_1.removeCssClass(image, 'lazy');
            css_class_1.addCssClass(image, 'lazy-show');
        }
    };
    image.onerror = function () {
        image.src = placeholderUrl;
    };
};
var eventuallyLoadImage = function (element, observer) {
    if (element instanceof HTMLImageElement) {
        loadImage(element, observer);
    }
};
var onIntersection = function (entries, observer) {
    for (var i = 0; i < entries.length; i++) {
        if (entries[i].intersectionRatio > 0) {
            eventuallyLoadImage(entries[i].target, observer);
        }
    }
};
var startLazyLoad = function (selector) {
    var intersectionObserver = new IntersectionObserver(onIntersection, { rootMargin: '50px 0px', threshold: 0.01 });
    var images = document.querySelectorAll(selector);
    for (var i = 0; i < images.length; i++) {
        intersectionObserver.observe(images[i]);
    }
};
var isIntersectionObserverSupported = function () {
    return 'IntersectionObserver' in window &&
        'IntersectionObserverEntry' in window &&
        'intersectionRatio' in window.IntersectionObserverEntry.prototype &&
        'isIntersecting' in window.IntersectionObserverEntry.prototype;
};
var lazyLoadImages = function (selector) {
    if (isIntersectionObserverSupported()) {
        startLazyLoad(selector);
    }
    else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: intersection observer polifyll doesn't have types available
        Promise.resolve().then(function () { return require(/* webpackChunkName: "intersection-observer" */ 'intersection-observer'); }).then(function () { return startLazyLoad(selector); });
    }
};
exports.lazyLoadImages = lazyLoadImages;
