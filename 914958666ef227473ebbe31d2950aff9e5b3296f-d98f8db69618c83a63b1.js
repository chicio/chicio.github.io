(self.__LOADABLE_LOADED_CHUNKS__=self.__LOADABLE_LOADED_CHUNKS__||[]).push([[367],{50008:function(e){function i(r){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(e.exports=i=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=i=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),i(r)}e.exports=i,e.exports.default=e.exports,e.exports.__esModule=!0},36030:function(e,i,r){"use strict";var n,o=r(67294),t=(n=o)&&"object"==typeof n&&"default"in n?n.default:n,a=r(14889),s=new a,u=s.getBrowser(),b=s.getCPU(),l=s.getDevice(),c=s.getEngine(),w=s.getOS(),d=s.getUA(),f=function(e){return s.setUA(e)},p=function(e){if(e){var i=new a(e);return{UA:i,browser:i.getBrowser(),cpu:i.getCPU(),device:i.getDevice(),engine:i.getEngine(),os:i.getOS(),ua:i.getUA(),setUserAgent:function(e){return i.setUA(e)}}}console.error("No userAgent string was provided")},m=Object.freeze({ClientUAInstance:s,browser:u,cpu:b,device:l,engine:c,os:w,ua:d,setUa:f,parseUserAgent:p});function g(e,i){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);i&&(n=n.filter((function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable}))),r.push.apply(r,n)}return r}function v(e){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},v(e)}function h(e,i){for(var r=0;r<i.length;r++){var n=i[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function y(e,i,r){return i in e?Object.defineProperty(e,i,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[i]=r,e}function x(){return x=Object.assign||function(e){for(var i=1;i<arguments.length;i++){var r=arguments[i];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},x.apply(this,arguments)}function O(e){return O=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},O(e)}function k(e,i){return k=Object.setPrototypeOf||function(e,i){return e.__proto__=i,e},k(e,i)}function S(e,i){if(null==e)return{};var r,n,o=function(e,i){if(null==e)return{};var r,n,o={},t=Object.keys(e);for(n=0;n<t.length;n++)r=t[n],i.indexOf(r)>=0||(o[r]=e[r]);return o}(e,i);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);for(n=0;n<t.length;n++)r=t[n],i.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function _(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function A(e,i){return function(e){if(Array.isArray(e))return e}(e)||function(e,i){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var n,o,t=[],a=!0,s=!1;try{for(r=r.call(e);!(a=(n=r.next()).done)&&(t.push(n.value),!i||t.length!==i);a=!0);}catch(u){s=!0,o=u}finally{try{a||null==r.return||r.return()}finally{if(s)throw o}}return t}(e,i)||function(e,i){if(!e)return;if("string"==typeof e)return j(e,i);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return j(e,i)}(e,i)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(e,i){(null==i||i>e.length)&&(i=e.length);for(var r=0,n=new Array(i);r<i;r++)n[r]=e[r];return n}var C="mobile",E="tablet",P="smarttv",I="console",M="wearable",T="embedded",U=void 0,N={Chrome:"Chrome",Firefox:"Firefox",Opera:"Opera",Yandex:"Yandex",Safari:"Safari",InternetExplorer:"Internet Explorer",Edge:"Edge",Chromium:"Chromium",Ie:"IE",MobileSafari:"Mobile Safari",EdgeChromium:"Edge Chromium",MIUI:"MIUI Browser",SamsungBrowser:"Samsung Browser"},B={IOS:"iOS",Android:"Android",WindowsPhone:"Windows Phone",Windows:"Windows",MAC_OS:"Mac OS"},q={isMobile:!1,isTablet:!1,isBrowser:!1,isSmartTV:!1,isConsole:!1,isWearable:!1},z=function(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"none";return e||i},D=function(){return!("undefined"==typeof window||!window.navigator&&!navigator)&&(window.navigator||navigator)},V=function(e){var i=D();return i&&i.platform&&(-1!==i.platform.indexOf(e)||"MacIntel"===i.platform&&i.maxTouchPoints>1&&!window.MSStream)},W=function(e,i,r,n){return function(e){for(var i=1;i<arguments.length;i++){var r=null!=arguments[i]?arguments[i]:{};i%2?g(Object(r),!0).forEach((function(i){y(e,i,r[i])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):g(Object(r)).forEach((function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(r,i))}))}return e}({},e,{vendor:z(i.vendor),model:z(i.model),os:z(r.name),osVersion:z(r.version),ua:z(n)})};var R=function(e){return e.type===C},L=function(e){return e.type===E},F=function(e){var i=e.type;return i===C||i===E},H=function(e){return e.type===P},$=function(e){return e.type===U},G=function(e){return e.type===M},Y=function(e){return e.type===I},Z=function(e){return e.type===T},K=function(e){var i=e.vendor;return z(i)},X=function(e){var i=e.model;return z(i)},J=function(e){var i=e.type;return z(i,"browser")},Q=function(e){return e.name===B.Android},ee=function(e){return e.name===B.Windows},ie=function(e){return e.name===B.MAC_OS},re=function(e){return e.name===B.WindowsPhone},ne=function(e){return e.name===B.IOS},oe=function(e){var i=e.version;return z(i)},te=function(e){var i=e.name;return z(i)},ae=function(e){return e.name===N.Chrome},se=function(e){return e.name===N.Firefox},ue=function(e){return e.name===N.Chromium},be=function(e){return e.name===N.Edge},le=function(e){return e.name===N.Yandex},ce=function(e){var i=e.name;return i===N.Safari||i===N.MobileSafari},we=function(e){return e.name===N.MobileSafari},de=function(e){return e.name===N.Opera},fe=function(e){var i=e.name;return i===N.InternetExplorer||i===N.Ie},pe=function(e){return e.name===N.MIUI},me=function(e){return e.name===N.SamsungBrowser},ge=function(e){var i=e.version;return z(i)},ve=function(e){var i=e.major;return z(i)},he=function(e){var i=e.name;return z(i)},ye=function(e){var i=e.name;return z(i)},xe=function(e){var i=e.version;return z(i)},Oe=function(){var e=D(),i=e&&e.userAgent&&e.userAgent.toLowerCase();return"string"==typeof i&&/electron/.test(i)},ke=function(e){return"string"==typeof e&&-1!==e.indexOf("Edg/")},Se=function(){var e=D();return e&&(/iPad|iPhone|iPod/.test(e.platform)||"MacIntel"===e.platform&&e.maxTouchPoints>1)&&!window.MSStream},_e=function(){return V("iPad")},Ae=function(){return V("iPhone")},je=function(){return V("iPod")},Ce=function(e){return z(e)};function Ee(e){var i=e||m,r=i.device,n=i.browser,o=i.os,t=i.engine,a=i.ua;return{isSmartTV:H(r),isConsole:Y(r),isWearable:G(r),isEmbedded:Z(r),isMobileSafari:we(n)||_e(),isChromium:ue(n),isMobile:F(r)||_e(),isMobileOnly:R(r),isTablet:L(r)||_e(),isBrowser:$(r),isDesktop:$(r),isAndroid:Q(o),isWinPhone:re(o),isIOS:ne(o)||_e(),isChrome:ae(n),isFirefox:se(n),isSafari:ce(n),isOpera:de(n),isIE:fe(n),osVersion:oe(o),osName:te(o),fullBrowserVersion:ge(n),browserVersion:ve(n),browserName:he(n),mobileVendor:K(r),mobileModel:X(r),engineName:ye(t),engineVersion:xe(t),getUA:Ce(a),isEdge:be(n)||ke(a),isYandex:le(n),deviceType:J(r),isIOS13:Se(),isIPad13:_e(),isIPhone13:Ae(),isIPod13:je(),isElectron:Oe(),isEdgeChromium:ke(a),isLegacyEdge:be(n)&&!ke(a),isWindows:ee(o),isMacOs:ie(o),isMIUI:pe(n),isSamsungBrowser:me(n)}}var Pe=H(l),Ie=Y(l),Me=G(l),Te=Z(l),Ue=we(u)||_e(),Ne=ue(u),Be=F(l)||_e(),qe=R(l),ze=L(l)||_e(),De=$(l),Ve=$(l),We=Q(w),Re=re(w),Le=ne(w)||_e(),Fe=ae(u),He=se(u),$e=ce(u),Ge=de(u),Ye=fe(u),Ze=oe(w),Ke=te(w),Xe=ge(u),Je=ve(u),Qe=he(u),ei=K(l),ii=X(l),ri=ye(c),ni=xe(c),oi=Ce(d),ti=be(u)||ke(d),ai=le(u),si=J(l),ui=Se(),bi=_e(),li=Ae(),ci=je(),wi=Oe(),di=ke(d),fi=be(u)&&!ke(d),pi=ee(w),mi=ie(w),gi=pe(u),vi=me(u);function hi(e){var i=e||window.navigator.userAgent;return p(i)}i.nI=Ve,i.gn=Le,i.tq=Be},14889:function(e,i,r){var n;!function(o,t){"use strict";var a="function",s="undefined",u="object",b="string",l="model",c="name",w="type",d="vendor",f="version",p="architecture",m="console",g="mobile",v="tablet",h="smarttv",y="wearable",x="embedded",O="Amazon",k="Apple",S="ASUS",_="BlackBerry",A="Firefox",j="Google",C="Huawei",E="LG",P="Microsoft",I="Motorola",M="Opera",T="Samsung",U="Sony",N="Xiaomi",B="Zebra",q="Facebook",z=function(e){for(var i={},r=0;r<e.length;r++)i[e[r].toUpperCase()]=e[r];return i},D=function(e,i){return typeof e===b&&-1!==V(i).indexOf(V(e))},V=function(e){return e.toLowerCase()},W=function(e,i){if(typeof e===b)return e=e.replace(/^\s\s*/,"").replace(/\s\s*$/,""),typeof i===s?e:e.substring(0,255)},R=function(e,i){for(var r,n,o,s,b,l,c=0;c<i.length&&!b;){var w=i[c],d=i[c+1];for(r=n=0;r<w.length&&!b;)if(b=w[r++].exec(e))for(o=0;o<d.length;o++)l=b[++n],typeof(s=d[o])===u&&s.length>0?2===s.length?typeof s[1]==a?this[s[0]]=s[1].call(this,l):this[s[0]]=s[1]:3===s.length?typeof s[1]!==a||s[1].exec&&s[1].test?this[s[0]]=l?l.replace(s[1],s[2]):t:this[s[0]]=l?s[1].call(this,l,s[2]):t:4===s.length&&(this[s[0]]=l?s[3].call(this,l.replace(s[1],s[2])):t):this[s]=l||t;c+=2}},L=function(e,i){for(var r in i)if(typeof i[r]===u&&i[r].length>0){for(var n=0;n<i[r].length;n++)if(D(i[r][n],e))return"?"===r?t:r}else if(D(i[r],e))return"?"===r?t:r;return e},F={ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"},H={browser:[[/\b(?:crmo|crios)\/([\w\.]+)/i],[f,[c,"Chrome"]],[/edg(?:e|ios|a)?\/([\w\.]+)/i],[f,[c,"Edge"]],[/(opera mini)\/([-\w\.]+)/i,/(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,/(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i],[c,f],[/opios[\/ ]+([\w\.]+)/i],[f,[c,"Opera Mini"]],[/\bopr\/([\w\.]+)/i],[f,[c,M]],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,/(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,/(ba?idubrowser)[\/ ]?([\w\.]+)/i,/(?:ms|\()(ie) ([\w\.]+)/i,/(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale|qqbrowserlite|qq)\/([-\w\.]+)/i,/(weibo)__([\d\.]+)/i],[c,f],[/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],[f,[c,"UCBrowser"]],[/\bqbcore\/([\w\.]+)/i],[f,[c,"WeChat(Win) Desktop"]],[/micromessenger\/([\w\.]+)/i],[f,[c,"WeChat"]],[/konqueror\/([\w\.]+)/i],[f,[c,"Konqueror"]],[/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],[f,[c,"IE"]],[/yabrowser\/([\w\.]+)/i],[f,[c,"Yandex"]],[/(avast|avg)\/([\w\.]+)/i],[[c,/(.+)/,"$1 Secure Browser"],f],[/\bfocus\/([\w\.]+)/i],[f,[c,"Firefox Focus"]],[/\bopt\/([\w\.]+)/i],[f,[c,"Opera Touch"]],[/coc_coc\w+\/([\w\.]+)/i],[f,[c,"Coc Coc"]],[/dolfin\/([\w\.]+)/i],[f,[c,"Dolphin"]],[/coast\/([\w\.]+)/i],[f,[c,"Opera Coast"]],[/miuibrowser\/([\w\.]+)/i],[f,[c,"MIUI Browser"]],[/fxios\/([-\w\.]+)/i],[f,[c,A]],[/\bqihu|(qi?ho?o?|360)browser/i],[[c,"360 Browser"]],[/(oculus|samsung|sailfish)browser\/([\w\.]+)/i],[[c,/(.+)/,"$1 Browser"],f],[/(comodo_dragon)\/([\w\.]+)/i],[[c,/_/g," "],f],[/(electron)\/([\w\.]+) safari/i,/(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,/m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i],[c,f],[/(metasr)[\/ ]?([\w\.]+)/i,/(lbbrowser)/i],[c],[/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],[[c,q],f],[/safari (line)\/([\w\.]+)/i,/\b(line)\/([\w\.]+)\/iab/i,/(chromium|instagram)[\/ ]([-\w\.]+)/i],[c,f],[/\bgsa\/([\w\.]+) .*safari\//i],[f,[c,"GSA"]],[/headlesschrome(?:\/([\w\.]+)| )/i],[f,[c,"Chrome Headless"]],[/ wv\).+(chrome)\/([\w\.]+)/i],[[c,"Chrome WebView"],f],[/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],[f,[c,"Android Browser"]],[/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],[c,f],[/version\/([\w\.]+) .*mobile\/\w+ (safari)/i],[f,[c,"Mobile Safari"]],[/version\/([\w\.]+) .*(mobile ?safari|safari)/i],[f,c],[/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],[c,[f,L,{"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}]],[/(webkit|khtml)\/([\w\.]+)/i],[c,f],[/(navigator|netscape\d?)\/([-\w\.]+)/i],[[c,"Netscape"],f],[/mobile vr; rv:([\w\.]+)\).+firefox/i],[f,[c,"Firefox Reality"]],[/ekiohf.+(flow)\/([\w\.]+)/i,/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,/(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,/(firefox)\/([\w\.]+)/i,/(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,/(links) \(([\w\.]+)/i],[c,f]],cpu:[[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],[[p,"amd64"]],[/(ia32(?=;))/i],[[p,V]],[/((?:i[346]|x)86)[;\)]/i],[[p,"ia32"]],[/\b(aarch64|arm(v?8e?l?|_?64))\b/i],[[p,"arm64"]],[/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],[[p,"armhf"]],[/windows (ce|mobile); ppc;/i],[[p,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],[[p,/ower/,"",V]],[/(sun4\w)[;\)]/i],[[p,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i],[[p,V]]],device:[[/\b(sch-i[89]0\d|shw-m380s|sm-[pt]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],[l,[d,T],[w,v]],[/\b((?:s[cgp]h|gt|sm)-\w+|galaxy nexus)/i,/samsung[- ]([-\w]+)/i,/sec-(sgh\w+)/i],[l,[d,T],[w,g]],[/\((ip(?:hone|od)[\w ]*);/i],[l,[d,k],[w,g]],[/\((ipad);[-\w\),; ]+apple/i,/applecoremedia\/[\w\.]+ \((ipad)/i,/\b(ipad)\d\d?,\d\d?[;\]].+ios/i],[l,[d,k],[w,v]],[/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],[l,[d,C],[w,v]],[/(?:huawei|honor)([-\w ]+)[;\)]/i,/\b(nexus 6p|\w{2,4}-[atu]?[ln][01259x][012359][an]?)\b(?!.+d\/s)/i],[l,[d,C],[w,g]],[/\b(poco[\w ]+)(?: bui|\))/i,/\b; (\w+) build\/hm\1/i,/\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,/\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,/\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i],[[l,/_/g," "],[d,N],[w,g]],[/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],[[l,/_/g," "],[d,N],[w,v]],[/; (\w+) bui.+ oppo/i,/\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],[l,[d,"OPPO"],[w,g]],[/vivo (\w+)(?: bui|\))/i,/\b(v[12]\d{3}\w?[at])(?: bui|;)/i],[l,[d,"Vivo"],[w,g]],[/\b(rmx[12]\d{3})(?: bui|;|\))/i],[l,[d,"Realme"],[w,g]],[/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,/\bmot(?:orola)?[- ](\w*)/i,/((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i],[l,[d,I],[w,g]],[/\b(mz60\d|xoom[2 ]{0,2}) build\//i],[l,[d,I],[w,v]],[/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],[l,[d,E],[w,v]],[/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,/\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,/\blg-?([\d\w]+) bui/i],[l,[d,E],[w,g]],[/(ideatab[-\w ]+)/i,/lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i],[l,[d,"Lenovo"],[w,v]],[/(?:maemo|nokia).*(n900|lumia \d+)/i,/nokia[-_ ]?([-\w\.]*)/i],[[l,/_/g," "],[d,"Nokia"],[w,g]],[/(pixel c)\b/i],[l,[d,j],[w,v]],[/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],[l,[d,j],[w,g]],[/droid.+ ([c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],[l,[d,U],[w,g]],[/sony tablet [ps]/i,/\b(?:sony)?sgp\w+(?: bui|\))/i],[[l,"Xperia Tablet"],[d,U],[w,v]],[/ (kb2005|in20[12]5|be20[12][59])\b/i,/(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],[l,[d,"OnePlus"],[w,g]],[/(alexa)webm/i,/(kf[a-z]{2}wi)( bui|\))/i,/(kf[a-z]+)( bui|\)).+silk\//i],[l,[d,O],[w,v]],[/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],[[l,/(.+)/g,"Fire Phone $1"],[d,O],[w,g]],[/(playbook);[-\w\),; ]+(rim)/i],[l,d,[w,v]],[/\b((?:bb[a-f]|st[hv])100-\d)/i,/\(bb10; (\w+)/i],[l,[d,_],[w,g]],[/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],[l,[d,S],[w,v]],[/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],[l,[d,S],[w,g]],[/(nexus 9)/i],[l,[d,"HTC"],[w,v]],[/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,/(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,/(alcatel|geeksphone|nexian|panasonic|sony)[-_ ]?([-\w]*)/i],[d,[l,/_/g," "],[w,g]],[/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],[l,[d,"Acer"],[w,v]],[/droid.+; (m[1-5] note) bui/i,/\bmz-([-\w]{2,})/i],[l,[d,"Meizu"],[w,g]],[/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],[l,[d,"Sharp"],[w,g]],[/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,/(hp) ([\w ]+\w)/i,/(asus)-?(\w+)/i,/(microsoft); (lumia[\w ]+)/i,/(lenovo)[-_ ]?([-\w]+)/i,/(jolla)/i,/(oppo) ?([\w ]+) bui/i],[d,l,[w,g]],[/(archos) (gamepad2?)/i,/(hp).+(touchpad(?!.+tablet)|tablet)/i,/(kindle)\/([\w\.]+)/i,/(nook)[\w ]+build\/(\w+)/i,/(dell) (strea[kpr\d ]*[\dko])/i,/(le[- ]+pan)[- ]+(\w{1,9}) bui/i,/(trinity)[- ]*(t\d{3}) bui/i,/(gigaset)[- ]+(q\w{1,9}) bui/i,/(vodafone) ([\w ]+)(?:\)| bui)/i],[d,l,[w,v]],[/(surface duo)/i],[l,[d,P],[w,v]],[/droid [\d\.]+; (fp\du?)(?: b|\))/i],[l,[d,"Fairphone"],[w,g]],[/(u304aa)/i],[l,[d,"AT&T"],[w,g]],[/\bsie-(\w*)/i],[l,[d,"Siemens"],[w,g]],[/\b(rct\w+) b/i],[l,[d,"RCA"],[w,v]],[/\b(venue[\d ]{2,7}) b/i],[l,[d,"Dell"],[w,v]],[/\b(q(?:mv|ta)\w+) b/i],[l,[d,"Verizon"],[w,v]],[/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],[l,[d,"Barnes & Noble"],[w,v]],[/\b(tm\d{3}\w+) b/i],[l,[d,"NuVision"],[w,v]],[/\b(k88) b/i],[l,[d,"ZTE"],[w,v]],[/\b(nx\d{3}j) b/i],[l,[d,"ZTE"],[w,g]],[/\b(gen\d{3}) b.+49h/i],[l,[d,"Swiss"],[w,g]],[/\b(zur\d{3}) b/i],[l,[d,"Swiss"],[w,v]],[/\b((zeki)?tb.*\b) b/i],[l,[d,"Zeki"],[w,v]],[/\b([yr]\d{2}) b/i,/\b(dragon[- ]+touch |dt)(\w{5}) b/i],[[d,"Dragon Touch"],l,[w,v]],[/\b(ns-?\w{0,9}) b/i],[l,[d,"Insignia"],[w,v]],[/\b((nxa|next)-?\w{0,9}) b/i],[l,[d,"NextBook"],[w,v]],[/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],[[d,"Voice"],l,[w,g]],[/\b(lvtel\-)?(v1[12]) b/i],[[d,"LvTel"],l,[w,g]],[/\b(ph-1) /i],[l,[d,"Essential"],[w,g]],[/\b(v(100md|700na|7011|917g).*\b) b/i],[l,[d,"Envizen"],[w,v]],[/\b(trio[-\w\. ]+) b/i],[l,[d,"MachSpeed"],[w,v]],[/\btu_(1491) b/i],[l,[d,"Rotor"],[w,v]],[/(shield[\w ]+) b/i],[l,[d,"Nvidia"],[w,v]],[/(sprint) (\w+)/i],[d,l,[w,g]],[/(kin\.[onetw]{3})/i],[[l,/\./g," "],[d,P],[w,g]],[/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],[l,[d,B],[w,v]],[/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],[l,[d,B],[w,g]],[/(ouya)/i,/(nintendo) ([wids3utch]+)/i],[d,l,[w,m]],[/droid.+; (shield) bui/i],[l,[d,"Nvidia"],[w,m]],[/(playstation [345portablevi]+)/i],[l,[d,U],[w,m]],[/\b(xbox(?: one)?(?!; xbox))[\); ]/i],[l,[d,P],[w,m]],[/smart-tv.+(samsung)/i],[d,[w,h]],[/hbbtv.+maple;(\d+)/i],[[l,/^/,"SmartTV"],[d,T],[w,h]],[/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],[[d,E],[w,h]],[/(apple) ?tv/i],[d,[l,"Apple TV"],[w,h]],[/crkey/i],[[l,"Chromecast"],[d,j],[w,h]],[/droid.+aft(\w)( bui|\))/i],[l,[d,O],[w,h]],[/\(dtv[\);].+(aquos)/i],[l,[d,"Sharp"],[w,h]],[/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,/hbbtv\/\d+\.\d+\.\d+ +\([\w ]*; *(\w[^;]*);([^;]*)/i],[[d,W],[l,W],[w,h]],[/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],[[w,h]],[/((pebble))app/i],[d,l,[w,y]],[/droid.+; (glass) \d/i],[l,[d,j],[w,y]],[/droid.+; (wt63?0{2,3})\)/i],[l,[d,B],[w,y]],[/(quest( 2)?)/i],[l,[d,q],[w,y]],[/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],[d,[w,x]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i],[l,[w,g]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],[l,[w,v]],[/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],[[w,v]],[/(phone|mobile(?:[;\/]| safari)|pda(?=.+windows ce))/i],[[w,g]],[/(android[-\w\. ]{0,9});.+buil/i],[l,[d,"Generic"]]],engine:[[/windows.+ edge\/([\w\.]+)/i],[f,[c,"EdgeHTML"]],[/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],[f,[c,"Blink"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,/ekioh(flow)\/([\w\.]+)/i,/(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,/(icab)[\/ ]([23]\.[\d\.]+)/i],[c,f],[/rv\:([\w\.]{1,9})\b.+(gecko)/i],[f,c]],os:[[/microsoft (windows) (vista|xp)/i],[c,f],[/(windows) nt 6\.2; (arm)/i,/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,/(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i],[c,[f,L,F]],[/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],[[c,"Windows"],[f,L,F]],[/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,/cfnetwork\/.+darwin/i],[[f,/_/g,"."],[c,"iOS"]],[/(mac os x) ?([\w\. ]*)/i,/(macintosh|mac_powerpc\b)(?!.+haiku)/i],[[c,"Mac OS"],[f,/_/g,"."]],[/droid ([\w\.]+)\b.+(android[- ]x86)/i],[f,c],[/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,/(blackberry)\w*\/([\w\.]*)/i,/(tizen|kaios)[\/ ]([\w\.]+)/i,/\((series40);/i],[c,f],[/\(bb(10);/i],[f,[c,_]],[/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],[f,[c,"Symbian"]],[/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],[f,[c,"Firefox OS"]],[/web0s;.+rt(tv)/i,/\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],[f,[c,"webOS"]],[/crkey\/([\d\.]+)/i],[f,[c,"Chromecast"]],[/(cros) [\w]+ ([\w\.]+\w)/i],[[c,"Chromium OS"],f],[/(nintendo|playstation) ([wids345portablevuch]+)/i,/(xbox); +xbox ([^\);]+)/i,/\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,/(mint)[\/\(\) ]?(\w*)/i,/(mageia|vectorlinux)[; ]/i,/([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,/(hurd|linux) ?([\w\.]*)/i,/(gnu) ?([\w\.]*)/i,/\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,/(haiku) (\w+)/i],[c,f],[/(sunos) ?([\w\.\d]*)/i],[[c,"Solaris"],f],[/((?:open)?solaris)[-\/ ]?([\w\.]*)/i,/(aix) ((\d)(?=\.|\)| )[\w\.])*/i,/\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux)/i,/(unix) ?([\w\.]*)/i],[c,f]]},$=function e(i,r){if(typeof i===u&&(r=i,i=t),!(this instanceof e))return new e(i,r).getResult();var n=i||(typeof o!==s&&o.navigator&&o.navigator.userAgent?o.navigator.userAgent:""),a=r?function(e,i){var r={};for(var n in e)i[n]&&i[n].length%2==0?r[n]=i[n].concat(e[n]):r[n]=e[n];return r}(H,r):H;return this.getBrowser=function(){var e,i={};return i.name=t,i.version=t,R.call(i,n,a.browser),i.major=typeof(e=i.version)===b?e.replace(/[^\d\.]/g,"").split(".")[0]:t,i},this.getCPU=function(){var e={};return e.architecture=t,R.call(e,n,a.cpu),e},this.getDevice=function(){var e={};return e.vendor=t,e.model=t,e.type=t,R.call(e,n,a.device),e},this.getEngine=function(){var e={};return e.name=t,e.version=t,R.call(e,n,a.engine),e},this.getOS=function(){var e={};return e.name=t,e.version=t,R.call(e,n,a.os),e},this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}},this.getUA=function(){return n},this.setUA=function(e){return n=typeof e===b&&e.length>255?W(e,255):e,this},this.setUA(n),this};$.VERSION="0.7.31",$.BROWSER=z([c,f,"major"]),$.CPU=z([p]),$.DEVICE=z([l,d,w,m,g,h,v,y,x]),$.ENGINE=$.OS=z([c,f]),typeof i!==s?(e.exports&&(i=e.exports=$),i.UAParser=$):r.amdO?(n=function(){return $}.call(i,r,i,e))===t||(e.exports=n):typeof o!==s&&(o.UAParser=$);var G=typeof o!==s&&(o.jQuery||o.Zepto);if(G&&!G.ua){var Y=new $;G.ua=Y.getResult(),G.ua.get=function(){return Y.getUA()},G.ua.set=function(e){Y.setUA(e);var i=Y.getResult();for(var r in i)G.ua[r]=i[r]}}}("object"==typeof window?window:this)},40873:function(e,i,r){"use strict";r.d(i,{J:function(){return n}});var n=(0,r(19692).css)(["line-height:1.4;color:",";margin:",";font-weight:normal;@media (prefers-color-scheme:dark){color:",";}"],(function(e){return e.theme.light.primaryTextColor}),(function(e){return e.theme.spacing[0]}),(function(e){return e.theme.dark.primaryTextColor}))},27296:function(e,i){var r={blog:"/blog/",tags:"/blog/tags/",archive:"/blog/archive/",aboutMe:"/2017/05/10/about-me/",art:"/art/"};i.H8=r,i.j7=function(e){return""+r.tags+e.split(" ").join("-")+"/"}}}]);
//# sourceMappingURL=914958666ef227473ebbe31d2950aff9e5b3296f-d98f8db69618c83a63b1.js.map