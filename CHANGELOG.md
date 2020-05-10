# Change Log
All changes to Chicio coding will be documented in this file.

## [1.23.0](https://github.com/chicio/chicio.github.io/releases/tag/1.23.0)
Release date: 2020-02-05

#### Added

- Dark mode
- gulp Watch Css to avoid site rebuild

## [1.22.0](https://github.com/chicio/chicio.github.io/releases/tag/1.22.0)
Release date: 2020-02-05

#### Added

- No more MathJax, hello Katex

## [1.21.0](https://github.com/chicio/chicio.github.io/releases/tag/1.21.0)
Release date: 2020-01-15

#### Added

- gulp-mode to manage different environment
- youtube async load

## [1.20.0](https://github.com/chicio/chicio.github.io/releases/tag/1.20.0)
Release date: 2019-11-27

#### Added

- CSS critical path with extraction and finally with inline
- purgecss to remove unused css rules

## [1.19.0](https://github.com/chicio/chicio.github.io/releases/tag/1.19.0)
Release date: 2019-09-22

#### Added

- Updated cookieconsent
- Update MathJax

## [1.18.0](https://github.com/chicio/chicio.github.io/releases/tag/1.18.0)
Release date: 2019-09-22

#### Added

- Events tracking on all site (also service worker!!!!)
- improved analytics configuration
- clean liquid templating

#### Fixed

- material properties on threejs scene

## [1.17.0](https://github.com/chicio/chicio.github.io/releases/tag/1.17.0)
Release date: 2019-09-21.

#### Added

- Google analytics offline tracking (Workbox!!)
- Improved service worker registration
- Migration to global site tag (gtag) for google analytcis

## [1.16.0](https://github.com/chicio/chicio.github.io/releases/tag/1.16.0)
Release date: 2019-09-19.

#### Fixed

- fixed offline fallback for safari (iOS 13)
- fixed hover for recent post (now only for screens > lg)

## [1.15.0](https://github.com/chicio/chicio.github.io/releases/tag/1.15.0)
Release date: 2019-09-19.

#### Added

- offline network management
- lazy load images reload on network error

## [1.14.0](https://github.com/chicio/chicio.github.io/releases/tag/1.14.0)
Release date: 2019-09-15.

#### Added

- new pull to refresh feature
- updated dependencies

#### Fixed

- flow build removes old js build
- improved code quality with eslint

## [1.13.1](https://github.com/chicio/chicio.github.io/releases/tag/1.13.1)
Release date: 2019-07-28.

#### Fixed

- home loader z-index now is animated to put it behind the socials button (now everything is clickable)

## [1.13.0](https://github.com/chicio/chicio.github.io/releases/tag/1.13.0)
Release date: 2019-07-20.

#### Added

- image optimization/compression with gulp-imagemin
- fixing article using the vscode 'Spell Right' plugin
- added dev.to badge in homepage

## [1.12.0](https://github.com/chicio/chicio.github.io/releases/tag/1.12.0)
Release date: 2019-05-18.

#### Added

- icomoon font display feature
- disqus lazy loading
- improving accessibility of highlight syntax
- optimizing three js scene

#### Fixed

- foreach on lazy loading for images

## [1.11.0](https://github.com/chicio/chicio.github.io/releases/tag/1.11.0)
Release date: 2019-05-12.

#### Added

- moved scene3d home animation and cookie consent to the window.load event
- added missing icons in icomoon font

## [1.10.0](https://github.com/chicio/chicio.github.io/releases/tag/1.10.0)
Release date: 2019-05-11.

#### Added

- removed fontawesome full installation, switch to iconmoon
- prefetch blog url everywhere
- font-face with local open sans font and font-display
- updated intersection observer polifyll and threejs

## [1.9.0](https://github.com/chicio/chicio.github.io/releases/tag/1.9.0)
Release date: 2019-05-10.

#### Added

- bye bye gsap, I want speed with css animation!!! 

## [1.8.0](https://github.com/chicio/chicio.github.io/releases/tag/1.8.0)
Release date: 2019-05-09.

#### Added

- fuck loader, I want speed!!! 

## [1.7.0](https://github.com/chicio/chicio.github.io/releases/tag/1.7.0)
Release date: 2019-05-08.

#### Added

- new blog home
- css optimized for each page

## [1.6.1](https://github.com/chicio/chicio.github.io/releases/tag/1.6.1)
Release date: 2019-05-04.

#### Fixed

- Footer now is more mobile friendly

## [1.6.0](https://github.com/chicio/chicio.github.io/releases/tag/1.6.0)
Release date: 2019-05-02.

#### Added

- Added svg placeholder to prevent content reflow for lazy loaded images
- Updated gems

## [1.5.0](https://github.com/chicio/chicio.github.io/releases/tag/1.5.0)
Release date: 2019-04-05.

#### Added

- Added privacy policy for chicio coding mobile app

## [1.4.0](https://github.com/chicio/chicio.github.io/releases/tag/1.4.0)
Release date: 2019-04-04.

#### Added

- Added digital assets link

## [1.3.1](https://github.com/chicio/chicio.github.io/releases/tag/1.3.1)
Release date: 2019-03-20.

#### Fixed

- fixed IntersectionObserver import: now is inside lazy-load-images.js

## [1.3.0](https://github.com/chicio/chicio.github.io/releases/tag/1.3.0)
Release date: 2019-03-20.

#### Added

- Added image lazy

## [1.2.2](https://github.com/chicio/chicio.github.io/releases/tag/1.2.2)
Release date: 2019-03-10.

#### Fixed

- install for setup now in npm setup new command
- fixed link target blank
- fixed cookie consent SEO not complaint link
- fixed links that do not have a discernible name
- fixed accessbility colors

## [1.2.1](https://github.com/chicio/chicio.github.io/releases/tag/1.2.1)

Release date: 2019-03-10.

#### Fixed

- removed install rvm from install scripts.

## [1.2.0](https://github.com/chicio/chicio.github.io/releases/tag/1.2.0)

Release date: 2019-03-10.

#### Added

- optimized css deferred load for all css
- optimized images for lighthouse tests
- new build workflow with only gems (no more docker)
- new bootstrap 4.3.1

#### Fixed

- install process now uses pages gem with bundler installation for gulp build

## [1.1.6](https://github.com/chicio/chicio.github.io/releases/tag/1.1.6)

Release date: 2019-03-03.

#### Added

- new pages-gem release

## [1.1.5](https://github.com/chicio/chicio.github.io/releases/tag/1.1.5)

Release date: 2019-02-23.

#### Added

- new Google Analytics campaign for pwa

## [1.1.4](https://github.com/chicio/chicio.github.io/releases/tag/1.1.4)

Release date: 2019-02-15.

#### Added

- new pages-gem release
- update cache to support new seo stuff

## [1.1.2](https://github.com/chicio/chicio.github.io/releases/tag/1.1.2)

Release date: 2019-01-09.

#### Fixed

- Service worker now delete all old caches.

## [1.1.1](https://github.com/chicio/chicio.github.io/releases/tag/1.1.1)

Release date: 2019-01-03.

#### Fixed

- Download of cv now works on every browser

## [1.1.0](https://github.com/chicio/chicio.github.io/releases/tag/1.1.0)

Release date: 2019-01-02.

#### Added

- Versioning using npm version
- Added community templates (code of conduct, pull requests, issues)
- Added instagram profile url
- Bumb dependencies versions


## [1.0.0](https://github.com/chicio/chicio.github.io/releases/tag/1.0.0)

Release date: 2018-12-31.

#### Added

- Initial release.
