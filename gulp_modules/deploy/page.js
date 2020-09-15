const PATH = require("../../settings").PATH;
const CLEAN = require("../../settings").CLEAN;
const SOURCEMAP = require("../../settings").SOURCEMAP;

const gulp = require("gulp");
const gulpif = require("gulp-if");
const htmlmin = require('gulp-htmlmin');
const beautify = require('gulp-jsbeautifier');
const rename = require("gulp-rename");
const replace = require('gulp-replace');

function htmlBuild(done) {
 setTimeout(()=>{
  gulp.src(PATH.src.html+"*.html")
  .pipe(replace('../../../', './'))
  .pipe(replace('../../', './'))
  .pipe(replace(/src=".*?"/, (math)=>math.replace(/ /g, "%20")))
  .pipe(gulpif(CLEAN.deploy.page, htmlmin({ collapseWhitespace: true })))
  .pipe(gulpif(CLEAN.deploy.page, rename(function (path) {
   path.dirname = "";
   path.basename = path.basename.indexOf(".min")>0 ? path.basename : path.basename+".min";
  })))
  .pipe(gulpif(CLEAN.deploy.script,  replace(/<script.*src=".*".*><\/script>/g, (match) => match.replace(".js", ".min.js"))))
  .pipe(gulpif(!CLEAN.deploy.script, replace(/<script.*src=".*".*><\/script>/g, (match) => match.replace(".min.js", ".js"))))
  .pipe(gulpif(CLEAN.deploy.style,   replace(/<link.*rel="stylesheet".*?>/g,   (match) => match.replace(".css", ".min.css"))))
  .pipe(gulpif(!CLEAN.deploy.style,  replace(/<link.*rel="stylesheet".*?>/g,   (match) => match.replace(".min.css", ".css"))))
  .pipe(gulpif(!CLEAN.deploy.page, rename(function (path) {
   path.dirname = "";
   path.basename = path.basename.replace(".min", "");
  })))
  .pipe(gulpif(!CLEAN.deploy.page, beautify({indent_size: CLEAN.indentSizeHTML})))
  .pipe(gulp.dest(PATH.dist.self));
  gulp.src(PATH.src.html+"*.html.map")
  .pipe(gulpif(SOURCEMAP.deploy.isDevelopSourecemaps, gulp.dest(PATH.dist.self)));
 }, 100);
 done();
}

module.exports.htmlBuild = htmlBuild;