"use strict";
exports.__esModule = true;
var cookie_consent_1 = require("./common/cookie-consent");
var lazy_load_images_1 = require("./common/lazy-load-images");
var pull_to_refresh_1 = require("./blog/pull-to-refresh");
var service_worker_1 = require("./common/service-worker");
document.addEventListener('DOMContentLoaded', function () {
    lazy_load_images_1.lazyLoadImages('.blog-image');
});
window.addEventListener('load', function () {
    service_worker_1.registerToServicerWorker();
    cookie_consent_1.cookieConsent();
    pull_to_refresh_1.pullToRefresh();
});
