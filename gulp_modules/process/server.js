const gulp = require("gulp");
const bs = require('browser-sync').create();
const SERVER_CONFIG = require("../../settings").SERVER_CONFIG;

function server(done){
 bs.init(SERVER_CONFIG);
 done();
};

module.exports.server = server;