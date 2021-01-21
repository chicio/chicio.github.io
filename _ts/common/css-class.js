"use strict";
exports.__esModule = true;
exports.removeCssClass = exports.addCssClass = void 0;
var addCssClass = function (element, className) {
    if (element.classList) {
        element.classList.add(className);
    }
    else {
        element.className += ' ' + className;
    }
};
exports.addCssClass = addCssClass;
var removeCssClass = function (element, className) {
    if (element.classList) {
        element.classList.remove(className);
    }
    else {
        element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
};
exports.removeCssClass = removeCssClass;
