const gulp = require("gulp");
const server = require("./gulp_modules/process/server").server;
const scss2css = require("./gulp_modules/process/style").scss2css;
const htmlCompile = require("./gulp_modules/process/page").htmlCompile;
const jsCompile = require("./gulp_modules/process/script").jsCompile;
const imgCompress = require("./gulp_modules/process/image").imgCompress;
const watcher = require("./gulp_modules/process/watch").watcher;
const jsBuild = require("./gulp_modules/deploy/script").jsBuild;
const cssBuild = require("./gulp_modules/deploy/style").cssBuild;
const htmlBuild = require("./gulp_modules/deploy/page").htmlBuild;
const fontsCopy = require("./gulp_modules/deploy/fonts").fontsCopy;
const imgCopy = require("./gulp_modules/deploy/image").imgCopy;
const cleanDist = require("./gulp_modules/deploy/delete").cleanDist;
const createBlockAndPages = require("./gulp_modules/process/create").createBlockAndPages;

module.exports.default = gulp.series(
 gulp.parallel((done)=>{createBlockAndPages();done()}, scss2css, htmlCompile, jsCompile, imgCompress),
 gulp.parallel(watcher, server)
);
module.exports.server = server;
module.exports.watch = watcher;
module.exports.css = scss2css;
module.exports.html = htmlCompile;
module.exports.js = jsCompile;
module.exports.img = imgCompress;
module.exports.build_css = gulp.series(scss2css, cssBuild);
module.exports.build_js = gulp.series(jsCompile, jsBuild);
module.exports.build_html = gulp.series(htmlCompile, htmlBuild);
module.exports.clean = cleanDist;
module.exports.build = gulp.series(cleanDist,  gulp.parallel(
 gulp.series(htmlCompile, htmlBuild),
 gulp.series(jsCompile, jsBuild),
 gulp.series(scss2css, cssBuild),
 fontsCopy, imgCopy
));