const PATH = require("../../settings").PATH;
const CLEAN = require("../../settings").CLEAN;
const SOURCEMAP = require("../../settings").SOURCEMAP;

const gulp = require("gulp");
const gulpif = require("gulp-if");
const sourcemap = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const fileinclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const beautify = require('gulp-jsbeautifier');

function htmlCompile(done) {
 gulp.src(PATH.src.viewsPages+"**/*.html")
 .pipe(gulpif(SOURCEMAP.develop.page, sourcemap.init()))
 .pipe(fileinclude({
  prefix: '@@',
  basepath: '@file'
 }))
 .on('error', console.log)
 .pipe(gulpif(CLEAN.develop.page, htmlmin({ collapseWhitespace: true })))
 .pipe(gulpif(CLEAN.develop.page, rename(function (path) {
  path.dirname = "";
  path.basename += ".min";
 })))
 .pipe(gulpif(!CLEAN.develop.page, rename(function (path) {
  path.dirname = "";
 })))
 .pipe(gulpif(!CLEAN.develop.page, beautify({indent_size: CLEAN.indentSizeHTML})))
 .pipe(gulpif(SOURCEMAP.develop.page, sourcemap.write("./")))
 .pipe(gulp.dest(PATH.src.html));
 done();
};

module.exports.htmlCompile = htmlCompile;