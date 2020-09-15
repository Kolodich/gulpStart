const PATH          = require("../../settings").PATH;
const scss2css      = require("./style").scss2css;
const htmlCompile   = require("./page").htmlCompile;
const jsCompile     = require("./script").jsCompile;
const imgCompress   = require("./image").imgCompress;
const createBlocks  = require("./create").createBlocks;
const createPages   = require("./create").createPages;

const gulp = require("gulp");

function watcher(done) {
 gulp.watch([
  PATH.src.modules+"**/*.html",
  PATH.src.views+"**/*.html",
 ], htmlCompile);
 gulp.watch([
  PATH.src.modules+"**/*.scss",
  PATH.src.views+"**/*.scss",
  PATH.src.self+"_global.scss"
 ], scss2css);
 gulp.watch([
  PATH.src.modules+"**/*.js",
  PATH.src.views+"**/*.js",
  PATH.src.self+"_global.js"
 ], jsCompile);
 gulp.watch([
  PATH.src.img+"**/*[!.min].{svg,png,gif,jpg,jpeg}"
 ], imgCompress);
 gulp.watch([PATH.src.viewsPages+"*"]).on('addDir', () =>{createPages()});
 gulp.watch([PATH.src.modulesBlocks+"*"]).on('addDir', () =>{createBlocks()});
 done();
}

module.exports.watcher = watcher;