const SOURCEMAP = {
 deploy: {
  isDevelopSourecemaps: false,
 },
 develop: {
  page: false,
  style: false,
  script: false,
 },
};

const CLEAN = {
 indentSizeHTML: 2,
 indentSizeCSS:  2,
 indentSizeJS:   2,
 deploy: {
  img:    false,
  page:   false,
  style:  true,
  script: true,
 },
 develop: {
  img:    false,
  page:   false,
  style:  false,
  script: false,
 },
}

const SERVER_CONFIG = {
 watch: true,
 files: [
  './src/html/**/*.html', 
 './src/css/**/*.css', 
 './src/fonts/**/*.*', 
 './src/js/**/*.js', 
 './src/img/**/*.*'],
 server: {
   baseDir: "./src/",
   index: "html/index.html"
 },
 routes: {
  "/node_modules": "node_modules"
 },
};

const PATH = {
 dist: {
  self: "./dist/",

  css: "./dist/css/",
  cssLibs: "./dist/css/libs/",
  js: "./dist/js/",
  jsLibs: "./dist/js/libs/",

  img: "./dist/img/",
  imgFavicon: "./dist/img/favicon/",
  fonts: "./dist/fonts/",
 },
 src: {
  self: "./src/",

  html: "./src/html/",
  css: "./src/css/",
  cssLibs: "./src/css/libs/",
  js: "./src/js/",
  jsLibs: "./src/js/libs/",

  fonts: "./src/fonts/",
  img: "./src/img/",
  imgFavicon: "./src/img/favicon/",

  modules: "./src/modules/",
  modulesCommon: "./src/modules/common/",
  modulesBlocks: "./src/modules/blocks/",
  views: "./src/views/",
  viewsCommon: "./src/views/common/",
  viewsPages: "./src/views/pages/",

  _js_global: "./src/_global.js",
  _scss_global: "./src/_global.scss",
 },
};

module.exports.PATH          = PATH;
module.exports.CLEAN         = CLEAN;
module.exports.SERVER_CONFIG = SERVER_CONFIG;
module.exports.SOURCEMAP     = SOURCEMAP;


