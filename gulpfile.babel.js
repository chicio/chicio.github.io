import gulp from 'gulp'
import gulpConcat from 'gulp-concat'
import gulpSass from 'gulp-sass'
import gulpUtil from 'gulp-util'
import gulpRevAppend from 'gulp-rev-append'
import gulpUglify from 'gulp-uglify'
import gulpEslint from 'gulp-eslint'
import yargs from 'yargs'
import critical from 'critical'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import browserify from 'browserify'
import babelify from 'babelify'

const isDebug = yargs.argv.debug !== undefined
const cssFiles = '_css/**/*.?(s)css'

gulp.task('css', () => {
  gulp.src(cssFiles)
    .pipe(gulpSass({ outputStyle: isDebug ? 'expanded' : 'compressed' }))
    .pipe(gulpConcat('style.css'))
    .pipe(gulp.dest('assets/styles'))
})

gulp.task('lint', () => gulp.src('_js/**')
  .pipe(gulpEslint())
  .pipe(gulpEslint.format())
  .pipe(gulpEslint.failOnError()))

gulp.task('bundle-home-scripts', () => browserify({ entries: '_js/index.home.js' })
  .transform(babelify.configure({ presets: ['env'] }))
  .bundle()
  .pipe(source('index.home.min.js'))
  .pipe(buffer())
  .pipe(isDebug ? gulpUtil.noop() : gulpUglify())
  .pipe(gulp.dest('assets/js')))

gulp.task('bundle-blog-scripts', () => browserify({ entries: '_js/index.blog.js' })
  .transform(babelify.configure({ presets: ['env'] }))
  .bundle()
  .pipe(source('index.blog.min.js'))
  .pipe(buffer())
  .pipe(isDebug ? gulpUtil.noop() : gulpUglify())
  .pipe(gulp.dest('assets/js')))

gulp.task('images', () => gulp
  .src(['_images/**/*.png', '_images/**/*.jpg', '_images/**/*.jpeg', '_images/**/*.gif'])
  .pipe(gulp.dest('assets/images')))

gulp.task('fonts', () => gulp
  .src('_fonts/**/*.*')
  .pipe(gulp.dest('assets/fonts')))

gulp.task('models', () => gulp
  .src('_models/**/*.*')
  .pipe(gulp.dest('assets/models')))

gulp.task('force-copy', () => gulp
  .src(['assets'])
  .pipe(gulp.dest('_site/assets')))

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

gulp.task('rev-home', () => {
  gulp.src('./dependencies-home.html')
    .pipe(gulpRevAppend())
    .pipe(gulp.dest('_includes'))
})

gulp.task('rev-blog', () => {
  gulp.src('./dependencies-blog.html')
    .pipe(gulpRevAppend())
    .pipe(gulp.dest('_includes'))
})

gulp.task('rev-css', () => {
  gulp.src('./dependencies-css.html')
    .pipe(gulpRevAppend())
    .pipe(gulp.dest('_includes'))
})

gulp.task('default', [
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
])
