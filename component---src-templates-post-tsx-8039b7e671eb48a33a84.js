"use strict";(self.__LOADABLE_LOADED_CHUNKS__=self.__LOADABLE_LOADED_CHUNKS__||[]).push([[186],{12051:function(e,t,n){n.d(t,{X:function(){return i}});var o=n(19692),r=n(40873),i=o.default.h2.withConfig({displayName:"heading2__Heading2",componentId:"sc-1srdi6x-0"})(["font-size:",";",""],(function(e){return e.theme.fontSizes[10]}),r.J)},9381:function(e,t,n){n.d(t,{m:function(){return i},a:function(){return a}});var o=n(19692),r=n(40873),i=(0,o.css)(["font-size:",";",""],(function(e){return e.theme.fontSizes[9]}),r.J),a=o.default.h3.withConfig({displayName:"heading3__Heading3",componentId:"sc-13l3151-0"})(["",""],i)},42266:function(e,t,n){n.d(t,{y:function(){return i},k:function(){return a}});var o=n(19692),r=n(40873),i=(0,o.css)(["font-size:",";",""],(function(e){return e.theme.fontSizes[8]}),r.J),a=o.default.h4.withConfig({displayName:"heading4__Heading4",componentId:"sc-sm7uh8-0"})(["",""],i)},35870:function(e,t,n){n.d(t,{n:function(){return o}});var o=n(19692).default.p.withConfig({displayName:"paragraph__Paragraph",componentId:"sc-jaaqjv-0"})(["font-size:",";color:",";margin:",";line-height:",";@media (prefers-color-scheme:dark){color:",";}"],(function(e){return e.theme.fontSizes[2]}),(function(e){return e.theme.light.primaryTextColor}),(function(e){return e.theme.spacing[0]}),(function(e){return e.theme.lineHeight}),(function(e){return e.theme.dark.primaryTextColor}))},87442:function(e,t,n){n.d(t,{K:function(){return i}});var o=n(19692),r=n(43077),i=o.default.a.withConfig({displayName:"standard-external-link__StandardExternalLink",componentId:"sc-sklbck-0"})(["",""],r.L)},43077:function(e,t,n){n.d(t,{L:function(){return o}});var o=(0,n(19692).css)(["font-size:",";color:",";text-decoration:none;line-height:",";@media (prefers-color-scheme:dark){color:",";}&:hover{color:",";@media (prefers-color-scheme:dark){color:",";}}"],(function(e){return e.theme.fontSizes[2]}),(function(e){return e.theme.light.accentColor}),(function(e){return e.theme.lineHeight}),(function(e){return e.theme.dark.accentColor}),(function(e){return e.theme.light.accentColor}),(function(e){return e.theme.dark.accentColor}))},25968:function(e,t,n){n.d(t,{q:function(){return o}});var o=n(19692).default.time.withConfig({displayName:"time__Time",componentId:"sc-a9frgs-0"})(["color:",";@media (prefers-color-scheme:dark){color:",";}"],(function(e){return e.theme.light.secondaryTextColor}),(function(e){return e.theme.dark.secondaryTextColor}))},45617:function(e,t,n){n.d(t,{X:function(){return f}});var o=n(67294),r=n(72429),i={fabrizio_duroni:{name:"Fabrizio Duroni",url:"https://www.linkedin.com/in/fabrizio-duroni/",image:"fabrizio-duroni-small.jpg"},francesco_bonfadelli:{name:"Francesco Bonfadelli",url:"https://www.linkedin.com/in/fbonfadelli/",image:"francesco-bonfadelli.jpg"},alessandro_romano:{name:"Alessandro Romano",url:"https://www.linkedin.com/in/alessandroromano92/",image:"alessandro-romano.jpg"},emanuele_ianni:{name:"Emanuele Ianni",url:"https://www.linkedin.com/in/emanueleianni/",image:"emanuele-ianni.jpg"},tommaso_resti:{name:"Tommaso Resti",url:"https://www.linkedin.com/in/tommaso-resti-0ab5285a/",image:"tommaso-resti.jpg"},mariano_patafio:{name:"Mariano Patafio",url:"https://www.linkedin.com/in/mariano-patafio-4a8b7426/",image:"mariano-patafio.jpg"},angelo_sciarra:{name:"Angelo Sciarra",url:"https://www.linkedin.com/in/angelosciarra/",image:"angelo-sciarra.jpg"},giordano_tamburrelli:{name:"Giordano Tamburrelli",url:"https://www.linkedin.com/in/giordano-tamburrelli-b532334/",image:"giordano-tamburrelli.jpg"},felice_giovinazzo:{name:"Felice Giovinazzo",url:"https://www.linkedin.com/in/felice-giovinazzo-17277b55/",image:"felice-giovinazzo.jpg"},marco_delucchi:{name:"Marco De Lucchi",url:"https://www.linkedin.com/in/marcodelucchi/",image:"marco-delucchi.jpg"}},a=n(25444),l=n(19692),c=n(74900),d=n(2359),s=n(35870),u=n(61493),m=(0,l.default)(c.M).withConfig({displayName:"post-authors__PostAuthorsContainer",componentId:"sc-1fx2d9j-0"})(["padding:0;margin:"," 0;display:flex;flex-direction:column;"],(function(e){return e.theme.spacing[2]})),g=(0,l.default)(c.M).withConfig({displayName:"post-authors__PostAuthorContainer",componentId:"sc-1fx2d9j-1"})(["padding:0;margin-top:",";display:flex;align-items:center;"],(function(e){return e.theme.spacing[0]})),h=l.default.div.withConfig({displayName:"post-authors__PostAuthorImageContainer",componentId:"sc-1fx2d9j-2"})(["width:30px;height:30px;margin-right:5px;border-radius:50%;background-color:",";@media (prefers-color-scheme:dark){background-color:",";}"],(function(e){return e.theme.light.dividerColor}),(function(e){return e.theme.dark.dividerColor})),f=function(e){var t=e.authors,n=e.trackingCategory,l=e.trackingLabel,c=e.enableUrl,f=(0,a.useStaticQuery)("3736063423");return o.createElement(m,null,t.map((function(e){var t=i[e],a=f.allFile.edges.find((function(t){return t.node.name===e.replace("_","-")})).node.childImageSharp.gatsbyImageData;return o.createElement(g,{key:""+e+Math.floor(100*Math.random())},o.createElement(h,null,o.createElement(d.G,{alt:t.name,image:a,style:{width:30,height:30,marginRight:"5px",borderRadius:"50%"},imgStyle:{borderRadius:"50%"}})),o.createElement(s.n,null,c&&o.createElement(u.V,{trackingData:{action:r.U.action.open_blog_author,category:n,label:l},href:t.url,target:"_blank",rel:"noopener noreferrer"},t.name),!c&&t.name))})))}},79217:function(e,t,n){n.d(t,{S:function(){return l}});var o=n(67294),r=n(25968),i=n(35870),a=(0,n(19692).default)(i.n).withConfig({displayName:"post-meta__PostMetaParagraph",componentId:"sc-podp76-0"})(["margin:"," 0 "," 0;color:",";@media (prefers-color-scheme:dark){color:",";}"],(function(e){return e.theme.spacing[0]}),(function(e){return e.theme.spacing[3]}),(function(e){return e.theme.light.secondaryTextColor}),(function(e){return e.theme.dark.secondaryTextColor})),l=function(e){var t=e.date,n=e.readingTime;return o.createElement(a,null,o.createElement(r.q,null,t)," · ",o.createElement(r.q,null,n))}},20397:function(e,t,n){n.d(t,{v:function(){return h}});var o=n(67294),r=n(2359),i=n(19692),a=n(9381),l=i.default.div.withConfig({displayName:"blog-header__BlogHeaderContainer",componentId:"sc-15cvfv8-0"})(["display:flex;align-items:center;margin-top:50px;margin-bottom:20px;"]),c=i.default.div.withConfig({displayName:"blog-header__BlogHeaderColumn",componentId:"sc-15cvfv8-1"})(["display:flex;flex-direction:column;justify-content:center;"]),d=(0,i.default)(a.a).withConfig({displayName:"blog-header__BlogTitle",componentId:"sc-15cvfv8-2"})(["color:",";margin:0;font-weight:bold;display:block;line-height:1.5;@media (prefers-color-scheme:dark){color:",";}@media (max-width:992px){font-size:28px;}@media (max-width:320px){font-size:22px;}"],(function(e){return e.theme.light.primaryTextColor}),(function(e){return e.theme.dark.primaryTextColor})),s=i.default.span.withConfig({displayName:"blog-header__BlogDescription",componentId:"sc-15cvfv8-3"})(["display:block;font-size:",";color:",";line-height:1.5;@media (prefers-color-scheme:dark){color:",";}@media (max-width:992px){font-size:12px;}@media (max-width:320px){font-size:10px;}"],(function(e){return e.theme.fontSizes[4]}),(function(e){return e.theme.light.secondaryTextColor}),(function(e){return e.theme.dark.secondaryTextColor})),u=i.default.div.withConfig({displayName:"blog-header__ImageContainer",componentId:"sc-15cvfv8-4"})(["width:80px;height:80px;background-color:",";margin-right:",";border-radius:10px;box-shadow:1px 1px 4px rgba(0,0,0,0.575);@media (prefers-color-scheme:dark){background-color:",";}"],(function(e){return e.theme.light.generalBackgroundLight}),(function(e){return e.theme.spacing[2]}),(function(e){return e.theme.dark.generalBackgroundLight})),m=function(){return o.createElement(l,null,o.createElement(u,null,o.createElement(r.S,{src:"../../../images/blog-logo.jpg",alt:"blog logo",width:80,height:80,imgStyle:{borderRadius:"10px",boxShadow:"1px 1px 4px rgba(0, 0, 0, 0.575)"},__imageData:n(32728)})),o.createElement(c,null,o.createElement(d,null,"CHICIO CODING"),o.createElement(s,null,"Dirty clean code. Creative Stuff. Stuff.")))},g=n(81010),h=function(e){var t=e.children,n=e.location,r=e.author,i=e.ogPageType,a=e.ogImage,l=e.trackingCategory,c=e.customTitle,d=e.description,s=e.date;return o.createElement(g.L,{location:n,author:r,ogPageType:i,ogImage:a,trackingCategory:l,customTitle:c,description:d,date:s},o.createElement(m,null),t)}},42652:function(e,t,n){n.d(t,{C:function(){return s}});var o=n(67294),r=n(19692),i=n(9381),a=n(42266),l=n(43077),c=(0,r.css)(['code[class*="language-"],pre[class*="language-"]{-moz-tab-size:2;-o-tab-size:2;tab-size:2;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none;white-space:pre;white-space:pre-wrap;word-wrap:normal;font-family:Menlo,Monaco,"Courier New",monospace;font-size:14px;color:#76d9e6;text-shadow:none;background:#2a2a2a;}pre > code[class*="language-"]{font-size:1em;}code[class*="language-text"]{border-radius:2px;padding:3px;}pre[class*="language-"]{padding:15px;border-radius:4px;border:1px solid #e1e1e8;overflow:auto;position:relative;}pre[class*="language-"] code{white-space:pre;display:block;}:not(pre) > code[class*="language-"]{padding:0.15em 0.2em 0.05em;border-radius:0.3em;border:0.13em solid #7a6652;box-shadow:1px 1px 0.3em -0.1em #000 inset;}.token.namespace{opacity:0.7;}.token.comment,.token.prolog,.token.doctype,.token.cdata{color:#6f705e;}.token.operator,.token.boolean,.token.number{color:#a77afe;}.token.attr-name,.token.string{color:#e6d06c;}.token.entity,.token.url,.language-css .token.string,.style .token.string{color:#e6d06c;}.token.selector,.token.inserted{color:#a6e22d;}.token.atrule,.token.attr-value,.token.keyword,.token.important,.token.deleted{color:#ef3b7d;}.token.regex,.token.statement{color:#76d9e6;}.token.placeholder,.token.variable{color:#fff;}.token.important,.token.statement,.token.bold{font-weight:bold;}.token.punctuation{color:#bebec5;}.token.entity{cursor:help;}.token.italic{font-style:italic;}code.language-markup{color:#f9f9f9;}code.language-markup .token.tag{color:#ef3b7d;}code.language-markup .token.attr-name{color:#a6e22d;}code.language-markup .token.attr-value{color:#e6d06c;}code.language-markup .token.style,code.language-markup .token.script{color:#76d9e6;}code.language-markup .token.script .token.keyword{color:#76d9e6;}pre[class*="language-"][data-line]{position:relative;padding:1em 0 1em 3em;}pre[data-line] .line-highlight{position:absolute;left:0;right:0;padding:0;margin-top:1em;background:rgba(255,255,255,0.08);pointer-events:none;line-height:inherit;white-space:pre;}pre[data-line] .line-highlight:before,pre[data-line] .line-highlight[data-end]:after{content:attr(data-start);position:absolute;top:0.4em;left:0.6em;min-width:1em;padding:0.2em 0.5em;background-color:rgba(255,255,255,0.4);color:black;font:bold 65%/1 sans-serif;height:1em;line-height:1em;text-align:center;border-radius:999px;text-shadow:none;box-shadow:0 1px 1px rgba(255,255,255,0.7);}pre[data-line] .line-highlight[data-end]:after{content:attr(data-end);top:auto;bottom:0.4em;}']),d=r.default.div.withConfig({displayName:"post-content__PostContentContainer",componentId:"sc-1xh5k9t-0"})(["color:",";line-height:1.5;& ul li{font-size:",";line-height:",";}& p{font-size:",";margin-left:0;margin-right:0;line-height:",";}& figure figcaption{font-size:",";text-align:center;line-height:",";}& h3{",";margin-left:0;margin-right:0;line-height:",";}& h4{",";margin-left:0;margin-right:0;line-height:",";}& a{",";line-height:",";}& blockquote{line-height:",";color:",";border-left:5px solid ",";margin-left:0;margin-right:0;padding:"," ",";}& blockquote p{line-height:",";margin-bottom:0;margin-top:0;}& hr{color:",";background-color:",";width:100%;margin:"," 0;border:0;border-top:1px solid rgba(0,0,0,0.1);}@media (prefers-color-scheme:dark){color:",";& blockquote{color:",";border-left:5px solid ",";}& hr{color:",";background-color:",";}}& .embedVideo-container{position:relative;padding-bottom:56.25%;height:100%;width:100%;overflow:hidden;margin:"," 0;}& .embedVideo-container iframe,.embedVideo-container object,.embedVideo-container embed{position:absolute;top:0;left:0;width:100%;height:100%;}& .katex-display > .katex{display:inline-block;white-space:nowrap;max-width:100%;overflow-x:scroll;text-align:initial;line-height:",";}& .katex *{font-size:",";}& .emoji-icon{top:4px;}",""],(function(e){return e.theme.light.primaryTextColor}),(function(e){return e.theme.fontSizes[2]}),(function(e){return e.theme.lineHeight}),(function(e){return e.theme.fontSizes[2]}),(function(e){return e.theme.lineHeight}),(function(e){return e.theme.fontSizes[1]}),(function(e){return e.theme.lineHeight}),i.m,(function(e){return e.theme.lineHeight}),a.y,(function(e){return e.theme.lineHeight}),l.L,(function(e){return e.theme.lineHeight}),(function(e){return e.theme.lineHeight}),(function(e){return e.theme.light.secondaryTextColor}),(function(e){return e.theme.light.secondaryTextColor}),(function(e){return e.theme.spacing[4]}),(function(e){return e.theme.spacing[2]}),(function(e){return e.theme.lineHeight}),(function(e){return e.theme.light.dividerColor}),(function(e){return e.theme.light.dividerColor}),(function(e){return e.theme.spacing[4]}),(function(e){return e.theme.dark.primaryTextColor}),(function(e){return e.theme.dark.secondaryTextColor}),(function(e){return e.theme.dark.secondaryTextColor}),(function(e){return e.theme.dark.dividerColor}),(function(e){return e.theme.dark.dividerColor}),(function(e){return e.theme.spacing[2]}),(function(e){return e.theme.lineHeight}),(function(e){return e.theme.fontSizes[4]}),c),s=function(e){var t=e.html;return o.createElement(d,{dangerouslySetInnerHTML:{__html:t}})}},61493:function(e,t,n){n.d(t,{V:function(){return a}});var o=n(67294),r=n(72429),i=n(87442),a=function(e){var t=e.children,n=e.className,a=e.href,l=e.trackingData,c=e.target,d=e.rel;return o.createElement(i.K,{className:n,href:a,onClick:function(){(0,r.$)(l)},target:c,rel:d},t)}},35193:function(e,t,n){n.r(t);var o=n(67294),r=n(72429),i=n(79217),a=n(45617),l=n(2359),c=n(20397),d=n(12051),s=n(42652),u=n(19692),m=n(29184),g=n(81727),h=n(55952),f=(0,u.default)(d.X).withConfig({displayName:"post__PostTitle",componentId:"sc-dbb7o3-0"})(["margin:0;"]),p=(0,h.default)({resolved:{},chunkName:function(){return"components-design-system-organism-recent-posts".replace(/[^a-zA-Z0-9_!§$()=\-^°]+/g,"-")},isReady:function(e){var t=this.resolve(e);return!0===this.resolved[t]&&!!n.m[t]},importAsync:function(){return n.e(794).then(n.bind(n,12147))},requireAsync:function(e){var t=this,n=this.resolve(e);return this.resolved[n]=!1,this.importAsync(e).then((function(e){return t.resolved[n]=!0,e}))},requireSync:function e(t){var o=this.resolve(t);return n(o)},resolve:function e(){return 12147}}),b=(0,h.default)({resolved:{},chunkName:function(){return"components-design-system-molecules-post-tags".replace(/[^a-zA-Z0-9_!§$()=\-^°]+/g,"-")},isReady:function(e){var t=this.resolve(e);return!0===this.resolved[t]&&!!n.m[t]},importAsync:function(){return n.e(21).then(n.bind(n,33310))},requireAsync:function(e){var t=this,n=this.resolve(e);return this.resolved[n]=!1,this.importAsync(e).then((function(e){return t.resolved[n]=!0,e}))},requireSync:function e(t){var o=this.resolve(t);return n(o)},resolve:function e(){return 33310}}),k=(0,h.default)({resolved:{},chunkName:function(){return"components-design-system-molecules-comments".replace(/[^a-zA-Z0-9_!§$()=\-^°]+/g,"-")},isReady:function(e){var t=this.resolve(e);return!0===this.resolved[t]&&!!n.m[t]},importAsync:function(){return n.e(760).then(n.bind(n,77918))},requireAsync:function(e){var t=this,n=this.resolve(e);return this.resolved[n]=!1,this.importAsync(e).then((function(e){return t.resolved[n]=!0,e}))},requireSync:function e(t){var o=this.resolve(t);return n(o)},resolve:function e(){return 77918}}),v=function(e){var t,d,u,h=e.data,v=e.location,y=h.markdownRemark,w=y.frontmatter.title;return!0===(null===(t=y.frontmatter)||void 0===t?void 0:t.math)&&n(90749),o.createElement(c.v,{location:(0,g.G)(v),author:h.site.siteMetadata.author,ogPageType:m.E8.BlogPosting,ogImage:""+(0,l.e)(null===(d=y.frontmatter.image.childImageSharp)||void 0===d?void 0:d.gatsbyImageData),trackingCategory:r.U.category.blog_post,customTitle:w,description:y.frontmatter.description,date:y.frontmatter.date},o.createElement("div",null,o.createElement(f,{className:"blog-post-title"},y.frontmatter.title),o.createElement(a.X,{authors:y.frontmatter.authors,trackingCategory:r.U.category.blog_post,trackingLabel:r.U.label.body,enableUrl:!0}),o.createElement(i.S,{date:y.frontmatter.date,readingTime:y.fields.readingTime.text}),o.createElement(s.C,{html:y.html}),o.createElement(b,{tags:y.frontmatter.tags,trackingCategory:r.U.category.blog_post,trackingLabel:r.U.label.body})),o.createElement(p,{currentSlug:v.pathname}),(null===(u=y.frontmatter)||void 0===u?void 0:u.comments)&&o.createElement(k,{url:v.href,title:w}))};t.default=v;var y="2053696070"},90749:function(e,t,n){n.r(t)},32728:function(e){e.exports=JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/c10cb9c09863cc59eaf2f00e35508ee4/499f6/blog-logo.jpg","srcSet":"/static/c10cb9c09863cc59eaf2f00e35508ee4/f4935/blog-logo.jpg 20w,\\n/static/c10cb9c09863cc59eaf2f00e35508ee4/2f28c/blog-logo.jpg 40w,\\n/static/c10cb9c09863cc59eaf2f00e35508ee4/499f6/blog-logo.jpg 80w","sizes":"(min-width: 80px) 80px, 100vw"},"sources":[{"srcSet":"/static/c10cb9c09863cc59eaf2f00e35508ee4/264f2/blog-logo.webp 20w,\\n/static/c10cb9c09863cc59eaf2f00e35508ee4/e73fe/blog-logo.webp 40w,\\n/static/c10cb9c09863cc59eaf2f00e35508ee4/61ca6/blog-logo.webp 80w","type":"image/webp","sizes":"(min-width: 80px) 80px, 100vw"}]},"width":80,"height":80}')}}]);
//# sourceMappingURL=component---src-templates-post-tsx-8039b7e671eb48a33a84.js.map