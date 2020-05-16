import gulp from 'gulp'
import gulpImagemin from 'gulp-imagemin'
import gulpEnvironments from 'gulp-environments'
import gulpChanged from 'gulp-changed'
import purgecss from 'gulp-purgecss'
import critical from 'critical'
import webpack from 'webpack-stream'
import { exec } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

const production = gulpEnvironments.production

const CSS_FOLDER = '_css'
const CSS_HOME = 'style.home'
const CSS_BLOG = 'style.blog'
const CSS_BLOG_ARCHIVE = `${CSS_BLOG}.archive`
const CSS_BLOG_HOME = `${CSS_BLOG}.home`
const CSS_BLOG_POST = `${CSS_BLOG}.post`
const CSS_BLOG_TAGS = `${CSS_BLOG}.tags`
const CSS_PRIVACY_POLICY = 'style.privacypolicy'
const CSS_COOKIE_POLICY = 'style.cookiepolicy'
const CSS_ERROR = 'style.error'

const hash = () => {
  const webpack = fs.readFileSync(path.join(__dirname, "_data", "webpack.yml"), 'utf8')
  return webpack.split(" ")[1]
}

class JekyllPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('JekyllPlugin - save hash', (stats) => {
      fs.writeFileSync(path.join(__dirname, "_data", "webpack.yml"), `hash: ${stats.hash}`);
    });
  }
}

export const bundle = () => {
  const homeJs = './_ts/index.home.ts'
  const blogJs = './_ts/index.blog.ts'
  const styleHome = './_css/style.home.scss'
  const styleBlogArchive = './_css/style.blog.archive.scss'
  const styleBlogHome = './_css/style.blog.home.scss'
  const styleBlogPost = './_css/style.blog.post.scss'
  const styleBlogTags = './_css/style.blog.tags.scss'
  const stylePrivacyPolicy = './_css/style.privacypolicy.scss'
  const styleCookiePolicy = './_css/style.cookiepolicy.scss'
  const styleError = './_css/style.error.scss'
  return gulp.src([
    homeJs, 
    blogJs, 
    styleHome, 
    styleBlogArchive, 
    styleBlogHome, 
    styleBlogPost, 
    styleBlogTags, 
    stylePrivacyPolicy,
    styleCookiePolicy,
    styleError
  ]).pipe(webpack({
      mode: production() ? 'production' : 'development',
      performance: { hints: production() ? false : 'warning' },
      entry: {
        'index.home': homeJs,
        'index.blog': blogJs,
        'style.home': styleHome,
        'style.blog.archive': styleBlogArchive,
        'style.blog.home': styleBlogHome,
        'style.blog.post': styleBlogPost,
        'style.blog.tags': styleBlogTags,
        'style.privacypolicy': stylePrivacyPolicy,
        'style.cookiepolicy': styleCookiePolicy,
        'style.error': styleError
      },
      output: {
        filename: '[name].[hash].min.js',
        chunkFilename: '[name].[chunkhash].bundle.js',
        publicPath: 'assets/dist/',
        path: path.resolve(__dirname, 'assets/dist'),
      },
      module: {
        rules: [
          {
            enforce: 'pre',
            test: /\.ts?$/,
            use: ['eslint-loader'],
            exclude: /node_modules/
          },
          {
            test: /\.ts?$/,
            use: ['ts-loader'],
            exclude: /node_modules/
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'sass-loader',
            ],
          },
        ]
      },
      resolve: {
        extensions: ['.ts', '.js']
      },
      plugins: [
        new JekyllPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: '[name].[hash].css'
        }),
        new FixStyleOnlyEntriesPlugin()
      ]
    }))
    .pipe(gulp.dest('assets/dist'))
}

const copyFiles = (folder) => {
  const destination = `assets/${folder}`
  return gulp
    .src([`_${folder}/**/*.*`])
    .pipe(gulpChanged(destination))
    .pipe(gulp.dest(destination))
}
const fonts = () => copyFiles('fonts')
const models = () => copyFiles('models')

const criticalCss = (src, dest, css) => (
  critical.generate({
    base: '_site/',
    src: `_site/${src}.html`,
    css: [`../assets/dist/${css}.${hash()}.css`],
    dimensions: [
      { width: 320, height: 480 },
      { width: 768, height: 1024 },
      { width: 1280, height: 1024 }
    ],
    extract: true,
    inline: true,
    penthouse: {
      // DEBUG: decomment to see critical screenshots
      // screenshots: { basePath: `_critical-screenshots/${dest}`, type: 'jpeg', quality: 20 },
      renderWaitTime: 30
    },
    ignore: { rule: [/footer-icon/, /icon-/, /phone-number/] }
  }, (err, result) => {
    if (err === null) {
      fs.writeFileSync(`assets/dist/${css}.${hash()}.css`, result.uncritical)
      fs.writeFileSync(`_includes/${dest}.css`, result.css)
    }
  })
)
const cssCritical = (done) => Promise.all([
  criticalCss('index', 'critical', CSS_HOME),
  criticalCss('blog/index', 'critical-blog', CSS_BLOG_HOME),
  criticalCss('blog/archive/index', 'critical-blog-post-archive', CSS_BLOG_ARCHIVE),
  criticalCss('blog/tags/index', 'critical-blog-tags', CSS_BLOG_TAGS),
  criticalCss('2017/08/25/how-to-calculate-reflection-vector.', 'critical-blog-post', CSS_BLOG_POST),
  criticalCss('privacy-policy', 'critical-privacy-policy', CSS_PRIVACY_POLICY),
  criticalCss('cookie-policy', 'critical-cookie-policy', CSS_COOKIE_POLICY),
  criticalCss('offline', 'critical-error', CSS_ERROR)
])

const purgeCssUsing = (cssName, content, whitelist = []) => (
  gulp
    .src(`_site/assets/dist/${cssName}.${hash()}.css`)
    .pipe(purgecss({ content: content, whitelist: whitelist }))
    .pipe(gulp.dest('assets/dist/'))
)
const purgeCss = () => Promise.all([
  purgeCssUsing(CSS_HOME, ['./_site/index.html', './_site/assets/js/index.home.min.js']),
  purgeCssUsing(CSS_BLOG_ARCHIVE, ['./_site/blog/archive/index.html', './_site/assets/js/index.blog.min.js']),
  purgeCssUsing(CSS_BLOG_HOME, ['./_site/blog/index.html', './_site/assets/js/index.blog.min.js']),
  purgeCssUsing(CSS_BLOG_TAGS, ['./_site/blog/tags/index.html', './_site/assets/js/index.blog.min.js']),
  purgeCssUsing(CSS_ERROR, ['./_site/offline.html', './_site/assets/js/index.blog.min.js']),
  purgeCssUsing(CSS_PRIVACY_POLICY, ['./_site/privacy-policy.html', './_site/assets/js/index.blog.min.js']),
  purgeCssUsing(CSS_COOKIE_POLICY, ['./_site/cookie-policy.html', './_site/assets/js/index.blog.min.js']),
  purgeCssUsing(CSS_BLOG_POST, ['./_site/20**/**/**.html', './_site/assets/js/index.blog.min.js'], ['katex-display', 'iframe'])
])

const jekyllBuild = (done) => exec('./_scripts/build.sh', (err, stdout, stderr) => done(err))

export const images = () => {
  const destination = 'assets/images'
  return gulp
    .src(['_images/**/*.*'])
    .pipe(gulpChanged(destination))
    .pipe(production(gulpImagemin()))
    .pipe(gulp.dest(destination))
}

export const watchBundle = () => gulp.watch(`${CSS_FOLDER}/*.scss`, gulp.series(
  bundle,
  jekyllBuild, // First build for critical/purge css
  purgeCss,
  jekyllBuild, // Generate site with css critical path and purge from unused rules
  cssCritical
))

export const build = gulp.series(
  bundle,
  images,
  fonts,
  models,
  jekyllBuild, // First build for critical/purge css
  purgeCss,
  jekyllBuild, // Generate site with css critical path and purge from unused rules
  cssCritical,
  jekyllBuild // Site is ready
)
