(self.__LOADABLE_LOADED_CHUNKS__=self.__LOADABLE_LOADED_CHUNKS__||[]).push([[224],{2993:function(e){var t="undefined"!=typeof Element,n="function"==typeof Map,r="function"==typeof Set,o="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView;function i(e,c){if(e===c)return!0;if(e&&c&&"object"==typeof e&&"object"==typeof c){if(e.constructor!==c.constructor)return!1;var a,s,l,u;if(Array.isArray(e)){if((a=e.length)!=c.length)return!1;for(s=a;0!=s--;)if(!i(e[s],c[s]))return!1;return!0}if(n&&e instanceof Map&&c instanceof Map){if(e.size!==c.size)return!1;for(u=e.entries();!(s=u.next()).done;)if(!c.has(s.value[0]))return!1;for(u=e.entries();!(s=u.next()).done;)if(!i(s.value[1],c.get(s.value[0])))return!1;return!0}if(r&&e instanceof Set&&c instanceof Set){if(e.size!==c.size)return!1;for(u=e.entries();!(s=u.next()).done;)if(!c.has(s.value[0]))return!1;return!0}if(o&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(c)){if((a=e.length)!=c.length)return!1;for(s=a;0!=s--;)if(e[s]!==c[s])return!1;return!0}if(e.constructor===RegExp)return e.source===c.source&&e.flags===c.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===c.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===c.toString();if((a=(l=Object.keys(e)).length)!==Object.keys(c).length)return!1;for(s=a;0!=s--;)if(!Object.prototype.hasOwnProperty.call(c,l[s]))return!1;if(t&&e instanceof Element)return!1;for(s=a;0!=s--;)if(("_owner"!==l[s]&&"__v"!==l[s]&&"__o"!==l[s]||!e.$$typeof)&&!i(e[l[s]],c[l[s]]))return!1;return!0}return e!=e&&c!=c}e.exports=function(e,t){try{return i(e,t)}catch(n){if((n.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw n}}},4839:function(e,t,n){"use strict";var r,o=n(7294),i=(r=o)&&"object"==typeof r&&"default"in r?r.default:r;function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var a=!("undefined"==typeof window||!window.document||!window.document.createElement);e.exports=function(e,t,n){if("function"!=typeof e)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof t)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==n&&"function"!=typeof n)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(r){if("function"!=typeof r)throw new Error("Expected WrappedComponent to be a React component.");var s,l=[];function u(){s=e(l.map((function(e){return e.props}))),f.canUseDOM?t(s):n&&(s=n(s))}var f=function(e){var t,n;function o(){return e.apply(this,arguments)||this}n=e,(t=o).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n,o.peek=function(){return s},o.rewind=function(){if(o.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var e=s;return s=void 0,l=[],e};var c=o.prototype;return c.UNSAFE_componentWillMount=function(){l.push(this),u()},c.componentDidUpdate=function(){u()},c.componentWillUnmount=function(){var e=l.indexOf(this);l.splice(e,1),u()},c.render=function(){return i.createElement(r,this.props)},o}(o.PureComponent);return c(f,"displayName","SideEffect("+function(e){return e.displayName||e.name||"Component"}(r)+")"),c(f,"canUseDOM",a),f}}},6919:function(e,t,n){"use strict";n.d(t,{F:function(){return ve}});var r,o,i,c,a=n(7294),s=n(5697),l=n.n(s),u=n(4839),f=n.n(u),p=n(2993),d=n.n(p),m=n(6494),h=n.n(m),b="bodyAttributes",g="htmlAttributes",y="titleAttributes",w={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"},v=(Object.keys(w).map((function(e){return w[e]})),"charset"),T="cssText",x="href",A="http-equiv",k="innerHTML",O="itemprop",E="name",C="property",S="rel",j="src",P="target",L={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},I="defaultTitle",_="defer",M="encodeSpecialCharacters",N="onChangeClientState",R="titleTemplate",B=Object.keys(L).reduce((function(e,t){return e[L[t]]=t,e}),{}),D=[w.NOSCRIPT,w.SCRIPT,w.STYLE],H="data-react-helmet",F="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},U=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},z=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),Y=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},q=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n},K=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},W=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return!1===t?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},V=function(e){var t=J(e,w.TITLE),n=J(e,R);if(n&&t)return n.replace(/%s/g,(function(){return Array.isArray(t)?t.join(""):t}));var r=J(e,I);return t||r||void 0},$=function(e){return J(e,N)||function(){}},Q=function(e,t){return t.filter((function(t){return void 0!==t[e]})).map((function(t){return t[e]})).reduce((function(e,t){return Y({},e,t)}),{})},X=function(e,t){return t.filter((function(e){return void 0!==e[w.BASE]})).map((function(e){return e[w.BASE]})).reverse().reduce((function(t,n){if(!t.length)for(var r=Object.keys(n),o=0;o<r.length;o++){var i=r[o].toLowerCase();if(-1!==e.indexOf(i)&&n[i])return t.concat(n)}return t}),[])},G=function(e,t,n){var r={};return n.filter((function(t){return!!Array.isArray(t[e])||(void 0!==t[e]&&re("Helmet: "+e+' should be of type "Array". Instead found type "'+F(t[e])+'"'),!1)})).map((function(t){return t[e]})).reverse().reduce((function(e,n){var o={};n.filter((function(e){for(var n=void 0,i=Object.keys(e),c=0;c<i.length;c++){var a=i[c],s=a.toLowerCase();-1===t.indexOf(s)||n===S&&"canonical"===e[n].toLowerCase()||s===S&&"stylesheet"===e[s].toLowerCase()||(n=s),-1===t.indexOf(a)||a!==k&&a!==T&&a!==O||(n=a)}if(!n||!e[n])return!1;var l=e[n].toLowerCase();return r[n]||(r[n]={}),o[n]||(o[n]={}),!r[n][l]&&(o[n][l]=!0,!0)})).reverse().forEach((function(t){return e.push(t)}));for(var i=Object.keys(o),c=0;c<i.length;c++){var a=i[c],s=h()({},r[a],o[a]);r[a]=s}return e}),[]).reverse()},J=function(e,t){for(var n=e.length-1;n>=0;n--){var r=e[n];if(r.hasOwnProperty(t))return r[t]}return null},Z=(r=Date.now(),function(e){var t=Date.now();t-r>16?(r=t,e(t)):setTimeout((function(){Z(e)}),0)}),ee=function(e){return clearTimeout(e)},te="undefined"!=typeof window?window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||Z:n.g.requestAnimationFrame||Z,ne="undefined"!=typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||ee:n.g.cancelAnimationFrame||ee,re=function(e){return console&&"function"==typeof console.warn&&console.warn(e)},oe=null,ie=function(e,t){var n=e.baseTag,r=e.bodyAttributes,o=e.htmlAttributes,i=e.linkTags,c=e.metaTags,a=e.noscriptTags,s=e.onChangeClientState,l=e.scriptTags,u=e.styleTags,f=e.title,p=e.titleAttributes;se(w.BODY,r),se(w.HTML,o),ae(f,p);var d={baseTag:le(w.BASE,n),linkTags:le(w.LINK,i),metaTags:le(w.META,c),noscriptTags:le(w.NOSCRIPT,a),scriptTags:le(w.SCRIPT,l),styleTags:le(w.STYLE,u)},m={},h={};Object.keys(d).forEach((function(e){var t=d[e],n=t.newTags,r=t.oldTags;n.length&&(m[e]=n),r.length&&(h[e]=d[e].oldTags)})),t&&t(),s(e,m,h)},ce=function(e){return Array.isArray(e)?e.join(""):e},ae=function(e,t){void 0!==e&&document.title!==e&&(document.title=ce(e)),se(w.TITLE,t)},se=function(e,t){var n=document.getElementsByTagName(e)[0];if(n){for(var r=n.getAttribute(H),o=r?r.split(","):[],i=[].concat(o),c=Object.keys(t),a=0;a<c.length;a++){var s=c[a],l=t[s]||"";n.getAttribute(s)!==l&&n.setAttribute(s,l),-1===o.indexOf(s)&&o.push(s);var u=i.indexOf(s);-1!==u&&i.splice(u,1)}for(var f=i.length-1;f>=0;f--)n.removeAttribute(i[f]);o.length===i.length?n.removeAttribute(H):n.getAttribute(H)!==c.join(",")&&n.setAttribute(H,c.join(","))}},le=function(e,t){var n=document.head||document.querySelector(w.HEAD),r=n.querySelectorAll(e+"["+"data-react-helmet]"),o=Array.prototype.slice.call(r),i=[],c=void 0;return t&&t.length&&t.forEach((function(t){var n=document.createElement(e);for(var r in t)if(t.hasOwnProperty(r))if(r===k)n.innerHTML=t.innerHTML;else if(r===T)n.styleSheet?n.styleSheet.cssText=t.cssText:n.appendChild(document.createTextNode(t.cssText));else{var a=void 0===t[r]?"":t[r];n.setAttribute(r,a)}n.setAttribute(H,"true"),o.some((function(e,t){return c=t,n.isEqualNode(e)}))?o.splice(c,1):i.push(n)})),o.forEach((function(e){return e.parentNode.removeChild(e)})),i.forEach((function(e){return n.appendChild(e)})),{oldTags:o,newTags:i}},ue=function(e){return Object.keys(e).reduce((function(t,n){var r=void 0!==e[n]?n+'="'+e[n]+'"':""+n;return t?t+" "+r:r}),"")},fe=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,n){return t[L[n]||n]=e[n],t}),t)},pe=function(e,t,n){switch(e){case w.TITLE:return{toComponent:function(){return e=t.title,n=t.titleAttributes,(r={key:e})[H]=!0,o=fe(n,r),[a.createElement(w.TITLE,o,e)];var e,n,r,o},toString:function(){return function(e,t,n,r){var o=ue(n),i=ce(t);return o?"<"+e+' data-react-helmet="true" '+o+">"+W(i,r)+"</"+e+">":"<"+e+' data-react-helmet="true">'+W(i,r)+"</"+e+">"}(e,t.title,t.titleAttributes,n)}};case b:case g:return{toComponent:function(){return fe(t)},toString:function(){return ue(t)}};default:return{toComponent:function(){return function(e,t){return t.map((function(t,n){var r,o=((r={key:n})[H]=!0,r);return Object.keys(t).forEach((function(e){var n=L[e]||e;if(n===k||n===T){var r=t.innerHTML||t.cssText;o.dangerouslySetInnerHTML={__html:r}}else o[n]=t[e]})),a.createElement(e,o)}))}(e,t)},toString:function(){return function(e,t,n){return t.reduce((function(t,r){var o=Object.keys(r).filter((function(e){return!(e===k||e===T)})).reduce((function(e,t){var o=void 0===r[t]?t:t+'="'+W(r[t],n)+'"';return e?e+" "+o:o}),""),i=r.innerHTML||r.cssText||"",c=-1===D.indexOf(e);return t+"<"+e+' data-react-helmet="true" '+o+(c?"/>":">"+i+"</"+e+">")}),"")}(e,t,n)}}}},de=function(e){var t=e.baseTag,n=e.bodyAttributes,r=e.encode,o=e.htmlAttributes,i=e.linkTags,c=e.metaTags,a=e.noscriptTags,s=e.scriptTags,l=e.styleTags,u=e.title,f=void 0===u?"":u,p=e.titleAttributes;return{base:pe(w.BASE,t,r),bodyAttributes:pe(b,n,r),htmlAttributes:pe(g,o,r),link:pe(w.LINK,i,r),meta:pe(w.META,c,r),noscript:pe(w.NOSCRIPT,a,r),script:pe(w.SCRIPT,s,r),style:pe(w.STYLE,l,r),title:pe(w.TITLE,{title:f,titleAttributes:p},r)}},me=f()((function(e){return{baseTag:X([x,P],e),bodyAttributes:Q(b,e),defer:J(e,_),encode:J(e,M),htmlAttributes:Q(g,e),linkTags:G(w.LINK,[S,x],e),metaTags:G(w.META,[E,v,A,C,O],e),noscriptTags:G(w.NOSCRIPT,[k],e),onChangeClientState:$(e),scriptTags:G(w.SCRIPT,[j,k],e),styleTags:G(w.STYLE,[T],e),title:V(e),titleAttributes:Q(y,e)}}),(function(e){oe&&ne(oe),e.defer?oe=te((function(){ie(e,(function(){oe=null}))})):(ie(e),oe=null)}),de)((function(){return null})),he=(o=me,c=i=function(e){function t(){return U(this,t),K(this,e.apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.shouldComponentUpdate=function(e){return!d()(this.props,e)},t.prototype.mapNestedChildrenToProps=function(e,t){if(!t)return null;switch(e.type){case w.SCRIPT:case w.NOSCRIPT:return{innerHTML:t};case w.STYLE:return{cssText:t}}throw new Error("<"+e.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},t.prototype.flattenArrayTypeChildren=function(e){var t,n=e.child,r=e.arrayTypeChildren,o=e.newChildProps,i=e.nestedChildren;return Y({},r,((t={})[n.type]=[].concat(r[n.type]||[],[Y({},o,this.mapNestedChildrenToProps(n,i))]),t))},t.prototype.mapObjectTypeChildren=function(e){var t,n,r=e.child,o=e.newProps,i=e.newChildProps,c=e.nestedChildren;switch(r.type){case w.TITLE:return Y({},o,((t={})[r.type]=c,t.titleAttributes=Y({},i),t));case w.BODY:return Y({},o,{bodyAttributes:Y({},i)});case w.HTML:return Y({},o,{htmlAttributes:Y({},i)})}return Y({},o,((n={})[r.type]=Y({},i),n))},t.prototype.mapArrayTypeChildrenToProps=function(e,t){var n=Y({},t);return Object.keys(e).forEach((function(t){var r;n=Y({},n,((r={})[t]=e[t],r))})),n},t.prototype.warnOnInvalidChildren=function(e,t){return!0},t.prototype.mapChildrenToProps=function(e,t){var n=this,r={};return a.Children.forEach(e,(function(e){if(e&&e.props){var o=e.props,i=o.children,c=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,n){return t[B[n]||n]=e[n],t}),t)}(q(o,["children"]));switch(n.warnOnInvalidChildren(e,i),e.type){case w.LINK:case w.META:case w.NOSCRIPT:case w.SCRIPT:case w.STYLE:r=n.flattenArrayTypeChildren({child:e,arrayTypeChildren:r,newChildProps:c,nestedChildren:i});break;default:t=n.mapObjectTypeChildren({child:e,newProps:t,newChildProps:c,nestedChildren:i})}}})),t=this.mapArrayTypeChildrenToProps(r,t)},t.prototype.render=function(){var e=this.props,t=e.children,n=q(e,["children"]),r=Y({},n);return t&&(r=this.mapChildrenToProps(t,r)),a.createElement(o,r)},z(t,null,[{key:"canUseDOM",set:function(e){o.canUseDOM=e}}]),t}(a.Component),i.propTypes={base:l().object,bodyAttributes:l().object,children:l().oneOfType([l().arrayOf(l().node),l().node]),defaultTitle:l().string,defer:l().bool,encodeSpecialCharacters:l().bool,htmlAttributes:l().object,link:l().arrayOf(l().object),meta:l().arrayOf(l().object),noscript:l().arrayOf(l().object),onChangeClientState:l().func,script:l().arrayOf(l().object),style:l().arrayOf(l().object),title:l().string,titleAttributes:l().object,titleTemplate:l().string},i.defaultProps={defer:!0,encodeSpecialCharacters:!0},i.peek=o.peek,i.rewind=function(){var e=o.rewind();return e||(e=de({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),e},c);he.renderStatic=he.rewind;var be=n(5444),ge=n(9184),ye=n(465),we="\nif (typeof window !== \"undefined\") {\n  window.addEventListener('load', () => { \n       window.cookieconsent.initialise({\n                      palette: {\n                          popup: {\n                              background: '"+ye.FD+"',\n                              text: '#ffffff'\n                          },\n                          button: {\n                              background: '#0F67FF',\n                              text: '#ffffff'\n                          }\n                      },\n                      theme: 'classic',\n                      content: {\n                          dismiss: 'Ok',\n                          href: window.location.protocol + '//' + window.location.host + '/cookie-policy/',\n                          message: 'This website uses cookies to ensure you get the best experience.',\n                          link: 'Learn more about cookie policy'\n                      }\n       });\n  });\n} else {\n  console.log(\"no cookieconsent\");\n}      \n",ve=function(e){var t=e.url,n=e.pageType,r=e.imageUrl,o=e.customTitle,i=e.date,c=e.description,s=(0,be.useStaticQuery)("4028829600").site.siteMetadata,l=o||s.title,u=s.author,f=s.siteUrl,p=s.contacts.links;return a.createElement(he,{title:l,htmlAttributes:{lang:"en"},meta:(0,ge.An)(u,l,t,""+f+r,n)},a.createElement("link",{rel:"canonical",href:t}),a.createElement("link",{rel:"author",href:"/humans.txt"}),a.createElement("link",{rel:"preload",href:"/fonts/opensans/OpenSans-Regular.woff2",as:"font",crossOrigin:"anonymous"}),a.createElement("script",{type:"text/javascript",defer:!0,src:"https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js","data-cfasync":"false"}),a.createElement("style",{type:"text/css"},"\n       .cc-window{opacity:1;transition:opacity 1s ease}.cc-window.cc-invisible{opacity:0}.cc-animate.cc-revoke{transition:transform 1s ease}.cc-animate.cc-revoke.cc-top{transform:translateY(-2em)}.cc-animate.cc-revoke.cc-bottom{transform:translateY(2em)}.cc-animate.cc-revoke.cc-active.cc-bottom,.cc-animate.cc-revoke.cc-active.cc-top,.cc-revoke:hover{transform:translateY(0)}.cc-grower{max-height:0;overflow:hidden;transition:max-height 1s}\n.cc-link,.cc-revoke:hover{text-decoration:none}.cc-revoke,.cc-window{position:fixed;overflow:hidden;box-sizing:border-box;font-family:Helvetica,Calibri,Arial,sans-serif;font-size:16px;line-height:1.5em;display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap;z-index:9999}.cc-window.cc-static{position:static}.cc-window.cc-floating{padding:2em;max-width:24em;-ms-flex-direction:column;flex-direction:column}.cc-window.cc-banner{padding:1em 1.8em;width:100%;-ms-flex-direction:row;flex-direction:row}.cc-revoke{padding:.5em}.cc-header{font-size:18px;font-weight:700}.cc-btn,.cc-close,.cc-link,.cc-revoke{cursor:pointer}.cc-link{opacity:.8;display:inline-block;padding:.2em}.cc-link:hover{opacity:1}.cc-link:active,.cc-link:visited{color:initial}.cc-btn{display:block;padding:.4em .8em;font-size:.9em;font-weight:700;border-width:2px;border-style:solid;text-align:center;white-space:nowrap}.cc-banner .cc-btn:last-child{min-width:140px}.cc-highlight .cc-btn:first-child{background-color:transparent;border-color:transparent}.cc-highlight .cc-btn:first-child:focus,.cc-highlight .cc-btn:first-child:hover{background-color:transparent;text-decoration:underline}.cc-close{display:block;position:absolute;top:.5em;right:.5em;font-size:1.6em;opacity:.9;line-height:.75}.cc-close:focus,.cc-close:hover{opacity:1}\n.cc-revoke.cc-top{top:0;left:3em;border-bottom-left-radius:.5em;border-bottom-right-radius:.5em}.cc-revoke.cc-bottom{bottom:0;left:3em;border-top-left-radius:.5em;border-top-right-radius:.5em}.cc-revoke.cc-left{left:3em;right:unset}.cc-revoke.cc-right{right:3em;left:unset}.cc-top{top:1em}.cc-left{left:1em}.cc-right{right:1em}.cc-bottom{bottom:1em}.cc-floating>.cc-link{margin-bottom:1em}.cc-floating .cc-message{display:block;margin-bottom:1em}.cc-window.cc-floating .cc-compliance{-ms-flex:1;flex:1}.cc-window.cc-banner{-ms-flex-align:center;align-items:center}.cc-banner.cc-top{left:0;right:0;top:0}.cc-banner.cc-bottom{left:0;right:0;bottom:0}.cc-banner .cc-message{-ms-flex:1;flex:1}.cc-compliance{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-line-pack:justify;align-content:space-between}.cc-compliance>.cc-btn{-ms-flex:1;flex:1}.cc-btn+.cc-btn{margin-left:.5em}\n@media print{.cc-revoke,.cc-window{display:none}}@media screen and (max-width:900px){.cc-btn{white-space:normal}}@media screen and (max-width:414px) and (orientation:portrait),screen and (max-width:736px) and (orientation:landscape){.cc-window.cc-top{top:0}.cc-window.cc-bottom{bottom:0}.cc-window.cc-banner,.cc-window.cc-left,.cc-window.cc-right{left:0;right:0}.cc-window.cc-banner{-ms-flex-direction:column;flex-direction:column}.cc-window.cc-banner .cc-compliance{-ms-flex:1;flex:1}.cc-window.cc-floating{max-width:none}.cc-window .cc-message{margin-bottom:1em}.cc-window.cc-banner{-ms-flex-align:unset;align-items:unset}}\n.cc-floating.cc-theme-classic{padding:1.2em;border-radius:5px}.cc-floating.cc-type-info.cc-theme-classic .cc-compliance{text-align:center;display:inline;-ms-flex:none;flex:none}.cc-theme-classic .cc-btn{border-radius:4px}.cc-theme-classic .cc-btn:last-child{min-width:140px}.cc-floating.cc-type-info.cc-theme-classic .cc-btn{display:inline-block}\n.cc-theme-edgeless.cc-window{padding:0}.cc-floating.cc-theme-edgeless .cc-message{margin:2em 2em 1.5em}.cc-banner.cc-theme-edgeless .cc-btn{margin:0;padding:.8em 1.8em;height:100%}.cc-banner.cc-theme-edgeless .cc-message{margin-left:1em}.cc-floating.cc-theme-edgeless .cc-btn+.cc-btn{margin-left:0}\n    "),a.createElement("script",{type:"text/javascript"},we),a.createElement("script",{type:"application/ld+json"},(0,ge.bT)(n,t,r,u,l,p,c,i)))}},9184:function(e,t,n){"use strict";var r;n.d(t,{E8:function(){return r},An:function(){return o},bT:function(){return i}}),function(e){e.BlogPosting="BlogPosting",e.WebSite="WebSite",e.Person="Person"}(r||(r={}));var o=function(e,t,n,r,o){return[{name:"viewport",content:"width=device-width, initial-scale=1"},{httpEquiv:"X-UA-Compatible",content:"IE=edge"},{name:"p:domain_verify",content:"33d2d5dad0e1496d9f7974925340ea50"},{name:"apple-mobile-web-app-status-bar-style",content:"black"},{name:"author",content:e},{name:"description",content:t},{property:"og:title",content:t},{property:"og:locale",content:"en_US"},{property:"og:description",content:t},{property:"og:url",content:n},{property:"og:site_name",content:e},{property:"og:image",content:r},{name:"twitter:card",content:"summary"},{property:"twitter:image",content:r},{property:"twitter:title",content:t},{name:"twitter:site",content:"@chicio86"},{name:"twitter:creator",content:"@chicio86"},{property:"article:publisher",content:"https://www.facebook.com/fabrizio.duroni"},{property:"fb:app_id",content:"443203399348229"},{property:"og:type",content:o},{name:"msapplication-config",content:"browserconfig.xml"},{name:"msapplication-TileColor",content:"#303f9f"},{name:"msapplication-TileImage",content:"/mstile-144x144.png"}]},i=function(e,t,n,o,i,c,a,s){return"{\n        "+(s?'"datePublished":"'+s+'",\n               "dateModified":"'+s+'", ':"")+'\n        "@type":"'+e+'",\n        "url":"'+t+'",\n        "image":"'+n+'",\n        '+(e===r.BlogPosting?'"mainEntityOfPage":{\n"@type":"WebPage",\n"@id":"'+t+'"\n},':"")+"\n        "+(e!==r.Person?'"author":{\n          "@type":"Person",\n          "name":"'+o+'"\n        },':"")+"\n        "+(e!==r.Person?'"publisher":{\n          "@type":"Organization",\n          "logo":{\n            "@type":"ImageObject",\n            "url":"'+n+'"\n          },\n          "name":"'+o+'"\n        },':"")+"\n        "+(e===r.WebSite?'"headline":"'+o+'",':"")+"\n        "+(e===r.BlogPosting?'"headline":"'+(i.length>110?i.substr(0,110):i)+'",':"")+'\n        "description":"'+(e===r.BlogPosting?a:i)+'",\n        "sameAs":[\n          "'+c.twitter+'",\n          "'+c.facebook+'",\n          "'+c.linkedin+'",\n          "'+c.github+'"\n        ],\n        "name":"'+o+'",\n        "@context":"https://schema.org"\n      }'}},7296:function(e,t){var n={blog:"/blog/",tags:"/blog/tags/",archive:"/blog/archive/",aboutMe:"/2017/05/10/about-me/"};t.H8=n,t.j7=function(e){return""+n.tags+e.split(" ").join("-")+"/"}}}]);
//# sourceMappingURL=7d922248f3170ff62b5a6da11be4c0a74b264aae-b2ea3ba6502ca270d223.js.map