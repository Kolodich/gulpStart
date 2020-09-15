const PATH = require("../../settings").PATH;

const gulp = require("gulp");
const clean = require("gulp-clean");

function cleanDist(done){
 gulp.src(PATH.dist+"**/*.*", {read: false})
 .pipe(clean())
 done()
};

module.exports.cleanDist = cleanDist;