(self.__LOADABLE_LOADED_CHUNKS__=self.__LOADABLE_LOADED_CHUNKS__||[]).push([[542],{2634:function(e){"use strict";e.exports=JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/c10cb9c09863cc59eaf2f00e35508ee4/499f6/blog-logo.jpg","srcSet":"/static/c10cb9c09863cc59eaf2f00e35508ee4/f4935/blog-logo.jpg 20w,\\n/static/c10cb9c09863cc59eaf2f00e35508ee4/2f28c/blog-logo.jpg 40w,\\n/static/c10cb9c09863cc59eaf2f00e35508ee4/499f6/blog-logo.jpg 80w","sizes":"(min-width: 80px) 80px, 100vw"},"sources":[{"srcSet":"/static/c10cb9c09863cc59eaf2f00e35508ee4/264f2/blog-logo.webp 20w,\\n/static/c10cb9c09863cc59eaf2f00e35508ee4/e73fe/blog-logo.webp 40w,\\n/static/c10cb9c09863cc59eaf2f00e35508ee4/61ca6/blog-logo.webp 80w","type":"image/webp","sizes":"(min-width: 80px) 80px, 100vw"}]},"width":80,"height":80}')},4900:function(e,t,n){"use strict";n.d(t,{M:function(){return o}});var o=n(9692).ZP.div.withConfig({displayName:"container-fluid__ContainerFluid",componentId:"sc-13iqbmo-0"})(["width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto;"])},73:function(e,t,n){"use strict";n.d(t,{W:function(){return i}});var o=n(9692),r=n(4900),i=(0,o.ZP)(r.M).withConfig({displayName:"container__Container",componentId:"s0w66r-0"})(["@media (min-width:576px){max-width:540px;}@media (min-width:768px){max-width:720px;}@media (min-width:992px){max-width:960px;}"])},4031:function(e,t,n){"use strict";n.d(t,{n:function(){return i}});var o=n(9692),r=n(873),i=o.ZP.h1.withConfig({displayName:"heading1__Heading1",componentId:"w0yobe-0"})(["font-size:",";",""],(function(e){return e.theme.fontSizes[12]}),r.J)},9381:function(e,t,n){"use strict";n.d(t,{m:function(){return i},a:function(){return a}});var o=n(9692),r=n(873),i=(0,o.iv)(["font-size:",";",""],(function(e){return e.theme.fontSizes[9]}),r.J),a=o.ZP.h3.withConfig({displayName:"heading3__Heading3",componentId:"sc-13l3151-0"})(["",""],i)},3077:function(e,t,n){"use strict";n.d(t,{L:function(){return o}});var o=(0,n(9692).iv)(["font-size:",";color:",";text-decoration:none;line-height:",";@media (prefers-color-scheme:dark){color:",";}&:hover{color:",";@media (prefers-color-scheme:dark){color:",";}}"],(function(e){return e.theme.fontSizes[2]}),(function(e){return e.theme.light.accentColor}),(function(e){return e.theme.lineHeight}),(function(e){return e.theme.dark.accentColor}),(function(e){return e.theme.light.accentColor}),(function(e){return e.theme.dark.accentColor}))},5968:function(e,t,n){"use strict";n.d(t,{q:function(){return o}});var o=n(9692).ZP.time.withConfig({displayName:"time__Time",componentId:"a9frgs-0"})(["color:",";@media (prefers-color-scheme:dark){color:",";}"],(function(e){return e.theme.light.secondaryTextColor}),(function(e){return e.theme.dark.secondaryTextColor}))},3115:function(e,t,n){"use strict";n.d(t,{V:function(){return i}});var o=n(9692),r=n(4031),i=(0,o.ZP)(r.n).withConfig({displayName:"page-title__PageTitle",componentId:"sc-16x4i1r-0"})(["margin-left:0;margin-right:0;margin-bottom:",";"],(function(e){return e.theme.spacing[4]}))},7761:function(e,t,n){"use strict";n.d(t,{v:function(){return f}});var o,r=n(7294),i=n(2429),a=n(9692),c=n(73),l=n(7296),u=n(3703),s=a.ZP.div.withConfig({displayName:"menu__MenuContainer",componentId:"sc-1uxs1ch-0"})(["background-color:",";box-shadow:inset 0 -2px 5px rgba(0,0,0,0.1);position:fixed;top:",";transition:top 0.3s ease 0s;width:100%;height:55px;z-index:300;@media (prefers-color-scheme:dark){background-color:",";}"],(function(e){return e.theme.light.primaryColor}),(function(e){return e.shouldHide?"-55px":0}),(function(e){return e.theme.dark.primaryColor})),d=(0,a.ZP)(c.W).withConfig({displayName:"menu__NavBar",componentId:"sc-1uxs1ch-1"})(["display:flex;align-items:center;height:55px;"]),m=(0,a.ZP)(u.C).withConfig({displayName:"menu__NavBarMenuItem",componentId:"sc-1uxs1ch-2"})(["position:relative;display:inline-block;margin-right:15px;height:55px;line-height:70px;font-size:",";",";"],(function(e){return e.theme.fontSizes[5]}),(function(e){return e.selected&&(0,a.iv)(['&:after{position:absolute;bottom:0;left:50%;width:0;height:0;margin-left:-5px;content:" ";border-right:5px solid transparent;border-bottom:5px solid ',";border-left:5px solid transparent;@media (prefers-color-scheme:dark){border-bottom:5px solid ",";}"],(function(e){return e.theme.light.generalBackground}),(function(e){return e.theme.dark.generalBackground}))}));!function(e){e[e.up=0]="up",e[e.down=1]="down"}(o||(o={}));var g=function(){var e=(0,r.useState)(o.up),t=e[0],n=e[1];return(0,r.useEffect)((function(){var e=window.pageYOffset,t=function(){var t=window.pageYOffset;if(function(t){return Math.abs(t-e)>100}(t)){var r=function(t){return t>e}(t)?o.down:o.up;n(r),e=t>0?t:0}},r=function(){return window.requestAnimationFrame(t)};return window.addEventListener("scroll",r),function(){return window.removeEventListener("scroll",r)}}),[]),t},f=function(e){var t=e.trackingCategory,n=e.pathname,a=g();return r.createElement(s,{shouldHide:a==o.down},r.createElement(d,null,r.createElement(m,{selected:"/"===n,to:"/",trackingData:{action:i.U.action.open_home,category:t,label:i.U.label.header}},"Home"),r.createElement(m,{selected:n!==l.H8.aboutMe,to:l.H8.blog,trackingData:{action:i.U.action.open_blog,category:t,label:i.U.label.header}},"Blog"),r.createElement(m,{selected:n===l.H8.aboutMe,to:l.H8.aboutMe,trackingData:{action:i.U.action.open_about_me,category:t,label:i.U.label.header}},"About me")))}},5511:function(e,t,n){"use strict";n.d(t,{$:function(){return h}});var o=n(9692),r=n(4900),i=n(5968),a=n(7294),c=n(397),l=n(2429),u=n(3115),s=n(9393),d=(0,o.ZP)(r.M).withConfig({displayName:"blog-generic-post-list-page__PostContainer",componentId:"sc-1ou1hac-0"})(["display:flex;flex-direction:column;align-items:flex-start;margin-bottom:",";padding-left:0;padding-right:0;@media (min-width:992px){flex-direction:row;align-items:center;}"],(function(e){return e.theme.spacing[3]})),m=o.ZP.div.withConfig({displayName:"blog-generic-post-list-page__Column",componentId:"sc-1ou1hac-1"})(["@media (min-width:992px){flex:",";}"],(function(e){return e.size})),g=(0,o.ZP)(i.q).withConfig({displayName:"blog-generic-post-list-page__PostTime",componentId:"sc-1ou1hac-2"})(["font-size:",";"],(function(e){return e.theme.fontSizes[4]})),f=(0,o.ZP)(s.B).withConfig({displayName:"blog-generic-post-list-page__PostLink",componentId:"sc-1ou1hac-3"})(["font-size:",";"],(function(e){return e.theme.fontSizes[4]})),h=function(e){var t=e.title,n=e.posts,o=e.author,r=e.location,i=e.ogPageType,s=e.ogImage,h=e.trackingCategory;return a.createElement(c.v,{location:r,author:o,ogPageType:i,ogImage:s,trackingCategory:h},a.createElement(u.V,null,t),n.map((function(e){var t,n;return a.createElement(d,{key:e.node.fields.slug},a.createElement(m,{size:"15%"},a.createElement(g,null,null===(t=e.node.frontmatter)||void 0===t?void 0:t.date)),a.createElement(m,{size:"85%"},a.createElement(f,{to:e.node.fields.slug,trackingData:{action:l.U.action.open_blog_post,category:h,label:l.U.label.body}},null===(n=e.node.frontmatter)||void 0===n?void 0:n.title)))})))}},397:function(e,t,n){"use strict";n.d(t,{v:function(){return f}});var o=n(7294),r=n(8590),i=n(9692),a=n(9381),c=i.ZP.div.withConfig({displayName:"blog-header__BlogHeaderContainer",componentId:"sc-15cvfv8-0"})(["display:flex;align-items:center;margin-top:50px;margin-bottom:20px;"]),l=i.ZP.div.withConfig({displayName:"blog-header__BlogHeaderColumn",componentId:"sc-15cvfv8-1"})(["display:flex;flex-direction:column;justify-content:center;"]),u=(0,i.ZP)(a.a).withConfig({displayName:"blog-header__BlogTitle",componentId:"sc-15cvfv8-2"})(["color:",";margin:0;font-weight:bold;display:block;line-height:1.5;@media (prefers-color-scheme:dark){color:",";}@media (max-width:992px){font-size:28px;}@media (max-width:320px){font-size:22px;}"],(function(e){return e.theme.light.primaryTextColor}),(function(e){return e.theme.dark.primaryTextColor})),s=i.ZP.span.withConfig({displayName:"blog-header__BlogDescription",componentId:"sc-15cvfv8-3"})(["display:block;font-size:",";color:",";line-height:1.5;@media (prefers-color-scheme:dark){color:",";}@media (max-width:992px){font-size:12px;}@media (max-width:320px){font-size:10px;}"],(function(e){return e.theme.fontSizes[4]}),(function(e){return e.theme.light.secondaryTextColor}),(function(e){return e.theme.dark.secondaryTextColor})),d=i.ZP.div.withConfig({displayName:"blog-header__ImageContainer",componentId:"sc-15cvfv8-4"})(["width:80px;height:80px;background-color:",";margin-right:",";border-radius:10px;box-shadow:1px 1px 4px rgba(0,0,0,0.575);@media (prefers-color-scheme:dark){background-color:",";}"],(function(e){return e.theme.light.generalBackgroundLight}),(function(e){return e.theme.spacing[2]}),(function(e){return e.theme.dark.generalBackgroundLight})),m=function(){return o.createElement(c,null,o.createElement(d,null,o.createElement(r.S,{src:"../../../images/blog-logo.jpg",alt:"blog logo",width:80,height:80,imgStyle:{borderRadius:"10px",boxShadow:"1px 1px 4px rgba(0, 0, 0, 0.575)"},__imageData:n(2634)})),o.createElement(l,null,o.createElement(u,null,"CHICIO CODING"),o.createElement(s,null,"Dirty clean code. Creative Stuff. Stuff.")))},g=n(1010),f=function(e){var t=e.children,n=e.location,r=e.author,i=e.ogPageType,a=e.ogImage,c=e.trackingCategory,l=e.customTitle,u=e.description,s=e.date;return o.createElement(g.L,{location:n,author:r,ogPageType:i,ogImage:a,trackingCategory:c,customTitle:l,description:u,date:s},o.createElement(m,null),t)}},1010:function(e,t,n){"use strict";n.d(t,{L:function(){return m}});var o=n(6919),r=n(7761),i=n(7235),a=n(7294),c=n(9692),l=n(73),u=n(7880),s=(0,u.default)({resolved:{},chunkName:function(){return"organism-footer".replace(/[^a-zA-Z0-9_!§$()=\-^°]+/g,"-")},isReady:function(e){var t=this.resolve(e);return!0===this.resolved[t]&&!!n.m[t]},importAsync:function(){return Promise.all([n.e(529),n.e(475)]).then(n.bind(n,1228))},requireAsync:function(e){var t=this,n=this.resolve(e);return this.resolved[n]=!1,this.importAsync(e).then((function(e){return t.resolved[n]=!0,e}))},requireSync:function e(t){var o=this.resolve(t);return n(o)},resolve:function e(){return 1228}}),d=(0,c.ZP)(l.W).withConfig({displayName:"page-with-content__ContentContainer",componentId:"sc-1ixn02-0"})(["margin-top:",";flex:1 0 auto;"],(function(e){return e.theme.spacing[12]})),m=function(e){var t=e.children,n=e.location,c=e.author,l=e.ogPageType,u=e.ogImage,m=e.trackingCategory,g=e.customTitle,f=e.description,h=e.date;return a.createElement(i.T,null,a.createElement(o.F,{url:n.url,pageType:l,imageUrl:u,customTitle:g,description:f,date:h}),a.createElement(r.v,{trackingCategory:m,pathname:n.pathname}),a.createElement(d,null,t),a.createElement(s,{author:c,trackingCategory:m}))}},3703:function(e,t,n){"use strict";n.d(t,{C:function(){return l}});var o=n(7294),r=n(2429),i=n(9692),a=n(5444),c=(0,i.ZP)(a.Link).withConfig({displayName:"menu-item__MenuItem",componentId:"ulbibf-0"})(["color:",";font-size:",";font-weight:500;text-decoration:none;line-height:",";&:hover,&:focus{color:",";text-decoration:none;}@media (prefers-color-scheme:dark){color:",";}"],(function(e){return e.selected?e.theme.light.textAbovePrimaryColor:e.theme.light.primaryColorLight}),(function(e){return e.theme.fontSizes[2]}),(function(e){return e.theme.lineHeight}),(function(e){return e.theme.light.textAbovePrimaryColor}),(function(e){return e.selected?e.theme.dark.textAbovePrimaryColor:e.theme.dark.primaryColorLight})),l=function(e){var t=e.children,n=e.className,i=e.to,a=e.trackingData,l=e.selected;return o.createElement(c,{className:n,to:i,onClick:function(){(0,r.$)(a)},selected:l},t)}},9393:function(e,t,n){"use strict";n.d(t,{B:function(){return u}});var o=n(7294),r=n(2429),i=n(9692),a=n(3077),c=n(5444),l=(0,i.ZP)(c.Link).withConfig({displayName:"standard-internal-link__StandardInternalLink",componentId:"sc-3nuxs-0"})(["",""],a.L),u=function(e){var t=e.children,n=e.className,i=e.to,a=e.trackingData;return o.createElement(l,{className:n,to:i,onClick:function(){(0,r.$)(a)}},t)}},1727:function(e,t,n){"use strict";n.d(t,{G:function(){return o}});var o=function(e){return{url:e.href,pathname:e.pathname}}},211:function(e,t,n){"use strict";n.r(t);var o=n(7294),r=n(2429),i=n(5511),a=n(9184),c=n(1727);t.default=function(e){var t=e.data,n=e.location,l=t.site.siteMetadata,u=l.author,s=l.featuredImage;return o.createElement(i.$,{title:"Archive",posts:t.allMarkdownRemark.edges,author:u,location:(0,c.G)(n),ogPageType:a.E8.WebSite,ogImage:s,trackingCategory:r.U.category.blog_archive})}}}]);
//# sourceMappingURL=component---src-pages-blog-archive-tsx-4e5b91a6f5f051e4beff.js.map