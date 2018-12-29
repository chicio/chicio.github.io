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

gulp.task('css', (done) => {
  gulp.src('_css/**/*.?(s)css')
    .pipe(gulpSass({ outputStyle: 'compressed' }))
    .pipe(gulpConcat('style.css'))
    .pipe(gulp.dest('assets/styles'))
  done()
})

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

const criticalCss = (src, dest) => (
  critical.generate({
    base: '_site/',
    src: `${src}.html`,
    css: ['assets/styles/style.css'],
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
  criticalCss('index', 'critical')
  criticalCss('blog/index', 'critical-blog')
  criticalCss('blog/archive/index', 'critical-blog-post-archive')
  criticalCss('blog/tags/index', 'critical-blog-tags')
  criticalCss('2017/05/10/about-me', 'critical-blog-post')
  done()
})

const revision = (section, done) => {
  gulp.src(`./dependencies-${section}.html`)
    .pipe(gulpRevAppend())
    .pipe(gulp.dest('_includes'))
  done()
}

gulp.task('rev-home', (done) => revision('home', done))

gulp.task('rev-blog', (done) => revision('blog', done))

gulp.task('rev-css', (done) => revision('css', done))

const serviceWorkerUrlFor = (section, done) => {
  exec(`./scripts/generate-service-worker-urls.sh ${section}`, (err, stdout, stderr) => {
    done()
  })
}

gulp.task('service-worker-home-urls', (done) => {
  serviceWorkerUrlFor('home', done)
});

gulp.task('service-worker-blog-urls', (done) => {
  serviceWorkerUrlFor('blog', done)
});

gulp.task('service-worker-css-urls', (done) => {
  serviceWorkerUrlFor('css', done)
});

gulp.task('jekyll-build', (done) => exec(`jekyll build`, (err, stdout, stderr) => done()))

const build = gulp.series(
  'css',
  'flow',
  'lint',
  'bundle-home-scripts',
  'bundle-blog-scripts',
  'images',
  'fonts',
  'models',
  'rev-home',
  'rev-blog',
  'rev-css',
  'service-worker-home-urls',
  'service-worker-blog-urls',
  'service-worker-css-urls',
  'jekyll-build', //First build for critical css
  'css-critical', //Needs website already build in order to be executed
  'jekyll-build' //Generate site with css critical
)

export default build;
