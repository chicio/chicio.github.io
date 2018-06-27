var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var child = require('child_process');
var gutil = require('gulp-util');
var rev = require('gulp-rev-append');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var argv = require('yargs').argv;
var critical = require('critical');

var isTravis = (argv.travis !== undefined);
var isDevelopment = (argv.dev !== undefined);
var cssFiles = '_css/**/*.?(s)css';
var jsFiles = '_js/**/*.js';
var siteRoot = '_site';

gulp.task('serve', function() {
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

gulp.task('jekyll', function() {
    var options = ['build', '--watch', '--incremental', '--verbose', '--profile', '--future'];
    if (isTravis) {
        options = ['build', '--incremental'];
    }
    var jekyll = child.spawn('jekyll', options);
    var jekyllLogger = function(buffer) {
        buffer.toString()
            .split(/\n/)
            .forEach(function (message) {
                gutil.log('Jekyll: ' + message)
            });
    };
    jekyll.stdout.on('data', jekyllLogger);
    jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('css', function() {
    gulp.src(cssFiles)
        .pipe(sass({outputStyle: isDevelopment ? 'expanded' : 'compressed'}))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('assets/styles'))
});

gulp.task('bundle-home-scripts', function() {
    return gulp.src(['_js/index.js'])
        .pipe(concat('index.min.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe(isDevelopment ? gutil.noop() : uglify())
        .pipe(gulp.dest('assets/js'));
});

gulp.task('bundle-blog-scripts', function() {
    return gulp.src(['_js/blog.js'])
        .pipe(concat('blog.min.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe(isDevelopment ? gutil.noop() : uglify())
        .pipe(gulp.dest('assets/js'));
});

gulp.task('vendor-scripts', function() {
    return gulp.src([
        '_js/vendor/threejs/three.js',
        '_js/vendor/threejs/Detector.js',
        '_js/vendor/threejs/OrbitControls.js',
        '_js/vendor/threejs/PLYLoader.js',
        '_js/vendor/webfont.js',
        '_js/vendor/jquery.js',
        '_js/vendor/bootstrap.min.js',
        '_js/vendor/gsap/TweenMax.min.js',
        '_js/vendor/scrollmagic/ScrollMagic.min.js',
        '_js/vendor/scrollmagic/plugins/animation.gsap.min.js',
        '_js/vendor/gsap/plugins/ScrollToPlugin.min.js'
    ]).pipe(concat('vendor.min.js'))
      .pipe(gulp.dest('assets/js'))
      .pipe(isDevelopment ? gutil.noop() : uglify())
      .pipe(gulp.dest('assets/js'));
});

gulp.task('images', function() {
    return gulp.src(['_images/**/*.png', '_images/**/*.jpg', '_images/**/*.jpeg', '_images/**/*.gif'])
        .pipe(gulp.dest('assets/images'))
});

gulp.task('fonts', function() {
    return gulp.src('_fonts/**/*.*')
        .pipe(gulp.dest('assets/fonts'))
});

gulp.task('models', function() {
    return gulp.src('_models/**/*.*')
        .pipe(gulp.dest('assets/models'))
});

gulp.task('force-copy', function() {
    return gulp.src(['assets'])
        .pipe(gulp.dest('_site/assets'))
});

//**** Used in command line flow ****//

gulp.task('css-critical', function() {
    critical.generate({
        base: '_site/',
        src: 'index.html',
        css: ['assets/styles/style.css'],
        dimensions: [{
            width: 320,
            height: 480
        },{
            width: 768,
            height: 1024
        },{
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
        },{
            width: 768,
            height: 1024
        },{
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
        },{
            width: 768,
            height: 1024
        },{
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
        },{
            width: 768,
            height: 1024
        },{
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
        },{
            width: 768,
            height: 1024
        },{
            width: 1280,
            height: 960
        }],
        dest: '../_includes/critical-blog-post.css',
        minify: true,
        extract: false
    });
});

gulp.task('rev-home', function() {
    gulp.src('./home-dependencies.html')
        .pipe(rev())
        .pipe(gulp.dest('_includes'));
});

gulp.task('rev-blog', function() {
    gulp.src('./blog-dependencies.html')
        .pipe(rev())
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

gulp.task('dev', [
    'rev-home',
    'rev-blog',
    'jekyll',
    'serve'
]);
