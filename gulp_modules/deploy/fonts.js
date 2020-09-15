const PATH = require("../../settings").PATH;

const gulp = require("gulp");

function fontsCopy(done) {
 gulp.src(PATH.src.fonts+"**/*.*")
 .pipe(gulp.dest(PATH.dist.fonts))
 done();
};

module.exports.fontsCopy = fontsCopy;