import gulp from "gulp";
import gulpConcat from "gulp-concat";
import gulpSass from "gulp-sass";
import child from "child_process";
import gulpUtil from "gulp-util";
import gulpRevAppend from "gulp-rev-append";
import {create} from "browser-sync";
import gulpUglify from "gulp-uglify";
import yargs from "yargs";
import critical from "critical";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import browserify from "browserify";
import babelify from "babelify"

const isTravis = yargs.argv.travis !== undefined;
const isDevelopment = yargs.argv.dev !== undefined;
const cssFiles = '_css/**/*.?(s)css';
const jsFiles = '_js/**/*.js';
const siteRoot = '_site';

gulp.task('serve', () => {
    const browserSync = create();
    browserSync.init({
        files: [siteRoot + '/**'],
        port: 4000,
        server: {
            baseDir: siteRoot
        },
        browser: ["chrome"]
    });
    gulp.watch(jsFiles, ['bundle-home-scripts']);
    gulp.watch(jsFiles, ['bundle-blog-scripts']);
    gulp.watch(cssFiles, ['css']);
});

gulp.task('jekyll', () => {
    let options = ['build', '--watch', '--incremental', '--verbose', '--profile', '--future'];
    if (isTravis) {
        options = ['build', '--incremental'];
    }
    const jekyll = child.spawn('jekyll', options);
    const jekyllLogger = buffer => {
        buffer.toString()
            .split(/\n/)
            .forEach(function (message) {
                gulpUtil.log('Jekyll: ' + message)
            });
    };
    jekyll.stdout.on('data', jekyllLogger);
    jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('css', () => {
    gulp.src(cssFiles)
        .pipe(gulpSass({outputStyle: isDevelopment ? 'expanded' : 'compressed'}))
        .pipe(gulpConcat('style.css'))
        .pipe(gulp.dest('assets/styles'))
});

gulp.task('bundle-home-scripts', () => browserify({entries: '_js/index.js'})
    .transform(babelify.configure({presets: ["env"]}))
    .bundle()
    .pipe(source('index.min.js'))
    .pipe(buffer())
    .pipe(isDevelopment ? gulpUtil.noop() : gulpUglify())
    .pipe(gulp.dest('assets/js')));

gulp.task('bundle-blog-scripts', () => browserify({entries: '_js/blog.js'})
    .transform(babelify.configure({presets: ["env"]}))
    .bundle()
    .pipe(source('blog.min.js'))
    .pipe(buffer())
    .pipe(isDevelopment ? gulpUtil.noop() : gulpUglify())
    .pipe(gulp.dest('assets/js')));

gulp.task('vendor-scripts', () => gulp
    .src([
        // '_js/vendor/jquery.js',
        // '_js/vendor/bootstrap.min.js',
        //'_js/vendor/gsap/TweenMax.min.js',
        //'_js/vendor/gsap/plugins/ScrollToPlugin.min.js'
    ])
    .pipe(gulpConcat('vendor.min.js'))
    .pipe(gulp.dest('assets/js'))
    .pipe(isDevelopment ? gulpUtil.noop() : gulpUglify())
    .pipe(gulp.dest('assets/js')));

gulp.task('images', () => gulp
    .src(['_images/**/*.png', '_images/**/*.jpg', '_images/**/*.jpeg', '_images/**/*.gif'])
    .pipe(gulp.dest('assets/images')));

gulp.task('fonts', () => gulp
    .src('_fonts/**/*.*')
    .pipe(gulp.dest('assets/fonts')));

gulp.task('models', () => gulp
    .src('_models/**/*.*')
    .pipe(gulp.dest('assets/models')));

gulp.task('force-copy', () => gulp
    .src(['assets'])
    .pipe(gulp.dest('_site/assets')));

//**** Used in command line flow ****//

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
    });

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
    });

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
    });

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
    });

    critical.generate({
        base: '_site/',
        src: '2017/05/10/about-me.html', //article used as template for critical css on all post pages.
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
    });
});

gulp.task('rev-home', () => {
    gulp.src('./home-dependencies.html')
        .pipe(gulpRevAppend())
        .pipe(gulp.dest('_includes'));
});

gulp.task('rev-blog', () => {
    gulp.src('./blog-dependencies.html')
        .pipe(gulpRevAppend())
        .pipe(gulp.dest('_includes'));
});

gulp.task('default', [
    'css',
    'bundle-home-scripts',
    'bundle-blog-scripts',
    'vendor-scripts',
    'images',
    'fonts',
    'models',
    'rev-home',
    'rev-blog',
    'jekyll',
    'serve'
]);

gulp.task('test', [
    'css',
    'bundle-home-scripts',
    'bundle-blog-scripts',
    'vendor-scripts',
    'images',
    'fonts',
    'models',
    'rev-home',
    'rev-blog',
    'jekyll'
]);
