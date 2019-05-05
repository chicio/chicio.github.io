import gulp from 'gulp'
import gulpConcat from 'gulp-concat'
import gulpSass from 'gulp-sass'
import gulpRevAppend from 'gulp-rev-append'
import gulpUglify from 'gulp-uglify'
import gulpEslint from 'gulp-eslint'
import critical from 'critical'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import browserify from 'browserify'
import babelify from 'babelify'
import { exec } from 'child_process';

const CSS_HOME = 'style.home';
const CSS_BLOG = 'style.blog';

const css = (cssName, done) => {
  gulp.src(`_css/${cssName}.scss`)
    .pipe(gulpSass({ outputStyle: 'compressed' }))
    .pipe(gulpConcat(`${cssName}.css`))
    .pipe(gulp.dest('assets/styles'))
  done()
}

gulp.task('css-home', (done) => css(CSS_HOME, done))

gulp.task('css-blog', (done) => css(CSS_BLOG, done))

gulp.task('flow', (done) => {
  exec(`npm run flow`, (err, stdout, stderr) => {
    done()
  })
})

gulp.task('lint', () => (
  gulp.src('_jsbuild/**')
    .pipe(gulpEslint())
    .pipe(gulpEslint.format())
    .pipe(gulpEslint.failOnError()))
)

const bundleJs = (section) => (
  browserify({ entries: `_jsbuild/index.${section}.js` })
    .transform(babelify.configure({ presets: ['env'] }))
    .bundle()
    .pipe(source(`index.${section}.min.js`))
    .pipe(buffer())
    .pipe(gulpUglify())
    .pipe(gulp.dest('assets/js'))
)

gulp.task('bundle-home-scripts', () => bundleJs('home'))

gulp.task('bundle-blog-scripts', () => bundleJs('blog'))

const copyFiles = (folder) => (
  gulp
    .src([`_${folder}/**/*.*`])
    .pipe(gulp.dest(`assets/${folder}`))
)

gulp.task('images', () => copyFiles('images'))

gulp.task('fonts', () => copyFiles('fonts'))

gulp.task('models', () => copyFiles('models'))

const criticalCss = (src, dest, css) => (
  critical.generate({
    base: '_site/',
    src: `${src}.html`,
    css: [`assets/styles/${css}.css`],
    dimensions: [{
      width: 320,
      height: 480
    }, {
      width: 768,
      height: 1024
    }, {
      width: 1280,
      height: 960
    }],
    dest: `../_includes/${dest}.css`,
    minify: true,
    extract: false
  })
)

gulp.task('css-critical', (done) => {
  criticalCss('index', 'critical', CSS_HOME)
  criticalCss('blog/index', 'critical-blog', CSS_BLOG)
  criticalCss('blog/archive/index', 'critical-blog-post-archive', CSS_BLOG)
  criticalCss('blog/tags/index', 'critical-blog-tags', CSS_BLOG)
  criticalCss('2017/05/10/about-me', 'critical-blog-post', CSS_BLOG)
  done()
})

const revision = (section, done) => {
  gulp.src(`./dependencies-${section}.html`)
    .pipe(gulpRevAppend())
    .pipe(gulp.dest('_includes'))
  done()
}

gulp.task('rev-js-home', (done) => revision('js-home', done))

gulp.task('rev-js-blog', (done) => revision('js-blog', done))

gulp.task('rev-css-home', (done) => revision('css-home', done))

gulp.task('rev-css-blog', (done) => revision('css-blog', done))

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

gulp.task('service-worker-css-blog-urls', (done) => {
  serviceWorkerUrlFor('css-blog', done)
});

gulp.task('jekyll-build', (done) => exec(`bundle exec jekyll build`, (err, stdout, stderr) => done()))

const build = gulp.series(
  'css-home',
  'css-blog',
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
  'rev-css-blog',
  'service-worker-js-home-urls',
  'service-worker-js-blog-urls',
  'service-worker-css-home-urls',
  'service-worker-css-blog-urls',
  'jekyll-build', //First build for critical css
  'css-critical', //Needs website already build in order to be executed
  'jekyll-build' //Generate site with css critical
)

export default build;
