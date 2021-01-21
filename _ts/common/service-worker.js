"use strict";
exports.__esModule = true;
exports.isServiceWorkerSupported = exports.registerToServicerWorker = exports.sendMessageToServiceWorker = void 0;
var workbox_window_1 = require("workbox-window");
var wb = new workbox_window_1.Workbox('/sw.js');
var isServiceWorkerSupported = function () { return ('serviceWorker' in navigator); };
exports.isServiceWorkerSupported = isServiceWorkerSupported;
var registerToServicerWorker = function () {
    if (isServiceWorkerSupported()) {
        wb.register()
            .then(function () { console.log('Service Worker registration completed'); })["catch"](function (err) { console.error('Service Worker registration failed:', err); });
    }
};
exports.registerToServicerWorker = registerToServicerWorker;
var sendMessageToServiceWorker = function (message) {
    return new Promise(function (resolve, reject) {
        wb.messageSW(message).then(function (event) {
            if (event.data) {
                if (event.data.error) {
                    reject(event.data.error);
                }
                else {
                    resolve(event.data);
                }
            }
        });
    });
};
exports.sendMessageToServiceWorker = sendMessageToServiceWorker;
