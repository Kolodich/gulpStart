const PATH = require("../../settings").PATH;

const gulp = require("gulp");

function imgCopy(done) {
 gulp.src(PATH.src.img+"**/*.*")
 .pipe(gulp.dest(PATH.dist.img))
 done();
};

module.exports.imgCopy = imgCopy;