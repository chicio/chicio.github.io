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

gulp.task('lint', () => gulp.src('_js/**')
  .pipe(gulpEslint())
  .pipe(gulpEslint.format())
  .pipe(gulpEslint.failOnError()))

const bundleJs = (section) => (
  browserify({ entries: `_js/index.${section}.js` })
  .transform(babelify.configure({ presets: ['env'] }))
  .bundle()
  .pipe(source(`index.${section}.min.js`))
  .pipe(buffer())
  .pipe(gulpUglify())
  .pipe(gulp.dest('assets/js'))
)

gulp.task('bundle-home-scripts', () => bundleJs('home'))

gulp.task('bundle-blog-scripts', () => bundleJs('blog'))

gulp.task('images', () => gulp
  .src(['_images/**/*.png', '_images/**/*.jpg', '_images/**/*.jpeg', '_images/**/*.gif'])
  .pipe(gulp.dest('assets/images')))

gulp.task('fonts', () => gulp
  .src('_fonts/**/*.*')
  .pipe(gulp.dest('assets/fonts')))

gulp.task('models', () => gulp
  .src('_models/**/*.*')
  .pipe(gulp.dest('assets/models')))

gulp.task('css-critical', () => {
  critical.generate({
    base: '_site/',
    src: 'index.html',
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
    dest: '../_includes/critical.css',
    minify: true,
    extract: false
  })

  critical.generate({
    base: '_site/',
    src: 'blog/index.html',
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
    dest: '../_includes/critical-blog.css',
    minify: true,
    extract: false
  })

  critical.generate({
    base: '_site/',
    src: 'blog/archive/index.html',
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
    dest: '../_includes/critical-blog-post-archive.css',
    minify: true,
    extract: false
  })

  critical.generate({
    base: '_site/',
    src: 'blog/tags/index.html',
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
    dest: '../_includes/critical-blog-tags.css',
    minify: true,
    extract: false
  })

  critical.generate({
    base: '_site/',
    src: '2017/05/10/about-me.html', // article used as template for critical css on all post pages.
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
    dest: '../_includes/critical-blog-post.css',
    minify: true,
    extract: false
  })
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

const build =  gulp.series(
  'css',
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
  'service-worker-css-urls'
)

export default build;
