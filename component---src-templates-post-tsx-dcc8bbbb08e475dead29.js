(self.webpackChunkfabrizioduroni_it=self.webpackChunkfabrizioduroni_it||[]).push([[186],{2634:function(e){"use strict";e.exports=JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/c10cb9c09863cc59eaf2f00e35508ee4/499f6/blog-logo.jpg","srcSet":"/static/c10cb9c09863cc59eaf2f00e35508ee4/f4935/blog-logo.jpg 20w,\\n/static/c10cb9c09863cc59eaf2f00e35508ee4/2f28c/blog-logo.jpg 40w,\\n/static/c10cb9c09863cc59eaf2f00e35508ee4/499f6/blog-logo.jpg 80w","sizes":"(min-width: 80px) 80px, 100vw"},"sources":[{"srcSet":"/static/c10cb9c09863cc59eaf2f00e35508ee4/264f2/blog-logo.webp 20w,\\n/static/c10cb9c09863cc59eaf2f00e35508ee4/e73fe/blog-logo.webp 40w,\\n/static/c10cb9c09863cc59eaf2f00e35508ee4/61ca6/blog-logo.webp 80w","type":"image/webp","sizes":"(min-width: 80px) 80px, 100vw"}]},"width":80,"height":80}')},6837:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CommentCount=void 0;var o=a(n(7294)),r=a(n(5697)),i=n(3222);function a(e){return e&&e.__esModule?e:{default:e}}function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function s(e,t){return(s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function d(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,o=m(e);if(t){var r=m(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return f(this,n)}}function f(e,t){return!t||"object"!==c(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function m(e){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var p=(0,i.debounce)((function(){window.DISQUSWIDGETS&&window.DISQUSWIDGETS.getCount({reset:!0})}),300,!1),g=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&s(e,t)}(c,e);var t,n,r,a=d(c);function c(){return l(this,c),a.apply(this,arguments)}return t=c,(n=[{key:"componentDidMount",value:function(){this.loadInstance()}},{key:"shouldComponentUpdate",value:function(e){return this.props!==e&&(0,i.shallowComparison)(this.props,e)}},{key:"componentDidUpdate",value:function(e){this.props.shortname!==e.shortname&&this.cleanInstance(),this.loadInstance()}},{key:"loadInstance",value:function(){var e=window.document;e.getElementById("dsq-count-scr")?p():(0,i.insertScript)("https://".concat(this.props.shortname,".disqus.com/count.js"),"dsq-count-scr",e.body)}},{key:"cleanInstance",value:function(){var e=window.document.body;(0,i.removeScript)("dsq-count-scr",e),window.DISQUSWIDGETS=void 0}},{key:"render",value:function(){return o.default.createElement("span",{className:"disqus-comment-count","data-disqus-identifier":this.props.config.identifier,"data-disqus-url":this.props.config.url},this.props.children)}}])&&u(t.prototype,n),r&&u(t,r),c}(o.default.Component);t.CommentCount=g,g.propTypes={shortname:r.default.string.isRequired,config:r.default.shape({identifier:r.default.string,url:r.default.string,title:r.default.string}).isRequired}},9888:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CommentEmbed=void 0;var o=i(n(7294)),r=i(n(5697));function i(e){return e&&e.__esModule?e:{default:e}}function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function u(e,t){return(u=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function s(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,o=f(e);if(t){var r=f(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return d(this,n)}}function d(e,t){return!t||"object"!==a(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function f(e){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var m=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&u(e,t)}(a,e);var t,n,r,i=s(a);function a(){return c(this,a),i.apply(this,arguments)}return t=a,(n=[{key:"getSrc",value:function(){var e=Number(this.props.commentId).toString(36),t=this.props.showParentComment?"1":"0",n=this.props.showMedia?"1":"0";return"https://embed.disqus.com/p/".concat(e,"?p=").concat(t,"&m=").concat(n)}},{key:"render",value:function(){return o.default.createElement("iframe",{src:this.getSrc(),width:this.props.width,height:this.props.height,seamless:"seamless",scrolling:"no",frameBorder:"0"})}}])&&l(t.prototype,n),r&&l(t,r),a}(o.default.Component);t.CommentEmbed=m,m.defaultProps={showMedia:!0,showParentComment:!0,width:420,height:320},m.propTypes={commentId:r.default.string.isRequired,showMedia:r.default.bool,showParentComment:r.default.bool,width:r.default.number,height:r.default.number}},1629:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.DiscussionEmbed=void 0;var o=a(n(7294)),r=a(n(5697)),i=n(3222);function a(e){return e&&e.__esModule?e:{default:e}}function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function d(e,t){return(d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function f(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,o=p(e);if(t){var r=p(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return m(this,n)}}function m(e,t){return!t||"object"!==c(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var g=["preData","preInit","onInit","onReady","afterRender","preReset","onIdentify","beforeComment","onNewComment","onPaginate"],h=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(c,e);var t,n,r,a=f(c);function c(){return u(this,c),a.apply(this,arguments)}return t=c,(n=[{key:"componentDidMount",value:function(){"undefined"!=typeof window&&window.disqus_shortname&&window.disqus_shortname!==this.props.shortname&&this.cleanInstance(),this.loadInstance()}},{key:"shouldComponentUpdate",value:function(e){return this.props!==e&&(0,i.shallowComparison)(this.props,e)}},{key:"componentDidUpdate",value:function(e){this.props.shortname!==e.shortname&&this.cleanInstance(),this.loadInstance()}},{key:"loadInstance",value:function(){var e=window.document;window&&window.DISQUS&&e.getElementById("dsq-embed-scr")?window.DISQUS.reset({reload:!0,config:this.getDisqusConfig(this.props.config)}):(window.disqus_config=this.getDisqusConfig(this.props.config),window.disqus_shortname=this.props.shortname,(0,i.insertScript)("https://".concat(this.props.shortname,".disqus.com/embed.js"),"dsq-embed-scr",e.body))}},{key:"cleanInstance",value:function(){var e=window.document;(0,i.removeScript)("dsq-embed-scr",e.body),window&&window.DISQUS&&window.DISQUS.reset({});try{delete window.DISQUS}catch(n){window.DISQUS=void 0}var t=e.getElementById("disqus_thread");if(t)for(;t.hasChildNodes();)t.removeChild(t.firstChild)}},{key:"getDisqusConfig",value:function(e){return function(){var t=this;this.page.identifier=e.identifier,this.page.url=e.url,this.page.title=e.title,this.page.category_id=e.categoryID,this.page.remote_auth_s3=e.remoteAuthS3,this.page.api_key=e.apiKey,e.language&&(this.language=e.language),g.forEach((function(n){t.callbacks[n]=[e[n]]}))}}},{key:"render",value:function(){return o.default.createElement("div",l({},this.props,{id:"disqus_thread"}))}}])&&s(t.prototype,n),r&&s(t,r),c}(o.default.Component);t.DiscussionEmbed=h,h.propTypes={shortname:r.default.string.isRequired,config:r.default.shape({identifier:r.default.string,url:r.default.string,title:r.default.string,language:r.default.string,categoryID:r.default.string,remoteAuthS3:r.default.string,apiKey:r.default.string,preData:r.default.func,preInit:r.default.func,onInit:r.default.func,onReady:r.default.func,afterRender:r.default.func,preReset:r.default.func,onIdentify:r.default.func,beforeComment:r.default.func,onNewComment:r.default.func,onPaginate:r.default.func}).isRequired}},7202:function(e,t,n){"use strict";Object.defineProperty(t,"qw",{enumerable:!0,get:function(){return i.DiscussionEmbed}});var o=n(6837),r=n(9888),i=n(1629);o.CommentCount,r.CommentEmbed,i.DiscussionEmbed},3222:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.insertScript=function(e,t,n){var o=window.document.createElement("script");return o.async=!0,o.src=e,o.id=t,n.appendChild(o),o},t.removeScript=function(e,t){var n=window.document.getElementById(e);n&&t.removeChild(n)},t.debounce=function(e,t,n){var o;return function(){var r=this,i=arguments,a=function(){o=null,n||e.apply(r,i)},c=n&&!o;window.clearTimeout(o),o=setTimeout(a,t),c&&e.apply(r,i)}},t.isReactElement=c,t.shallowComparison=function e(t,n){var o,r=function(e){if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=function(e,t){if(!e)return;if("string"==typeof e)return a(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return a(e,t)}(e))){var t=0,n=function(){};return{s:n,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,r,i=!0,c=!1;return{s:function(){o=e[Symbol.iterator]()},n:function(){var e=o.next();return i=e.done,e},e:function(e){c=!0,r=e},f:function(){try{i||null==o.return||o.return()}finally{if(c)throw r}}}}(new Set(Object.keys(t),Object.keys(n)));try{for(r.s();!(o=r.n()).done;){var l=o.value;if("object"===i(t[l])){if(e(t[l],n[l]))return!0}else if(t[l]!==n[l]&&!c(t[l]))return!0}}catch(u){r.e(u)}finally{r.f()}return!1};var o,r=(o=n(7294))&&o.__esModule?o:{default:o};function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}function c(e){return!!r.default.isValidElement(e)||!!Array.isArray(e)&&e.some((function(e){return r.default.isValidElement(e)}))}},5819:function(e,t,n){"use strict";n.d(t,{y:function(){return a}});var o=n(5444),r=n(9692),i=n(106),a=(0,r.ZP)(o.Link).withConfig({displayName:"call-to-action-internal__CallToActionInternal",componentId:"sc-1b41n4h-0"})(["",""],i.f)},2051:function(e,t,n){"use strict";n.d(t,{X:function(){return i}});var o=n(9692),r=n(873),i=o.ZP.h2.withConfig({displayName:"heading2__Heading2",componentId:"sc-1srdi6x-0"})(["font-size:",";",""],(function(e){return e.theme.fontSizes[10]}),r.J)},2266:function(e,t,n){"use strict";n.d(t,{y:function(){return i},k:function(){return a}});var o=n(9692),r=n(873),i=(0,o.iv)(["font-size:",";",""],(function(e){return e.theme.fontSizes[8]}),r.J),a=o.ZP.h4.withConfig({displayName:"heading4__Heading4",componentId:"sm7uh8-0"})(["",""],i)},9590:function(e,t,n){"use strict";n.d(t,{C:function(){return i}});var o=n(9692),r=n(873),i=o.ZP.h6.withConfig({displayName:"heading6__Heading6",componentId:"sc-1k2esb-0"})(["font-size:",";",""],(function(e){return e.theme.fontSizes[6]}),r.J)},8150:function(e,t,n){"use strict";n.d(t,{B:function(){return a}});var o=n(9692),r=n(3077),i=n(5444),a=(0,o.ZP)(i.Link).withConfig({displayName:"standard-internal-link__StandardInternalLink",componentId:"sc-3nuxs-0"})(["",""],r.L)},5968:function(e,t,n){"use strict";n.d(t,{q:function(){return o}});var o=n(9692).ZP.time.withConfig({displayName:"time__Time",componentId:"a9frgs-0"})(["color:",";@media (prefers-color-scheme:dark){color:",";}"],(function(e){return e.theme.light.secondaryTextColor}),(function(e){return e.theme.dark.secondaryTextColor}))},5617:function(e,t,n){"use strict";n.d(t,{X:function(){return g}});var o=n(7294),r=n(2429),i={fabrizio_duroni:{name:"Fabrizio Duroni",url:"https://www.linkedin.com/in/fabrizio-duroni/",image:"fabrizio-duroni-small.jpg"},francesco_bonfadelli:{name:"Francesco Bonfadelli",url:"https://www.linkedin.com/in/fbonfadelli/",image:"francesco-bonfadelli.jpg"},alessandro_romano:{name:"Alessandro Romano",url:"https://www.linkedin.com/in/alessandroromano92/",image:"alessandro-romano.jpg"},emanuele_ianni:{name:"Emanuele Ianni",url:"https://www.linkedin.com/in/emanueleianni/",image:"emanuele-ianni.jpg"},tommaso_resti:{name:"Tommaso Resti",url:"https://www.linkedin.com/in/tommaso-resti-0ab5285a/",image:"tommaso-resti.jpg"},mariano_patafio:{name:"Mariano Patafio",url:"https://www.linkedin.com/in/mariano-patafio-4a8b7426/",image:"mariano-patafio.jpg"},angelo_sciarra:{name:"Angelo Sciarra",url:"https://www.linkedin.com/in/angelosciarra/",image:"angelo-sciarra.jpg"},giordano_tamburrelli:{name:"Giordano Tamburrelli",url:"https://www.linkedin.com/in/giordano-tamburrelli-b532334/",image:"giordano-tamburrelli.jpg"},felice_giovinazzo:{name:"Felice Giovinazzo",url:"https://www.linkedin.com/in/felice-giovinazzo-17277b55/",image:"felice-giovinazzo.jpg"},marco_delucchi:{name:"Marco De Lucchi",url:"https://www.linkedin.com/in/marcodelucchi/",image:"marco-delucchi.jpg"}},a=n(5444),c=n(9692),l=n(4900),u=n(8590),s=n(5870),d=n(7442),f=(0,c.ZP)(l.M).withConfig({displayName:"post-authors__PostAuthorsContainer",componentId:"sc-1fx2d9j-0"})(["padding:0;margin:"," 0;display:flex;flex-direction:column;"],(function(e){return e.theme.spacing[2]})),m=(0,c.ZP)(l.M).withConfig({displayName:"post-authors__PostAuthorContainer",componentId:"sc-1fx2d9j-1"})(["padding:0;margin-top:",";display:flex;align-items:center;"],(function(e){return e.theme.spacing[0]})),p=c.ZP.div.withConfig({displayName:"post-authors__PostAuthorImageContainer",componentId:"sc-1fx2d9j-2"})(["width:30px;height:30px;margin-right:5px;border-radius:50%;background-color:",";@media (prefers-color-scheme:dark){background-color:",";}"],(function(e){return e.theme.light.dividerColor}),(function(e){return e.theme.dark.dividerColor})),g=function(e){var t=e.authors,n=e.trackingCategory,c=e.trackingLabel,l=e.enableUrl,g=(0,a.useStaticQuery)("3736063423");return o.createElement(f,null,t.map((function(e){var t=i[e],a=g.allFile.edges.find((function(t){return t.node.name===e.replace("_","-")})).node.childImageSharp.gatsbyImageData;return o.createElement(m,{key:""+e+Math.floor(100*Math.random())},o.createElement(p,null,o.createElement(u.G,{alt:t.name,image:a,style:{width:30,height:30,marginRight:"5px",borderRadius:"50%"},imgStyle:{borderRadius:"50%"}})),o.createElement(s.n,null,l&&o.createElement(d.K,{onClick:function(){return(0,r.j)(r.U.action.open_blog_author,n,c)},href:t.url,target:"_blank"},t.name),!l&&t.name))})))}},9217:function(e,t,n){"use strict";n.d(t,{S:function(){return c}});var o=n(7294),r=n(5968),i=n(5870),a=(0,n(9692).ZP)(i.n).withConfig({displayName:"post-meta__PostMetaParagraph",componentId:"podp76-0"})(["margin:"," 0 "," 0;color:",";@media (prefers-color-scheme:dark){color:",";}"],(function(e){return e.theme.spacing[0]}),(function(e){return e.theme.spacing[3]}),(function(e){return e.theme.light.secondaryTextColor}),(function(e){return e.theme.dark.secondaryTextColor})),c=function(e){var t=e.date,n=e.readingTime;return o.createElement(a,null,o.createElement(r.q,null,t)," · ",o.createElement(r.q,null,n))}},1818:function(e,t,n){"use strict";n.d(t,{V:function(){return l}});var o=n(8150),r=n(9692),i=n(7294),a=(0,r.ZP)(o.B).withConfig({displayName:"tag__TagLink",componentId:"ipvbvr-0"})(["display:inline-block;height:46px;text-decoration:none;&:hover{text-decoration:none;}",""],(function(e){return!0===e.big&&(0,r.iv)(["margin-bottom:",";"],(function(e){return e.theme.spacing[4]}))})),c=r.ZP.span.withConfig({displayName:"tag__TagText",componentId:"ipvbvr-1"})(["background-color:",";color:",";margin-right:",";margin-bottom:",";border-radius:3px;font-size:",";padding:0.5px 5px;",";@media (prefers-color-scheme:dark){background-color:",";color:",";}"],(function(e){return e.theme.light.primaryColor}),(function(e){return e.theme.light.textAbovePrimaryColor}),(function(e){return e.theme.spacing[0]}),(function(e){return e.theme.spacing[0]}),(function(e){return e.big?e.theme.fontSizes[5]:e.theme.fontSizes[1]}),(function(e){return e.big&&(0,r.iv)(["display:block;margin-right:",";margin-bottom:",";"],(function(e){return e.theme.spacing[4]}),(function(e){return e.theme.spacing[4]}))}),(function(e){return e.theme.dark.primaryColor}),(function(e){return e.theme.dark.textAbovePrimaryColor})),l=function(e){var t=e.tag,n=e.link,o=e.big;return i.createElement(a,{to:n,big:o},i.createElement(c,{big:o},t))}},6131:function(e,t,n){"use strict";n.d(t,{v:function(){return S}});var o=n(6919),r=n(7294),i=n(2429),a=n(8428),c=n(9692),l=n(73),u=n(7296),s=c.ZP.div.withConfig({displayName:"menu__MenuContainer",componentId:"sc-1uxs1ch-0"})(["background-color:",";box-shadow:inset 0 -2px 5px rgba(0,0,0,0.1);position:fixed;top:0;width:100%;height:55px;z-index:300;@media (prefers-color-scheme:dark){background-color:",";}"],(function(e){return e.theme.light.primaryColor}),(function(e){return e.theme.dark.primaryColor})),d=(0,c.ZP)(l.W).withConfig({displayName:"menu__NavBar",componentId:"sc-1uxs1ch-1"})(["display:flex;align-items:center;height:55px;"]),f=(0,c.ZP)(a.s).withConfig({displayName:"menu__NavBarMenuItem",componentId:"sc-1uxs1ch-2"})(["position:relative;display:inline-block;margin-right:15px;height:55px;line-height:70px;font-size:",";",";"],(function(e){return e.theme.fontSizes[5]}),(function(e){return e.selected&&(0,c.iv)(['&:after{position:absolute;bottom:0;left:50%;width:0;height:0;margin-left:-5px;content:" ";border-right:5px solid transparent;border-bottom:5px solid ',";border-left:5px solid transparent;@media (prefers-color-scheme:dark){border-bottom:5px solid ",";}"],(function(e){return e.theme.light.generalBackground}),(function(e){return e.theme.dark.generalBackground}))})),m=function(e){var t=e.trackingCategory,n=e.pathname;return r.createElement(s,null,r.createElement(d,null,r.createElement(f,{selected:"/"===n,to:"/",onClick:function(){(0,i.j)(i.U.action.open_home,t,i.U.label.header)}},"Home"),r.createElement(f,{selected:n!==u.H8.aboutMe,to:u.H8.blog,onClick:function(){(0,i.j)(i.U.action.open_blog,t,i.U.label.header)}},"Blog"),r.createElement(f,{selected:n===u.H8.aboutMe,to:u.H8.aboutMe,onClick:function(){(0,i.j)(i.U.action.open_about_me,t,i.U.label.header)}},"About me")))},p=n(8590),g=n(9381),h=c.ZP.div.withConfig({displayName:"blog-header__BlogHeaderContainer",componentId:"sc-15cvfv8-0"})(["display:flex;align-items:center;margin-top:50px;margin-bottom:20px;"]),b=c.ZP.div.withConfig({displayName:"blog-header__BlogHeaderColumn",componentId:"sc-15cvfv8-1"})(["display:flex;flex-direction:column;justify-content:center;"]),y=(0,c.ZP)(g.a).withConfig({displayName:"blog-header__BlogTitle",componentId:"sc-15cvfv8-2"})(["color:",";margin:0;font-weight:bold;display:block;line-height:1.5;@media (prefers-color-scheme:dark){color:",";}@media (max-width:992px){font-size:28px;}@media (max-width:320px){font-size:22px;}"],(function(e){return e.theme.light.primaryTextColor}),(function(e){return e.theme.dark.primaryTextColor})),w=c.ZP.span.withConfig({displayName:"blog-header__BlogDescription",componentId:"sc-15cvfv8-3"})(["display:block;font-size:",";color:",";line-height:1.5;@media (prefers-color-scheme:dark){color:",";}@media (max-width:992px){font-size:12px;}@media (max-width:320px){font-size:10px;}"],(function(e){return e.theme.fontSizes[4]}),(function(e){return e.theme.light.secondaryTextColor}),(function(e){return e.theme.dark.secondaryTextColor})),k=c.ZP.div.withConfig({displayName:"blog-header__ImageContainer",componentId:"sc-15cvfv8-4"})(["width:80px;height:80px;background-color:",";margin-right:",";border-radius:10px;box-shadow:1px 1px 4px rgba(0,0,0,0.575);@media (prefers-color-scheme:dark){background-color:",";}"],(function(e){return e.theme.light.generalBackgroundLight}),(function(e){return e.theme.spacing[2]}),(function(e){return e.theme.dark.generalBackgroundLight})),v=function(){return r.createElement(h,null,r.createElement(k,null,r.createElement(p.S,{src:"../../../images/blog-logo.jpg",alt:"blog logo",width:80,height:80,imgStyle:{borderRadius:"10px",boxShadow:"1px 1px 4px rgba(0, 0, 0, 0.575)"},__imageData:n(2634)})),r.createElement(b,null,r.createElement(y,null,"CHICIO CODING"),r.createElement(w,null,"Dirty clean code. Creative Stuff. Stuff.")))},x=n(7235),_=n(1228),C=(0,c.ZP)(l.W).withConfig({displayName:"blog-page__BlogContainer",componentId:"lwo3id-0"})(["margin-top:",";flex:1 0 auto;"],(function(e){return e.theme.spacing[12]})),S=function(e){var t=e.children,n=e.location,i=e.author,a=e.ogPageType,c=e.ogImage,l=e.trackingCategory;return r.createElement(x.T,null,r.createElement(o.F,{url:n.url,pageType:a,imageUrl:c}),r.createElement(m,{trackingCategory:l,pathname:n.pathname}),r.createElement(C,null,r.createElement(v,null),t),r.createElement(_.$,{author:i,trackingCategory:l}))}},1727:function(e,t,n){"use strict";n.d(t,{G:function(){return o}});var o=function(e){return{url:e.href,pathname:e.pathname}}},3169:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return B}});var o=n(7294),r=n(2429),i=n(7202),a=n(9692),c=a.ZP.div.withConfig({displayName:"comments__CommentsContainer",componentId:"sc-9a7sbz-0"})(["margin-bottom:",';#thread__container{font-family:"Open Sans",Arial,sans-serif;}'],(function(e){return e.theme.spacing[7]})),l=function(e){var t=e.url,n=e.title;return o.createElement(c,null,o.createElement(i.qw,{shortname:"fabrizio-duroni",config:{identifier:t,url:t,title:n}}))},u=n(9217),s=n(5617),d=n(5444),f=n(2266),m=n(5819),p=n(9590),g=n(8590),h=n(5870),b=(0,a.ZP)(m.y).withConfig({displayName:"recent-post-card__CardButton",componentId:"sc-1jf73m0-0"})(["margin-top:auto;display:block;"]),y=a.ZP.div.withConfig({displayName:"recent-post-card__CardDescriptionContainer",componentId:"sc-1jf73m0-1"})(["margin:",";display:flex;flex-direction:column;flex-grow:1;"],(function(e){return e.theme.spacing[3]})),w=(0,a.ZP)(p.C).withConfig({displayName:"recent-post-card__CardHeading",componentId:"sc-1jf73m0-2"})(["margin-bottom:",";margin-right:0;margin-left:0;"],(function(e){return e.theme.spacing[3]})),k=a.ZP.div.withConfig({displayName:"recent-post-card__CardContainer",componentId:"sc-1jf73m0-3"})(["background-color:",";box-shadow:"," 0 3px 10px 0;width:100%;border-radius:4px;border:none;margin:"," 0 0 0;display:flex;flex-direction:column;@media (min-width:992px){margin:0 ",";transition:all 0.2s;&:hover{transform:scale(1.025);}}@media (prefers-color-scheme:dark){background-color:",";box-shadow:"," 0 3px 10px 0;}"],(function(e){return e.theme.light.generalBackgroundLight}),(function(e){return e.theme.light.boxShadowLight}),(function(e){return e.theme.spacing[2]}),(function(e){return e.margin?e.theme.spacing[2]:""}),(function(e){return e.theme.dark.generalBackgroundLight}),(function(e){return e.theme.dark.boxShadowLight})),v=function(e){var t=e.position,n=e.slug,i=e.title,a=e.image,c=e.description,l=e.trackingCategory,u=e.trackingLabel;return o.createElement(k,{margin:1===t},o.createElement(g.G,{style:{overflow:"hidden",height:"200px"},imgStyle:{borderTopLeftRadius:"4px",borderTopRightRadius:"4px",width:"100%",height:"100%",objectFit:"cover"},alt:i,image:a}),o.createElement(y,null,o.createElement(w,null,i),o.createElement(h.n,null,c.length>150?(null==c?void 0:c.substr(0,150))+"...":c),o.createElement(b,{key:n+"link",to:n,onClick:function(){return(0,r.j)(r.U.action.open_blog_post,l,u)}},"Read More")))},x=(0,a.ZP)(f.k).withConfig({displayName:"recent-posts__RecentTitle",componentId:"ivzofl-0"})(["margin:"," 0;"],(function(e){return e.theme.spacing[2]})),_=a.ZP.div.withConfig({displayName:"recent-posts__CardsContainer",componentId:"ivzofl-1"})(["display:block;width:100%;@media (min-width:992px){display:flex;flex-direction:row;}"]),C=a.ZP.div.withConfig({displayName:"recent-posts__RecentPostsContainer",componentId:"ivzofl-2"})(["margin-bottom:",";"],(function(e){return e.theme.spacing[4]})),S=function(e){var t=e.currentSlug,n=(0,d.useStaticQuery)("4159577854");return o.createElement(C,null,o.createElement(x,null,"Recent posts"),o.createElement(_,null,n.allMarkdownRemark.edges.filter((function(e){return e.node.fields.slug!==t})).slice(0,3).map((function(e,t){return o.createElement(v,{key:e.node.fields.slug,position:t,slug:e.node.fields.slug,title:e.node.frontmatter.title,image:e.node.frontmatter.image.childImageSharp.gatsbyImageData,description:e.node.frontmatter.description,trackingCategory:r.U.category.blog_post,trackingLabel:r.U.label.body})}))))},I=n(6131),E=n(1818),P=n(7296),j=a.ZP.div.withConfig({displayName:"post-tags__PostTagsContainer",componentId:"sc-1g8mf1n-0"})(["margin:"," 0;"],(function(e){return e.theme.spacing[4]})),z=function(e){var t=e.tags;return o.createElement(j,null,t.map((function(e){return o.createElement(E.V,{tag:e,link:(0,P.j7)(e),big:!1,key:e})})))},T=n(2051),O=n(9381),R=n(3077),D=(0,a.iv)(['code[class*="language-"],pre[class*="language-"]{-moz-tab-size:2;-o-tab-size:2;tab-size:2;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;white-space:pre;white-space:pre-wrap;word-wrap:normal;font-family:Menlo,Monaco,"Courier New",monospace;font-size:14px;color:#76d9e6;text-shadow:none;background:#2a2a2a;}pre > code[class*="language-"]{font-size:1em;}code[class*="language-text"]{border-radius:2px;padding:3px;}pre[class*="language-"]{padding:15px;border-radius:4px;border:1px solid #e1e1e8;overflow:auto;position:relative;}pre[class*="language-"] code{white-space:pre;display:block;}:not(pre) > code[class*="language-"]{padding:0.15em 0.2em 0.05em;border-radius:0.3em;border:0.13em solid #7a6652;box-shadow:1px 1px 0.3em -0.1em #000 inset;}.token.namespace{opacity:0.7;}.token.comment,.token.prolog,.token.doctype,.token.cdata{color:#6f705e;}.token.operator,.token.boolean,.token.number{color:#a77afe;}.token.attr-name,.token.string{color:#e6d06c;}.token.entity,.token.url,.language-css .token.string,.style .token.string{color:#e6d06c;}.token.selector,.token.inserted{color:#a6e22d;}.token.atrule,.token.attr-value,.token.keyword,.token.important,.token.deleted{color:#ef3b7d;}.token.regex,.token.statement{color:#76d9e6;}.token.placeholder,.token.variable{color:#fff;}.token.important,.token.statement,.token.bold{font-weight:bold;}.token.punctuation{color:#bebec5;}.token.entity{cursor:help;}.token.italic{font-style:italic;}code.language-markup{color:#f9f9f9;}code.language-markup .token.tag{color:#ef3b7d;}code.language-markup .token.attr-name{color:#a6e22d;}code.language-markup .token.attr-value{color:#e6d06c;}code.language-markup .token.style,code.language-markup .token.script{color:#76d9e6;}code.language-markup .token.script .token.keyword{color:#76d9e6;}pre[class*="language-"][data-line]{position:relative;padding:1em 0 1em 3em;}pre[data-line] .line-highlight{position:absolute;left:0;right:0;padding:0;margin-top:1em;background:rgba(255,255,255,0.08);pointer-events:none;line-height:inherit;white-space:pre;}pre[data-line] .line-highlight:before,pre[data-line] .line-highlight[data-end]:after{content:attr(data-start);position:absolute;top:0.4em;left:0.6em;min-width:1em;padding:0.2em 0.5em;background-color:rgba(255,255,255,0.4);color:black;font:bold 65%/1 sans-serif;height:1em;line-height:1em;text-align:center;border-radius:999px;text-shadow:none;box-shadow:0 1px 1px rgba(255,255,255,0.7);}pre[data-line] .line-highlight[data-end]:after{content:attr(data-end);top:auto;bottom:0.4em;}']),N=a.ZP.div.withConfig({displayName:"post-content__PostContentContainer",componentId:"sc-1xh5k9t-0"})(["color:",";line-height:1.5;& ul li{font-size:",";line-height:",";}& p{font-size:",";margin-left:0;margin-right:0;line-height:",";}& figure figcaption{font-size:",";text-align:center;line-height:",";}& h3{",";margin-left:0;margin-right:0;line-height:",";}& h4{",";margin-left:0;margin-right:0;line-height:",";}& a{",";line-height:",";}& blockquote{line-height:",";color:",";border-left:5px solid ",";margin-left:0;margin-right:0;padding:"," ",";}& blockquote p{line-height:",";margin-bottom:0;margin-top:0;}& hr{color:",";background-color:",";width:100%;margin:"," 0;border:0;border-top:1px solid rgba(0,0,0,0.1);}@media (prefers-color-scheme:dark){color:",";& blockquote{color:",";border-left:5px solid ",";}& hr{color:",";background-color:",";}}& .embedVideo-container{position:relative;padding-bottom:56.25%;height:100%;width:100%;overflow:hidden;margin:"," 0;}& .embedVideo-container iframe,.embedVideo-container object,.embedVideo-container embed{position:absolute;top:0;left:0;width:100%;height:100%;}& .katex-display > .katex{display:inline-block;white-space:nowrap;max-width:100%;overflow-x:scroll;text-align:initial;line-height:",";}& .katex *{font-size:",";}& .emoji-icon{top:4px;}",""],(function(e){return e.theme.light.primaryTextColor}),(function(e){return e.theme.fontSizes[2]}),(function(e){return e.theme.lineHeight}),(function(e){return e.theme.fontSizes[2]}),(function(e){return e.theme.lineHeight}),(function(e){return e.theme.fontSizes[1]}),(function(e){return e.theme.lineHeight}),O.m,(function(e){return e.theme.lineHeight}),f.y,(function(e){return e.theme.lineHeight}),R.L,(function(e){return e.theme.lineHeight}),(function(e){return e.theme.lineHeight}),(function(e){return e.theme.light.secondaryTextColor}),(function(e){return e.theme.light.secondaryTextColor}),(function(e){return e.theme.spacing[4]}),(function(e){return e.theme.spacing[2]}),(function(e){return e.theme.lineHeight}),(function(e){return e.theme.light.dividerColor}),(function(e){return e.theme.light.dividerColor}),(function(e){return e.theme.spacing[4]}),(function(e){return e.theme.dark.primaryTextColor}),(function(e){return e.theme.dark.secondaryTextColor}),(function(e){return e.theme.dark.secondaryTextColor}),(function(e){return e.theme.dark.dividerColor}),(function(e){return e.theme.dark.dividerColor}),(function(e){return e.theme.spacing[2]}),(function(e){return e.theme.lineHeight}),(function(e){return e.theme.fontSizes[4]}),D),q=function(e){var t=e.html;return o.createElement(N,{dangerouslySetInnerHTML:{__html:t}})},M=n(9184),Z=n(1727),U=(0,a.ZP)(T.X).withConfig({displayName:"post__PostTitle",componentId:"dbb7o3-0"})(["margin:0;"]),B=function(e){var t,i,a,c=e.data,d=e.location,f=c.markdownRemark;return!0===(null===(t=f.frontmatter)||void 0===t?void 0:t.math)&&n(749),o.createElement(I.v,{location:(0,Z.G)(d),author:c.site.siteMetadata.author,ogPageType:M.E8.BlogPosting,ogImage:""+(0,g.e)(null===(i=f.frontmatter.image.childImageSharp)||void 0===i?void 0:i.gatsbyImageData),trackingCategory:r.U.category.blog_post},o.createElement("div",null,o.createElement(U,{className:"blog-post-title"},f.frontmatter.title),o.createElement(s.X,{authors:f.frontmatter.authors,trackingCategory:r.U.category.blog_post,trackingLabel:r.U.label.body,enableUrl:!0}),o.createElement(u.S,{date:f.frontmatter.date,readingTime:f.fields.readingTime.text}),o.createElement(q,{html:f.html}),o.createElement(z,{tags:f.frontmatter.tags})),o.createElement(S,{currentSlug:d.pathname}),(null===(a=f.frontmatter)||void 0===a?void 0:a.comments)&&o.createElement(l,{url:d.href,title:f.frontmatter.title}))}},749:function(e,t,n){"use strict";n.r(t)}}]);
//# sourceMappingURL=component---src-templates-post-tsx-dcc8bbbb08e475dead29.js.map