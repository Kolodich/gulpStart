const PATH = require("../../settings").PATH;
const CLEAN = require("../../settings").CLEAN;
const SOURCEMAP = require("../../settings").SOURCEMAP;

const gulp = require("gulp");
const gulpif = require("gulp-if");
const sourcemap = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const fileinclude = require('gulp-file-include');
const beautify = require('gulp-jsbeautifier');
const uglify = require("gulp-uglify-es").default;

function jsCompile(done) {
 gulp.src(PATH.src.viewsPages+"**/*.js")
 .pipe(gulpif(SOURCEMAP.develop.script, sourcemap.init()))
 .pipe(fileinclude({
  prefix: '@@',
  basepath: '@file'
 }))
 .pipe(gulpif(CLEAN.develop.script,  uglify().on('error', function(e){
  console.log(e);
 })))
 .pipe(gulpif(CLEAN.develop.script, rename(function (path) {
  path.dirname = "";
  path.basename += ".min";
 })))
 .pipe(gulpif(!CLEAN.develop.script, rename(function (path) {
  path.dirname = "";
 })))
 .pipe(gulpif(!CLEAN.develop.script, beautify({indent_size: CLEAN.indentSizeJS})))
 .pipe(gulpif(SOURCEMAP.develop.script, sourcemap.write("./")))
 .pipe(gulp.dest(PATH.src.js));
 done();
}

module.exports.jsCompile = jsCompile;