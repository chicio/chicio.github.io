"use strict";
exports.__esModule = true;
exports.pullToRefresh = void 0;
var service_worker_1 = require("../common/service-worker");
var css_class_1 = require("../common/css-class");
var service_worker_2 = require("../common/service-worker");
var areAllAvailable = function (pullToRefreshElement, pullToRefreshStatusElement, pullToRefreshLoaderElement, pullableContent) { return (pullToRefreshElement != null ||
    pullToRefreshStatusElement != null ||
    pullToRefreshLoaderElement != null ||
    pullableContent != null); };
var createPullToRefreshStatusRepository = function () { return ({
    refreshStarted: false,
    refreshCompleted: false,
    startRefresh: function () {
        this.refreshStarted = true;
    },
    completeRefresh: function () {
        this.refreshCompleted = true;
    }
}); };
var createTouchCoordinates = function (x, y) { return ({ x: x, y: y }); };
var getTouchesCoordinatesFrom = function (event) {
    return createTouchCoordinates(event.targetTouches[0].screenX, event.targetTouches[0].screenY);
};
var startPullToRefresh = function (pullToRefreshElement, pullToRefreshStatusElement, pullToRefreshLoaderElement, pullableContent) {
    var pullToRefreshElementHeight = 100;
    var pullToRefreshStatusRepository = createPullToRefreshStatusRepository();
    var decelerationFactor = 0.5;
    var dragStartPoint = createTouchCoordinates(0, 0);
    var dragUpdate = function (dragMovement, pullToRefreshLoaderOpacity) {
        pullToRefreshElement.style.transform = "translateY(" + dragMovement + "px)";
        pullableContent.style.transform = "translateY(" + dragMovement + "px)";
        pullToRefreshLoaderElement.style.opacity = "" + pullToRefreshLoaderOpacity;
    };
    var isDraggingForPullToRefresh = function (yMovement) { return window.scrollY <= 0 && yMovement <= 0; };
    var closePullToRefresh = function () {
        css_class_1.addCssClass(pullToRefreshElement, 'end-pull');
        css_class_1.addCssClass(pullableContent, 'end-pull');
        pullToRefreshElement.style.transform = '';
        pullableContent.style.transform = '';
        pullToRefreshLoaderElement.style.opacity = '0';
    };
    var preparePullToRefreshToStart = function () {
        css_class_1.addCssClass(pullToRefreshElement, 'start-pull');
        css_class_1.removeCssClass(pullToRefreshElement, 'end-pull');
        css_class_1.addCssClass(pullableContent, 'start-pull');
        css_class_1.removeCssClass(pullableContent, 'end-pull');
    };
    var showPullToRefresh = function () {
        css_class_1.addCssClass(pullToRefreshElement, 'visible-pull');
        css_class_1.removeCssClass(pullToRefreshElement, 'hidden-pull');
    };
    var setRefreshingStatus = function () {
        pullToRefreshStatusElement.innerHTML = 'Refreshing';
        css_class_1.addCssClass(pullToRefreshLoaderElement, 'animate');
    };
    var isPullToRefreshDragCompleted = function (yAbsoluteMovement) { return yAbsoluteMovement >= pullToRefreshElementHeight; };
    var setRefreshStatusCompleted = function () {
        pullToRefreshStatusElement.innerHTML = 'Refresh completed';
        css_class_1.addCssClass(pullToRefreshElement, 'hidden-pull');
        css_class_1.removeCssClass(pullToRefreshElement, 'visible-pull');
    };
    var resetPullToRefreshStatus = function () {
        pullToRefreshStatusElement.innerHTML = 'Pull down to refresh';
        css_class_1.removeCssClass(pullToRefreshLoaderElement, 'animate');
    };
    document.addEventListener('touchstart', function (event) {
        dragStartPoint = getTouchesCoordinatesFrom(event);
        preparePullToRefreshToStart();
    }, { passive: false });
    document.addEventListener('touchmove', function (event) {
        var dragCurrentPoint = getTouchesCoordinatesFrom(event);
        var yMovement = (dragStartPoint.y - dragCurrentPoint.y) * decelerationFactor;
        var yAbsoluteMovement = Math.abs(yMovement);
        if (isDraggingForPullToRefresh(yMovement) && !pullToRefreshStatusRepository.refreshStarted) {
            event.preventDefault();
            event.stopPropagation();
            showPullToRefresh();
            if (isPullToRefreshDragCompleted(yAbsoluteMovement)) {
                pullToRefreshStatusRepository.startRefresh();
                dragUpdate(0, 1);
                setRefreshingStatus();
                service_worker_1.sendMessageToServiceWorker({ message: 'refresh' }).then(function () {
                    pullToRefreshStatusRepository.completeRefresh();
                    setTimeout(function () {
                        setRefreshStatusCompleted();
                        closePullToRefresh();
                    }, 1500);
                });
            }
            else {
                dragUpdate(yAbsoluteMovement - pullToRefreshElementHeight, yAbsoluteMovement / pullToRefreshElementHeight);
            }
        }
    }, { passive: false });
    document.addEventListener('touchend', function () {
        if (!pullToRefreshStatusRepository.refreshStarted) {
            closePullToRefresh();
        }
    }, { passive: false });
    pullToRefreshElement.addEventListener('transitionend', function () {
        if (pullToRefreshStatusRepository.refreshCompleted) {
            window.location.reload();
        }
        else {
            resetPullToRefreshStatus();
        }
    });
};
var pullToRefresh = function () {
    if (!service_worker_2.isServiceWorkerSupported()) {
        return;
    }
    var pullToRefreshElement = document.querySelector('#pull-to-refresh');
    var pullToRefreshStatusElement = document.querySelector('#pull-to-refresh-status');
    var pullToRefreshLoaderElement = document.querySelector('#pull-to-refresh-loader');
    var pullableContent = document.querySelector('.pullable-content');
    if (areAllAvailable(pullToRefreshElement, pullToRefreshStatusElement, pullToRefreshLoaderElement, pullableContent)) {
        startPullToRefresh(pullToRefreshElement, pullToRefreshStatusElement, pullToRefreshLoaderElement, pullableContent);
    }
};
exports.pullToRefresh = pullToRefresh;
