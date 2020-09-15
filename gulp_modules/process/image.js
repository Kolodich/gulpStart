const PATH = require("../../settings").PATH;
const CLEAN = require("../../settings").CLEAN;

const gulp = require("gulp");
const image = require("gulp-image");
const rename = require("gulp-rename");
const clean = require("gulp-clean");

function imgCompress(done) {
 if(CLEAN.develop.img){
  gulp.src(PATH.src.img+"**/*[!.min].{svg,png,gif,jpg,jpeg}")
  .pipe(clean({force: true}))
  .pipe(image())
  .pipe(rename(function (path) {
   path.basename += ".min";
  }))
  .pipe(gulp.dest(PATH.src.img))
 }
 done();
};

module.exports.imgCompress = imgCompress;