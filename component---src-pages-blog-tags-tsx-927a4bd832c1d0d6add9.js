(self.webpackChunkfabrizioduroni_it=self.webpackChunkfabrizioduroni_it||[]).push([[403],{5136:function(e){"use strict";e.exports=JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/c10cb9c09863cc59eaf2f00e35508ee4/499f6/blog-logo.jpg","srcSet":"/static/c10cb9c09863cc59eaf2f00e35508ee4/f4935/blog-logo.jpg 20w,\\n/static/c10cb9c09863cc59eaf2f00e35508ee4/2f28c/blog-logo.jpg 40w,\\n/static/c10cb9c09863cc59eaf2f00e35508ee4/499f6/blog-logo.jpg 80w","sizes":"(min-width: 80px) 80px, 100vw"},"sources":[{"srcSet":"/static/c10cb9c09863cc59eaf2f00e35508ee4/264f2/blog-logo.webp 20w,\\n/static/c10cb9c09863cc59eaf2f00e35508ee4/e73fe/blog-logo.webp 40w,\\n/static/c10cb9c09863cc59eaf2f00e35508ee4/61ca6/blog-logo.webp 80w","type":"image/webp","sizes":"(min-width: 80px) 80px, 100vw"}]},"width":80,"height":80}')},7874:function(e,t,a){"use strict";a.d(t,{w:function(){return n}});var c=a(7294),l=a(7700),o=a(8590),n=function(e){var t=e.trackingCategory;return c.createElement("div",{className:"blog-header d-flex flex-row align-items-center"},c.createElement(o.S,{className:"mr-2",imgClassName:"img-responsive blog-logo",src:"../images/blog-logo.jpg",alt:"blog logo",width:80,height:80,__imageData:a(5136)}),c.createElement("div",{className:"d-flex flex-column"},c.createElement("h1",{className:"blog-title"},c.createElement("a",{onClick:function(){(0,l.j)(l.U.action.open_blog,t,l.U.label.header)},href:"/blog/"},"CHICIO CODING")),c.createElement("h2",{className:"lead blog-description"},"Dirty clean code. Creative Stuff. Stuff.")))}},1270:function(e,t,a){"use strict";a.d(t,{H:function(){return r}});var c=a(7294),l=a(7700),o=a(5444),n=function(e){var t=e.trackingAction,a=e.trackingCategory,n=e.label,r=e.url,i=e.active;return c.createElement(o.Link,{className:"blog-nav-item "+(i?"active":""),onClick:function(){(0,l.j)(t,a,l.U.label.header)},to:r},n)},r=function(e){var t=e.trackingCategory,a=e.pathname;return c.createElement("div",{className:"blog-masthead"},c.createElement("div",{className:"container"},c.createElement("nav",{className:"d-flex align-items-center blog-nav"},c.createElement(n,{trackingAction:l.U.action.open_home,trackingCategory:t,label:"Home",url:"/",active:"/"===a}),c.createElement(n,{trackingAction:l.U.action.open_blog,trackingCategory:t,label:"Blog",url:"/blog/",active:"/2017/05/10/about-me/"!==a}),c.createElement(n,{trackingAction:l.U.action.open_about_me,trackingCategory:t,label:"About me",url:"/2017/05/10/about-me/",active:"/2017/05/10/about-me/"===a}))))}},4372:function(e,t,a){"use strict";a.r(t);var c=a(7294),l=a(5444),o=a(6488),n=a(1270),r=a(7700),i=a(1261),g=a(7874);t.default=function(e){var t=e.data,a=e.location,s=t.site.siteMetadata,m=s.author,b=s.featuredImage;return c.createElement("main",null,c.createElement(o.F,{url:a.href,pageType:"website",imageUrl:"/"+b}),c.createElement(n.H,{trackingCategory:r.U.category.blog_archive,pathname:a.pathname}),c.createElement("div",{className:"container blog-posts"},c.createElement(g.w,{trackingCategory:r.U.category.blog_tags}),c.createElement("div",{className:"blog-tags-list"},c.createElement("div",{className:"blog-main"},c.createElement("div",{className:"blog-tags"},t.allMarkdownRemark.group.map((function(e){return c.createElement(l.Link,{to:"/blog/tags/"+e.fieldValue.split(" ").join("-")+"/",key:e.fieldValue},c.createElement("span",{className:"big"},e.fieldValue," (",e.totalCount,")"))})))))),c.createElement(i.$,{author:m,trackingCategory:r.U.category.blog_tags,trackingLabel:r.U.label.footer}))}}}]);
//# sourceMappingURL=component---src-pages-blog-tags-tsx-927a4bd832c1d0d6add9.js.map