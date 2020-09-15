const PATH = require("../../settings").PATH;
const CLEAN = require("../../settings").CLEAN;
const SOURCEMAP = require("../../settings").SOURCEMAP;

const gulp = require("gulp");
const gulpif = require("gulp-if");
const rename = require("gulp-rename");
const beautify = require('gulp-jsbeautifier');
const uglify = require("gulp-uglify-es").default;
const babel = require("gulp-babel");
const shorthand = require('gulp-shorthand');

function jsBuild(done) {
 setTimeout(()=>{
  gulp.src(PATH.src.jsLibs+"**/*.js")
 .pipe(gulp.dest(PATH.dist.jsLibs));
 gulp.src(PATH.src.js+"/*.js")
 .pipe(babel({
  presets: ['@babel/env']
 }))
 .pipe(gulpif(CLEAN.deploy.script,  uglify().on('error', function(e){
  console.log(e);
 })))
 .pipe(gulpif(CLEAN.deploy.script, rename(function (path) {
  path.dirname = "";
  path.basename = path.basename.indexOf(".min")>0 ? path.basename : path.basename+".min";
 })))
 .pipe(gulpif(!CLEAN.deploy.script, rename(function (path) {
  path.dirname = "";
  path.basename = path.basename.replace(".min", "");
 })))
 .pipe(gulpif(!CLEAN.deploy.script, beautify({indent_size: CLEAN.indentSizeJS})))
 .pipe(gulp.dest(PATH.dist.js));
 gulp.src(PATH.src.js+"*.js.map")
 .pipe(gulpif(SOURCEMAP.deploy.isDevelopSourecemaps, gulp.dest(PATH.dist.js)));
 }, 500); 
 done();
}

module.exports.jsBuild = jsBuild;