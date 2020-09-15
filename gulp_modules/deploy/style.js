const PATH = require("../../settings").PATH;
const CLEAN = require("../../settings").CLEAN;
const SOURCEMAP = require("../../settings").SOURCEMAP;

const gulp = require("gulp");
const gulpif = require("gulp-if");
const rename = require("gulp-rename");
const beautify = require('gulp-jsbeautifier');
const cleanCSS = require('gulp-clean-css');
const shorthand = require('gulp-shorthand');
const autoprefixer = require('gulp-autoprefixer');
const replace = require('gulp-replace');

function cssBuild(done) {
 setTimeout(()=>{
  gulp.src(PATH.src.cssLibs+"**/*.css")
  .pipe(gulp.dest(PATH.dist.cssLibs));
  gulp.src(PATH.src.css+"/*.css")
  .pipe(replace('../../../', '../'))
  .pipe(replace('../../', '../'))
  .pipe(gulpif(CLEAN.deploy.style, shorthand()))
  .pipe(autoprefixer({
   cascade: false,
  }))
  .pipe(gulpif(CLEAN.deploy.style, cleanCSS({compatibility: 'ie8'})))
  .pipe(gulpif(CLEAN.deploy.style, rename(function (path) {
   path.dirname = "";
   path.basename = path.basename.indexOf(".min")>0 ? path.basename : path.basename+".min";
  })))
  .pipe(gulpif(!CLEAN.deploy.style, rename(function (path) {
   path.dirname = "";
   path.basename = path.basename.replace(".min", "");
  })))
  .pipe(gulpif(!CLEAN.deploy.style, beautify({indent_size: CLEAN.indentSizeCSS})))
  .pipe(gulp.dest(PATH.dist.css));
  gulp.src(PATH.src.css+"*.css.map")
  .pipe(gulpif(SOURCEMAP.deploy.isDevelopSourecemaps, gulp.dest(PATH.dist.css)));
 }, 500);
 done();
}

module.exports.cssBuild = cssBuild;