"use strict";(self.__LOADABLE_LOADED_CHUNKS__=self.__LOADABLE_LOADED_CHUNKS__||[]).push([[906,21],{4871:function(t,e,n){n.d(e,{b:function(){return o}});var a=n(6715),r=n(2376),o=a.default.h5.withConfig({displayName:"heading5__Heading5",componentId:"sc-krrxw9-0"})(["font-size:",";",""],(function(t){return t.theme.fontSizes[7]}),r.J)},1057:function(t,e,n){n.d(e,{y:function(){return x}});var a=n(6715),r=n(9201),o=n(6862),i=n(9230),c=n(7248),d=n(4868),l=n(7294),g=n(4871),s=n(1478),u=n(4665),m=n(2745),f=n(6435),p=(0,a.default)(r.n).withConfig({displayName:"post-card__PostDescription",componentId:"sc-1nq868o-0"})(["margin-right:0;margin-left:0;"]),h=a.default.div.withConfig({displayName:"post-card__PostCardContainer",componentId:"sc-1nq868o-1"})(["border-radius:4px;margin-top:",";background-color:",";box-shadow:0 3px 10px 0 ",";","{","{transition:transform 0.2s;&:hover{transform:scale(1.025);}}","}","{background-color:",";box-shadow:0 3px 10px 0 ",";}"],(function(t){return t.theme.spacing[4]}),(function(t){return t.theme.light.generalBackgroundLight}),(function(t){return t.theme.light.boxShadowLight}),u.c.minWidth.md,u.c.inputDevice.mouse,(function(t){return!t.big&&(0,a.css)(["width:48%;"])}),u.c.dark,(function(t){return t.theme.dark.generalBackgroundLight}),(function(t){return t.theme.dark.boxShadowLight})),b=(0,a.default)(i.G).withConfig({displayName:"post-card__PostCardImageContainer",componentId:"sc-1nq868o-2"})(["width:100%;object-fit:cover;height:200px;","{height:250px;}","{border-radius:4px 4px 0 0;}"],u.c.minWidth.sm,f.o),y=a.default.div.withConfig({displayName:"post-card__A",componentId:"sc-1nq868o-3"})(["border-radius:20px;"]),_=(0,a.default)(s.B).withConfig({displayName:"post-card__PostCardLink",componentId:"sc-1nq868o-4"})(["text-decoration:none;&:hover{text-decoration:none;}"]),k=(0,a.default)(g.b).withConfig({displayName:"post-card__PostCardTitle",componentId:"sc-1nq868o-5"})(["margin:0 0 ",";word-wrap:break-word;"],(function(t){return t.theme.spacing[2]})),C=a.default.div.withConfig({displayName:"post-card__PostCardMetaContainer",componentId:"sc-1nq868o-6"})(["padding:",";"],(function(t){return t.theme.spacing[4]})),x=function(t){var e=t.big,n=t.slug,a=t.title,r=t.image,i=t.authors,g=t.tags,s=t.date,u=t.readingTime,f=t.description,x=t.trackingCategory;return l.createElement(h,{big:e,key:n},l.createElement(y,null,l.createElement(_,{to:n,trackingData:{action:o.U.action.open_blog_post,category:x,label:o.U.label.body}},l.createElement(b,{alt:a,image:r,imgStyle:{borderRadius:"4px 4px 0 0"}})),l.createElement(C,null,l.createElement(_,{to:n,trackingData:{action:o.U.action.open_blog_post,category:x,label:o.U.label.body}},l.createElement(k,null,a),l.createElement(c.X,{authors:i,trackingCategory:x,trackingLabel:o.U.label.body,enableUrl:!1}),l.createElement(d.S,{date:s,readingTime:u}),l.createElement(p,null,f+" [...]")),g&&l.createElement(m.default,{tags:g,trackingCategory:o.U.category.blog_home,trackingLabel:o.U.label.body}))))}},2745:function(t,e,n){n.r(e),n.d(e,{PostTags:function(){return d}});var a=n(9105),r=n(7294),o=n(6715),i=n(9302),c=o.default.div.withConfig({displayName:"post-tags__PostTagsContainer",componentId:"sc-1g8mf1n-0"})(["margin:"," 0;"],(function(t){return t.theme.spacing[2]})),d=function(t){var e=t.tags,n=t.trackingCategory,o=t.trackingLabel;return r.createElement(c,null,e.map((function(t){return r.createElement(a.V,{tag:t,link:(0,i.j7)(t),big:!1,key:t,trackingCategory:n,trackingLabel:o})})))};e.default=d},8117:function(t,e,n){n.d(e,{A:function(){return l}});var a=n(7294),r=n(6715),o=n(4665),i=n(1057),c=n(6862),d=r.default.div.withConfig({displayName:"posts-row__PostsRowContainer",componentId:"sc-wlpe0z-0"})(["display:flex;flex-direction:column;width:100%;","{flex-direction:row;justify-content:space-between;}"],o.c.minWidth.md),l=function(t){var e=t.postsGroup;return a.createElement(d,null,a.createElement(i.y,{big:!1,key:e[0].node.fields.slug,slug:e[0].node.fields.slug,title:e[0].node.frontmatter.title,image:e[0].node.frontmatter.image.childImageSharp.gatsbyImageData,authors:e[0].node.frontmatter.authors,date:e[0].node.frontmatter.date,readingTime:e[0].node.fields.readingTime.text,description:e[0].node.frontmatter.description,trackingCategory:c.U.category.blog_home,tags:e[0].node.frontmatter.tags}),e[1]&&a.createElement(i.y,{big:!1,key:e[1].node.fields.slug,slug:e[1].node.fields.slug,title:e[1].node.frontmatter.title,image:e[1].node.frontmatter.image.childImageSharp.gatsbyImageData,authors:e[1].node.frontmatter.authors,date:e[1].node.frontmatter.date,readingTime:e[1].node.fields.readingTime.text,description:e[1].node.frontmatter.description,trackingCategory:c.U.category.blog_home,tags:e[1].node.frontmatter.tags}))}},9105:function(t,e,n){n.d(e,{V:function(){return g}});var a=n(6715),r=n(7294),o=n(1478),i=n(6862),c=n(4665),d=(0,a.default)(o.B).withConfig({displayName:"tag__TagLink",componentId:"sc-ipvbvr-0"})(["display:inline-block;text-decoration:none;&:hover{text-decoration:none;}",""],(function(t){return!0===t.big&&(0,a.css)(["margin-bottom:",";"],(function(t){return t.theme.spacing[4]}))})),l=a.default.span.withConfig({displayName:"tag__TagText",componentId:"sc-ipvbvr-1"})(["background-color:",";color:",";margin-right:",";margin-bottom:",";border-radius:3px;font-size:",";padding:0.5px 5px;",";","{background-color:",";color:",";}"],(function(t){return t.theme.light.primaryColor}),(function(t){return t.theme.light.textAbovePrimaryColor}),(function(t){return t.theme.spacing[0]}),(function(t){return t.theme.spacing[0]}),(function(t){return t.big?t.theme.fontSizes[5]:t.theme.fontSizes[1]}),(function(t){return t.big&&(0,a.css)(["display:block;margin-right:",";margin-bottom:",";"],(function(t){return t.theme.spacing[4]}),(function(t){return t.theme.spacing[4]}))}),c.c.dark,(function(t){return t.theme.dark.primaryColor}),(function(t){return t.theme.dark.textAbovePrimaryColor})),g=function(t){var e=t.tag,n=t.link,a=t.big,o=t.trackingCategory,c=t.trackingLabel;return r.createElement(d,{trackingData:{action:i.U.action.open_blog_tag,category:o,label:c},to:n,big:a},r.createElement(l,{big:a},e))}},866:function(t,e,n){n.r(e),n.d(e,{RecentPosts:function(){return m},default:function(){return f}});var a=n(7294),r=n(1597),o=n(9238),i=n(6715),c=n(4665),d=n(2982),l=n(8117),g=(0,i.default)(o.k).withConfig({displayName:"read-next__ReadNextTitle",componentId:"sc-1gtya0f-0"})(["margin:"," 0;"],(function(t){return t.theme.spacing[2]})),s=i.default.div.withConfig({displayName:"read-next__CardsContainer",componentId:"sc-1gtya0f-1"})(["display:block;width:100%;","{display:flex;flex-direction:row;}"],c.c.minWidth.md),u=i.default.div.withConfig({displayName:"read-next__ReadNextContainer",componentId:"sc-1gtya0f-2"})(["margin:"," 0;"],(function(t){return t.theme.spacing[4]})),m=function(t){var e=t.currentSlug,n=function(t){if(!t)return Array(0);for(var e,n=t.length,a=Array.apply(void 0,(0,d.Z)(t));0!==n;){e=Math.floor(Math.random()*n),n-=1;var r=t[e],o=a[n];a[n]=r,a[e]=o}return a}((0,r.useStaticQuery)("630498219").allMarkdownRemark.edges.filter((function(t){return t.node.fields.slug!==e}))).slice(0,2);return a.createElement(u,null,a.createElement(g,null,"Read next"),a.createElement(s,null,a.createElement(l.A,{postsGroup:n})))},f=m},1478:function(t,e,n){n.d(e,{B:function(){return l}});var a=n(7294),r=n(6862),o=n(6715),i=n(4493),c=n(1597),d=(0,o.default)(c.Link).withConfig({displayName:"standard-internal-link__StandardInternalLink",componentId:"sc-3nuxs-0"})(["",""],i.L),l=function(t){var e=t.children,n=t.className,o=t.to,i=t.trackingData;return a.createElement(d,{className:n,to:o,onClick:function(){(0,r.$)(i)}},e)}}}]);
//# sourceMappingURL=components-design-system-organism-read-next-fe78891cf53bc2822f2f.js.map