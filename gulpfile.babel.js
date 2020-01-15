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

const css = (cssName, done) => {
  gulp.src(`_css/${cssName}.scss`)
    .pipe(gulpSass(production() ? { outputStyle: 'compressed' } : {}))
    .pipe(gulpConcat(`${cssName}.css`))
    .pipe(gulp.dest(CSS_BASE_PATH))
  done()
}

gulp.task('css-home', (done) => css(CSS_HOME, done))

gulp.task('css-blog-archive', (done) => css(CSS_BLOG_ARCHIVE, done))

gulp.task('css-blog-home', (done) => css(CSS_BLOG_HOME, done))

gulp.task('css-blog-post', (done) => css(CSS_BLOG_POST, done))

gulp.task('css-blog-tags', (done) => css(CSS_BLOG_TAGS, done))

gulp.task('css-privacy-policy', (done) => css(CSS_PRIVACY_POLICY, done))

gulp.task('css-cookie-policy', (done) => css(CSS_COOKIE_POLICY, done))

gulp.task('css-error', (done) => css(CSS_ERROR, done))

gulp.task('flow', (done) => {
  exec(`npm run flow`, (err, stdout, stderr) => {
    done()
  })
})

gulp.task('lint', () => (
  gulp.src('_js/**')
    .pipe(gulpEslint())
    .pipe(gulpEslint.format())
    .pipe(gulpEslint.failOnError()))
)

const bundleJs = (section) => (
  browserify({ entries: `_jsbuild/index.${section}.js` })
    .transform(babelify, { global: true, presets: ['@babel/preset-env'] })
    .bundle()
    .pipe(source(`index.${section}.min.js`))
    .pipe(buffer())
    .pipe(production(gulpUglify()))
    .pipe(gulp.dest('assets/js'))
)

gulp.task('bundle-home-scripts', () => bundleJs('home'))

gulp.task('bundle-blog-scripts', () => bundleJs('blog'))

const copyFiles = (folder) => (
  gulp
    .src([`_${folder}/**/*.*`])
    .pipe(gulp.dest(`assets/${folder}`))
)

gulp.task('fonts', () => copyFiles('fonts'))

gulp.task('models', () => copyFiles('models'))

gulp.task('images', () =>
  gulp
    .src([`_images/**/*.*`])
    .pipe(production(gulpImagemin()))
    .pipe(gulp.dest(`assets/images`))
)

const criticalCss = (src, dest, css) => (
  critical.generate({
    base: '_site/',
    src: `${src}.html`,
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
    ignore: {
      atrule: ['@font-face'],
      rule: [/footer-icon/, /icon-/, /phone-number/, /html/]
    }
  }, (err, result) => {
    if (err === null) {
      fs.writeFileSync(`assets/styles/${css}.css`, result.uncritical);
      fs.writeFileSync(`../_includes/${dest}.css`, result.css)
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
  ['html'],
  done
))

const revision = (section, done) => {
  gulp.src(`./dependencies-${section}.html`)
    .pipe(gulpRevAppend())
    .pipe(gulp.dest('_includes'))
  done()
}

gulp.task('rev-js-home', (done) => revision('js-home', done))

gulp.task('rev-js-blog', (done) => revision('js-blog', done))

gulp.task('rev-css-home', (done) => revision('css-home', done))

gulp.task('rev-css-blog-archive', (done) => revision('css-blog-archive', done))

gulp.task('rev-css-blog-home', (done) => revision('css-blog-home', done))

gulp.task('rev-css-blog-post', (done) => revision('css-blog-post', done))

gulp.task('rev-css-blog-tags', (done) => revision('css-blog-tags', done))

gulp.task('rev-css-privacy-policy', (done) => revision('css-privacy-policy', done))

gulp.task('rev-css-cookie-policy', (done) => revision('css-cookie-policy', done))

gulp.task('rev-css-error', (done) => revision('css-error', done))

const serviceWorkerUrlFor = (section, done) => {
  exec(`./_scripts/generate-service-worker-urls.sh ${section}`, (err, stdout, stderr) => {
    done()
  })
}

gulp.task('service-worker-js-home-urls', (done) => {
  serviceWorkerUrlFor('js-home', done)
});

gulp.task('service-worker-js-blog-urls', (done) => {
  serviceWorkerUrlFor('js-blog', done)
});

gulp.task('service-worker-css-home-urls', (done) => {
  serviceWorkerUrlFor('css-home', done)
});

gulp.task('service-worker-css-blog-archive-urls', (done) => {
  serviceWorkerUrlFor('css-blog-archive', done)
});

gulp.task('service-worker-css-blog-home-urls', (done) => {
  serviceWorkerUrlFor('css-blog-home', done)
});

gulp.task('service-worker-css-blog-post-urls', (done) => {
  serviceWorkerUrlFor('css-blog-post', done)
});

gulp.task('service-worker-css-blog-tags-urls', (done) => {
  serviceWorkerUrlFor('css-blog-tags', done)
});

gulp.task('service-worker-css-privacy-policy-urls', (done) => {
  serviceWorkerUrlFor('css-privacy-policy', done)
});

gulp.task('service-worker-css-cookie-policy-urls', (done) => {
  serviceWorkerUrlFor('css-cookie-policy', done)
});

gulp.task('service-worker-css-error-urls', (done) => {
  serviceWorkerUrlFor('css-error', done)
});

gulp.task('jekyll-build', (done) => exec(`bundle exec jekyll build`, (err, stdout, stderr) => done()))

const build = gulp.series(
  'css-home',
  'css-blog-archive',
  'css-blog-home',
  'css-blog-post',
  'css-blog-tags',
  'css-privacy-policy',
  'css-cookie-policy',
  'css-error',
  'flow',
  'lint',
  'bundle-home-scripts',
  'bundle-blog-scripts',
  'images',
  'fonts',
  'models',
  'rev-js-home',
  'rev-js-blog',
  'rev-css-home',
  'rev-css-blog-archive',
  'rev-css-blog-home',
  'rev-css-blog-post',
  'rev-css-blog-tags',
  'rev-css-privacy-policy',
  'rev-css-cookie-policy',
  'rev-css-error',
  'service-worker-js-home-urls',
  'service-worker-js-blog-urls',
  'service-worker-css-home-urls',
  'service-worker-css-blog-archive-urls',
  'service-worker-css-blog-home-urls',
  'service-worker-css-blog-post-urls',
  'service-worker-css-blog-tags-urls',
  'service-worker-css-privacy-policy-urls',
  'service-worker-css-cookie-policy-urls',
  'service-worker-css-error-urls',
  'jekyll-build', //First build for critical/purge css
  'purge-css-home',
  'purge-css-blog-home',
  'purge-css-blog-archive',
  'purge-css-blog-tags',
  'purge-css-error',
  'purge-css-privacy-policy',
  'purge-css-cookie-policy',
  'purge-css-blog-post',
  'css-critical', 
  'jekyll-build' //Generate site with css critical path and purge from unused rules
)

export default build
