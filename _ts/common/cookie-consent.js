"use strict";
exports.__esModule = true;
exports.cookieConsent = void 0;
var cookieConsent = function () {
    window.cookieconsent.initialise({
        palette: {
            popup: {
                background: '#303F9F',
                text: '#ffffff'
            },
            button: {
                background: '#0F67FF',
                text: '#ffffff'
            }
        },
        theme: 'classic',
        content: {
            dismiss: 'Ok',
            href: window.location.protocol + '//' + window.location.host + '/cookie-policy.html',
            message: 'This website uses cookies to ensure you get the best experience.',
            link: 'Learn more about cookie policy'
        }
    });
};
exports.cookieConsent = cookieConsent;


if (typeof window !== "undefined") {
    window.addEventListener('load', () => { 
        window.cookieconsent.initialise({
            palette: {
                popup: {
                    background: '#303F9F',
                    text: '#ffffff'
                },
                button: {
                    background: '#0F67FF',
                    text: '#ffffff'
                }
            },
            theme: 'classic',
            content: {
                dismiss: 'Ok',
                href: window.location.protocol + '//' + window.location.host + '/cookie-policy.html',
                message: 'This website uses cookies to ensure you get the best experience.',
                link: 'Learn more about cookie policy'
            }
        });
    });
} else {
    console.log("no cookieconsent");
}