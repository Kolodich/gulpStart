const PATH = require("../../settings").PATH;
const CLEAN = require("../../settings").CLEAN;
const SOURCEMAP = require("../../settings").SOURCEMAP;

const gulp = require("gulp");
const scss = require("gulp-sass");
const beautify = require('gulp-jsbeautifier');
const gulpif = require("gulp-if");
const sourcemap = require("gulp-sourcemaps");
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const shorthand = require('gulp-shorthand');

function scss2css(done){
 gulp.src(PATH.src.viewsPages+"**/*.scss")
 .pipe(gulpif(SOURCEMAP.develop.style, sourcemap.init()))
 .pipe(scss().on('error', scss.logError))
 .pipe(gulpif(CLEAN.develop.style, cleanCSS({compatibility: 'ie8'})))
 .pipe(gulpif(CLEAN.develop.style, rename(function (path) {
  path.dirname = "";
  path.basename += ".min";
  path.extname = ".css";
 })))
 .pipe(gulpif(!CLEAN.develop.style, rename(function (path) {
  path.dirname = "";
  path.extname = ".css";
 })))
 .pipe(gulpif(!CLEAN.develop.style, beautify({indent_size: CLEAN.indentSizeCSS})))
 .pipe(gulpif(SOURCEMAP.develop.style, sourcemap.write("./")))
 .pipe(gulp.dest(PATH.src.css));
 done();
};

module.exports.scss2css = scss2css;