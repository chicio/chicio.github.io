import gulp from 'gulp'
import gulpConcat from 'gulp-concat'
import gulpSass from 'gulp-sass'
import gulpRevAppend from 'gulp-rev-append'
import gulpUglify from 'gulp-uglify'
import gulpEslint from 'gulp-eslint'
import gulpImagemin from 'gulp-imagemin'
import gulpEnvironments from 'gulp-environments'
import purgecss from 'gulp-purgecss'
import critical from 'critical'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import browserify from 'browserify'
import babelify from 'babelify'
import { exec } from 'child_process'
import * as fs from 'fs'

const production = gulpEnvironments.production

const CSS_FOLDER = '_css'
const CSS_HOME = 'style.home'
const CSS_BLOG = 'style.blog'
const CSS_BLOG_ARCHIVE = `${CSS_BLOG}.archive`
const CSS_BLOG_HOME = `${CSS_BLOG}.home`
const CSS_BLOG_POST = `${CSS_BLOG}.post`
const CSS_BLOG_TAGS = `${CSS_BLOG}.tags`
const CSS_PRIVACY_POLICY = `style.privacypolicy`
const CSS_COOKIE_POLICY = `style.cookiepolicy`
const CSS_ERROR = `style.error`
const CSS_BASE_PATH = 'assets/styles'
 
const bundleCSSUsing = (cssName) => 
  gulp.src(`${CSS_FOLDER}/${cssName}.scss`)
    .pipe(gulpSass(production() ? { outputStyle: 'compressed' } : {}))
    .pipe(gulpConcat(`${cssName}.css`))
    .pipe(gulp.dest(CSS_BASE_PATH))
const bundleCss = () => Promise.all([
  bundleCSSUsing(CSS_HOME),
  bundleCSSUsing(CSS_BLOG_ARCHIVE),
  bundleCSSUsing(CSS_BLOG_HOME),
  bundleCSSUsing(CSS_BLOG_POST),
  bundleCSSUsing(CSS_BLOG_TAGS),
  bundleCSSUsing(CSS_PRIVACY_POLICY),
  bundleCSSUsing(CSS_COOKIE_POLICY),
  bundleCSSUsing(CSS_ERROR)
])

const flow = (done) => exec(`npm run flow`, (err, stdout, stderr) => done())

const lint = () => (
  gulp.src('_js/**')
    .pipe(gulpEslint())
    .pipe(gulpEslint.format())
    .pipe(gulpEslint.failOnError())
)

const bundleJsUsing = (section) => (
  browserify({ entries: `_jsbuild/index.${section}.js` })
    .transform(babelify, { global: true, presets: ['@babel/preset-env'] })
    .bundle()
    .pipe(source(`index.${section}.min.js`))
    .pipe(buffer())
    .pipe(production(gulpUglify()))
    .pipe(gulp.dest('assets/js'))
)
const bundleJs = () => Promise.all([
  bundleJsUsing('home'),
  bundleJsUsing('blog')
])

const copyFiles = (folder) => (
  gulp
    .src([`_${folder}/**/*.*`])
    .pipe(gulp.dest(`assets/${folder}`))
)
const fonts = () => copyFiles('fonts')
const models = () => copyFiles('models')
const images = () =>
  gulp
    .src([`_images/**/*.*`])
    .pipe(production(gulpImagemin()))
    .pipe(gulp.dest(`assets/images`))

const criticalCss = (src, dest, css) => (
  critical.generate({
    base: '_site/',
    src: `_site/${src}.html`,
    css: [`../assets/styles/${css}.css`],
    dimensions: [{
      width: 320,
      height: 480
    }, {
      width: 768,
      height: 1024
    }, {
      width: 1280,
      height: 1024
    }],
    extract: true,
    inline: true,
    penthouse: {
      screenshots: {
        basePath: `_critical-screenshots/${dest}`,
        type: 'jpeg',
        quality: 20
      },
      renderWaitTime: 30
    },
    ignore: {
      rule: [/footer-icon/, /icon-/, /phone-number/, /html/, /body-show/]
    }
  }, (err, result) => {
    if (err === null) {
      fs.writeFileSync(`assets/styles/${css}.css`, result.uncritical);
      fs.writeFileSync(`_includes/${dest}.css`, result.css)
    }
  })
)

gulp.task('css-critical', (done) => Promise.all([
  criticalCss('index', 'critical', CSS_HOME),
  criticalCss('blog/index', 'critical-blog', CSS_BLOG_HOME),
  criticalCss('blog/archive/index', 'critical-blog-post-archive', CSS_BLOG_ARCHIVE),
  criticalCss('blog/tags/index', 'critical-blog-tags', CSS_BLOG_TAGS),
  criticalCss('2017/05/10/about-me', 'critical-blog-post', CSS_BLOG_POST),
  criticalCss('privacy-policy', 'critical-privacy-policy', CSS_PRIVACY_POLICY),
  criticalCss('cookie-policy', 'critical-cookie-policy', CSS_COOKIE_POLICY),
  criticalCss('offline', 'critical-error', CSS_ERROR),
  ]).then(() => done())
)

const purgeCss = (cssName, content, whitelist, done) => {
  gulp
    .src(`_site/assets/styles/${cssName}.css`)
    .pipe(
      purgecss({
        content: content,
        whitelist: whitelist
      })
    )
    .pipe(gulp.dest('assets/styles/'))
  done()
}

gulp.task('purge-css-home', (done) => purgeCss(
  CSS_HOME,
  ['./_site/index.html', './_site/assets/js/index.home.min.js'],
  ['html'],
  done
))

gulp.task('purge-css-blog-archive', (done) => purgeCss(
  CSS_BLOG_ARCHIVE,
  ['./_site/blog/archive/index.html', './_site/assets/js/index.blog.min.js'],
  ['html'],
  done
))

gulp.task('purge-css-blog-home', (done) => purgeCss(
  CSS_BLOG_HOME,
  ['./_site/blog/index.html', './_site/assets/js/index.blog.min.js'],
  ['html'],
  done
))

gulp.task('purge-css-blog-tags', (done) => purgeCss(
  CSS_BLOG_TAGS,
  ['./_site/blog/tags/index.html', './_site/assets/js/index.blog.min.js'],
  ['html'],
  done
))

gulp.task('purge-css-error', (done) => purgeCss(
  CSS_ERROR,
  ['./_site/offline.html', './_site/assets/js/index.blog.min.js'],
  ['html'],
  done
))

gulp.task('purge-css-privacy-policy', (done) => purgeCss(
  CSS_PRIVACY_POLICY,
  ['./_site/privacy-policy.html', './_site/assets/js/index.blog.min.js'],
  ['html'],
  done
))

gulp.task('purge-css-cookie-policy', (done) => purgeCss(
  CSS_COOKIE_POLICY,
  ['./_site/cookie-policy.html', './_site/assets/js/index.blog.min.js'],
  ['html'],
  done
))

gulp.task('purge-css-blog-post', (done) => purgeCss(
  CSS_BLOG_POST,
  ['./_site/20**/**/**.html', './_site/assets/js/index.blog.min.js'],
  ['html', 'katex-display'],
  done
))

const revision = (section) =>
  gulp.src(`./dependencies-${section}.html`)
    .pipe(gulpRevAppend())
    .pipe(gulp.dest('_includes'))
const revAppend = (done) => Promise.all([
  revision('js-home', done),
  revision('js-blog', done),
  revision('css-home', done),
  revision('css-blog-archive', done),
  revision('css-blog-home', done),
  revision('css-blog-post', done),
  revision('css-blog-tags', done),
  revision('css-privacy-policy', done),
  revision('css-cookie-policy', done),
  revision('css-error', done)
]).then(() => done())

const serviceWorkerUrlFor = (section) => exec(`./_scripts/generate-service-worker-urls.sh ${section}`)
const serviceWorkerUrls = (done) => Promise.all([
  serviceWorkerUrlFor('js-home'),
  serviceWorkerUrlFor('js-blog'),
  serviceWorkerUrlFor('css-home'),
  serviceWorkerUrlFor('css-blog-archive'),
  serviceWorkerUrlFor('css-blog-home'),
  serviceWorkerUrlFor('css-blog-post'),
  serviceWorkerUrlFor('css-blog-tags'),
  serviceWorkerUrlFor('css-privacy-policy'),
  serviceWorkerUrlFor('css-cookie-policy'),
  serviceWorkerUrlFor('css-error')
]).then(() => done())

const jekyllBuild = (done) => exec(`./_scripts/build.sh`, (err, stdout, stderr) => done())

export const watchCss = () => gulp.watch(`${CSS_FOLDER}/*.scss`, gulp.series(
  bundleCss,
  jekyllBuild, //build for critical/purge css
  'css-critical',
  'purge-css-home',
  'purge-css-blog-home',
  'purge-css-blog-archive',
  'purge-css-blog-tags',
  'purge-css-error',
  'purge-css-privacy-policy',
  'purge-css-cookie-policy',
  'purge-css-blog-post',
))

export const build = gulp.series(
  bundleCss,
  flow,
  lint,
  bundleJs,
  images,
  fonts,
  models,
  revAppend,
  serviceWorkerUrls,
  jekyllBuild, //First build for critical/purge css
  'css-critical',
  'purge-css-home',
  'purge-css-blog-home',
  'purge-css-blog-archive',
  'purge-css-blog-tags',
  'purge-css-error',
  'purge-css-privacy-policy',
  'purge-css-cookie-policy',
  'purge-css-blog-post',
  jekyllBuild //Generate site with css critical path and purge from unused rules
)
