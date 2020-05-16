import gulp from 'gulp'
import gulpImagemin from 'gulp-imagemin'
import gulpEnvironments from 'gulp-environments'
import gulpChanged from 'gulp-changed'
import purgecss from 'gulp-purgecss'
import critical from 'critical'
import webpackStream from 'webpack-stream'
import webpack from 'webpack'
import { exec } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

const production = gulpEnvironments.production

const SITE_FOLDER = '_site'
const ASSETS_FOLDER = 'assets'
const ASSESTS_DIST_FOLDER = `${ASSETS_FOLDER}/dist`
const JS_FOLDER = '_ts'
const JS_HOME = 'index.home'
const JS_BLOG = 'index.blog'
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

const bundle = () => {
  const homeJs = `./${JS_FOLDER}/${JS_HOME}.ts`
  const blogJs = `./${JS_FOLDER}/${JS_BLOG}.ts`
  const styleHome = `./${CSS_FOLDER}/${CSS_HOME}.scss`
  const styleBlogArchive = `./${CSS_FOLDER}/${CSS_BLOG_ARCHIVE}.scss`
  const styleBlogHome = `./${CSS_FOLDER}/${CSS_BLOG_HOME}.scss`
  const styleBlogPost = `./${CSS_FOLDER}/${CSS_BLOG_POST}.scss`
  const styleBlogTags = `./${CSS_FOLDER}/${CSS_BLOG_TAGS}.scss`
  const stylePrivacyPolicy = `./${CSS_FOLDER}/${CSS_PRIVACY_POLICY}.scss`
  const styleCookiePolicy = `./${CSS_FOLDER}/${CSS_COOKIE_POLICY}.scss`
  const styleError = `./${CSS_FOLDER}/${CSS_ERROR}.scss`
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
  ]).pipe(webpackStream({
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
        publicPath: `${ASSESTS_DIST_FOLDER}/`,
        path: path.resolve(__dirname, ASSESTS_DIST_FOLDER),
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
    }, webpack))
    .pipe(gulp.dest(ASSESTS_DIST_FOLDER))
}

const copyFiles = (folder) => {
  const destination = `${ASSETS_FOLDER}/${folder}`
  return gulp
    .src([`_${folder}/**/*.*`])
    .pipe(gulpChanged(destination))
    .pipe(gulp.dest(destination))
}
const fonts = () => copyFiles('fonts')
const models = () => copyFiles('models')

const criticalCss = (src, dest, css) => (
  critical.generate({
    base: `${SITE_FOLDER}/`,
    src: `${SITE_FOLDER}/${src}.html`,
    css: [`../${ASSESTS_DIST_FOLDER}/${css}.${hash()}.css`],
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
      fs.writeFileSync(`${ASSESTS_DIST_FOLDER}/${css}.${hash()}.css`, result.uncritical)
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
    .src(`${SITE_FOLDER}/${ASSESTS_DIST_FOLDER}/${cssName}.${hash()}.css`)
    .pipe(purgecss({ content: content, whitelist: whitelist }))
    .pipe(gulp.dest(`${ASSESTS_DIST_FOLDER}/`))
)
const purgeCss = () => Promise.all([
  purgeCssUsing(CSS_HOME, [`./${SITE_FOLDER}/index.html`, `./${SITE_FOLDER}/${ASSESTS_DIST_FOLDER}/${JS_HOME}.${hash()}.min.js`]),
  purgeCssUsing(CSS_BLOG_ARCHIVE, [`./${SITE_FOLDER}/blog/archive/index.html`, `./${SITE_FOLDER}/${ASSESTS_DIST_FOLDER}/${JS_BLOG}.${hash()}.min.js`]),
  purgeCssUsing(CSS_BLOG_HOME, [`./${SITE_FOLDER}/blog/index.html`, `./${SITE_FOLDER}/${ASSESTS_DIST_FOLDER}/${JS_BLOG}.${hash()}.min.js`]),
  purgeCssUsing(CSS_BLOG_TAGS, [`./${SITE_FOLDER}/blog/tags/index.html`, `./${SITE_FOLDER}/${ASSESTS_DIST_FOLDER}/${JS_BLOG}.${hash()}.min.js`]),
  purgeCssUsing(CSS_ERROR, [`./${SITE_FOLDER}/offline.html`, `./${SITE_FOLDER}/${ASSESTS_DIST_FOLDER}/${JS_BLOG}.${hash()}.min.js`]),
  purgeCssUsing(CSS_PRIVACY_POLICY, [`./${SITE_FOLDER}/privacy-policy.html`, `./${SITE_FOLDER}/${ASSESTS_DIST_FOLDER}/${JS_BLOG}.${hash()}.min.js`]),
  purgeCssUsing(CSS_COOKIE_POLICY, [`./${SITE_FOLDER}/cookie-policy.html`, `./${SITE_FOLDER}/${ASSESTS_DIST_FOLDER}/${JS_BLOG}.${hash()}.min.js`]),
  purgeCssUsing(CSS_BLOG_POST, [`./${SITE_FOLDER}/20**/**/**.html`, `./${SITE_FOLDER}/${ASSESTS_DIST_FOLDER}/${JS_BLOG}.${hash()}.min.js`], ['katex-display'])
])

const jekyllBuild = (done) => exec('./_scripts/build.sh', (err, stdout, stderr) => done(err))

export const images = () => {
  const destination = `${ASSETS_FOLDER}/images`
  return gulp
    .src(['_images/**/*.*'])
    .pipe(gulpChanged(destination))
    .pipe(production(gulpImagemin()))
    .pipe(gulp.dest(destination))
}

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
