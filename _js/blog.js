$(document).ready(function () {
    loadFonts();
    cookieConsent();
    heartAnimation();
    runFuckAdBlock();
});


function loadFonts() {
    WebFont.load({
        google: {families: ['Open Sans']}
    });
}

function cookieConsent() {
    window.addEventListener("load", function(){
        window.cookieconsent.initialise({
            "palette": {
                "popup": {
                    "background": "#9fa8da",
                    "text": "#ffffff"
                },
                "button": {
                    "background": "#448aff",
                    "text": "#ffffff"
                }
            },
            "theme": "classic",
            "content": {
                "dismiss": "Ok",
                "href": window.location.protocol + "//" +  window.location.host + "/cookie-policy.html",
                "message": "This website uses cookies to ensure you get the best experience."
            }
        })});
}

function heartAnimation() {
    TweenMax.from("#heart", 0.7, {
        scale: 0.4,
        repeat: -1,
        yoyo: true
    });
}

function runFuckAdBlock() {
    if(typeof fuckAdBlock !== 'undefined' || typeof FuckAdBlock !== 'undefined') {
        $('#adblock-alert').show();
    } else {
        var importFAB = document.createElement('script');
        importFAB.onload = function() {
            fuckAdBlock.onDetected(function() {
                $('#adblock-alert').show();
            });
            fuckAdBlock.onNotDetected(function() {
                $('#adblock-alert').hide();
            });
        };
        importFAB.onerror = function() {
            $('#adblock-alert').show();
        };
        importFAB.integrity = 'sha256-xjwKUY/NgkPjZZBOtOxRYtK20GaqTwUCf7WYCJ1z69w=';
        importFAB.crossOrigin = 'anonymous';
        importFAB.src = 'https://cdnjs.cloudflare.com/ajax/libs/fuckadblock/3.2.1/fuckadblock.min.js';
        document.head.appendChild(importFAB);
    }
}
