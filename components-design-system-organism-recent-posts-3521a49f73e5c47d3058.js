(self.__LOADABLE_LOADED_CHUNKS__=self.__LOADABLE_LOADED_CHUNKS__||[]).push([[794],{4333:function(e,t,n){"use strict";n.d(t,{i:function(){return d}});var r=n(7294),o=n(5444),i=n(9692),a=n(106),c=(0,i.ZP)(o.Link).withConfig({displayName:"call-to-action-internal__CallToActionInternal",componentId:"sc-1b41n4h-0"})(["",""],a.f),l=n(2429),d=function(e){var t=e.children,n=e.className,o=e.to,i=e.trackingData;return r.createElement(c,{className:n,to:o,onClick:function(){(0,l.$)(i)}},t)}},106:function(e,t,n){"use strict";n.d(t,{f:function(){return r}});var r=(0,n(9692).iv)(["font-size:",";background-color:",";color:",";padding:",";border:none;border-radius:4px;margin:",";line-height:1;text-align:center;@media (prefers-color-scheme:dark){background-color:",";color:",";}color:",";text-decoration:none;&:hover{color:",";text-decoration:none;@media (prefers-color-scheme:dark){color:",";}}"],(function(e){return e.theme.fontSizes[3]}),(function(e){return e.theme.light.accentColor}),(function(e){return e.theme.light.textAbovePrimaryColor}),(function(e){return e.theme.spacing[2]}),(function(e){return e.theme.spacing[0]}),(function(e){return e.theme.dark.accentColor}),(function(e){return e.theme.dark.textAbovePrimaryColor}),(function(e){return e.theme.light.textAbovePrimaryColor}),(function(e){return e.theme.light.textAbovePrimaryColor}),(function(e){return e.theme.dark.textAbovePrimaryColor}))},9590:function(e,t,n){"use strict";n.d(t,{C:function(){return i}});var r=n(9692),o=n(873),i=r.ZP.h6.withConfig({displayName:"heading6__Heading6",componentId:"sc-1k2esb-0"})(["font-size:",";",""],(function(e){return e.theme.fontSizes[6]}),o.J)},2147:function(e,t,n){"use strict";n.r(t),n.d(t,{RecentPosts:function(){return k},default:function(){return x}});var r=n(7294),o=n(5444),i=n(2429),a=n(2266),c=n(9692),l=n(9590),d=n(8590),s=n(5870),u=n(4333),m=(0,c.ZP)(u.i).withConfig({displayName:"recent-post-card__CardButton",componentId:"sc-1jf73m0-0"})(["margin-top:auto;display:block;"]),g=c.ZP.div.withConfig({displayName:"recent-post-card__CardDescriptionContainer",componentId:"sc-1jf73m0-1"})(["margin:",";display:flex;flex-direction:column;flex-grow:1;"],(function(e){return e.theme.spacing[3]})),f=(0,c.ZP)(l.C).withConfig({displayName:"recent-post-card__CardHeading",componentId:"sc-1jf73m0-2"})(["margin-bottom:",";margin-right:0;margin-left:0;"],(function(e){return e.theme.spacing[3]})),h=c.ZP.div.withConfig({displayName:"recent-post-card__CardContainer",componentId:"sc-1jf73m0-3"})(["background-color:",";box-shadow:"," 0 3px 10px 0;width:100%;border-radius:4px;border:none;margin:"," 0 0 0;display:flex;flex-direction:column;@media (min-width:992px){margin:0 ",";transition:all 0.2s;&:hover{transform:scale(1.025);}}@media (prefers-color-scheme:dark){background-color:",";box-shadow:"," 0 3px 10px 0;}"],(function(e){return e.theme.light.generalBackgroundLight}),(function(e){return e.theme.light.boxShadowLight}),(function(e){return e.theme.spacing[2]}),(function(e){return e.margin?e.theme.spacing[2]:""}),(function(e){return e.theme.dark.generalBackgroundLight}),(function(e){return e.theme.dark.boxShadowLight})),p=function(e){var t=e.position,n=e.slug,o=e.title,a=e.image,c=e.description,l=e.trackingCategory,u=e.trackingLabel;return r.createElement(h,{margin:1===t},r.createElement(d.G,{style:{overflow:"hidden",height:"200px"},imgStyle:{borderTopLeftRadius:"4px",borderTopRightRadius:"4px",width:"100%",height:"100%",objectFit:"cover"},alt:o,image:a}),r.createElement(g,null,r.createElement(f,null,o),r.createElement(s.n,null,c.length>150?(null==c?void 0:c.substr(0,150))+"...":c),r.createElement(m,{key:n+"link",to:n,trackingData:{action:i.U.action.open_blog_post,category:l,label:u}},"Read More")))},b=(0,c.ZP)(a.k).withConfig({displayName:"recent-posts__RecentTitle",componentId:"ivzofl-0"})(["margin:"," 0;"],(function(e){return e.theme.spacing[2]})),C=c.ZP.div.withConfig({displayName:"recent-posts__CardsContainer",componentId:"ivzofl-1"})(["display:block;width:100%;@media (min-width:992px){display:flex;flex-direction:row;}"]),_=c.ZP.div.withConfig({displayName:"recent-posts__RecentPostsContainer",componentId:"ivzofl-2"})(["margin-bottom:",";"],(function(e){return e.theme.spacing[4]})),k=function(e){var t=e.currentSlug,n=(0,o.useStaticQuery)("4159577854");return r.createElement(_,null,r.createElement(b,null,"Recent posts"),r.createElement(C,null,n.allMarkdownRemark.edges.filter((function(e){return e.node.fields.slug!==t})).slice(0,3).map((function(e,t){return r.createElement(p,{key:e.node.fields.slug,position:t,slug:e.node.fields.slug,title:e.node.frontmatter.title,image:e.node.frontmatter.image.childImageSharp.gatsbyImageData,description:e.node.frontmatter.description,trackingCategory:i.U.category.blog_post,trackingLabel:i.U.label.body})}))))},x=k}}]);
//# sourceMappingURL=components-design-system-organism-recent-posts-3521a49f73e5c47d3058.js.map