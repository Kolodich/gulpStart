const fs = require('fs');
const { log } = require('gulp-clean/utils');
const PATH = require("../../settings").PATH;

let fileExtension = [".html", ".scss", ".js"];

function deleteJunks(dirs) {
 dirs.forEach((elem, index) => {
  if(dirs[index].indexOf(".html")>=0 && dirs[index].indexOf(".js")>=0 && dirs[index].indexOf(".scss")>=0) delete dirs[index]; 
});
}

function createFilesByPath(path) {
 let filePaths = path;
 let dirs = fs.readdirSync(filePaths);

 deleteJunks(dirs);

 dirs = dirs.filter(function (el) {return el != null;});
 for(i = 0; i < dirs.length;i++){
  let allFilePath = `${filePaths}${dirs[i]}/${dirs[i]}`;
  fileExtension.forEach(elem => {
   if(fs.existsSync(allFilePath+elem) === false){
    console.log(elem);
    let writedText = ``;
    if(elem==".html"){
      
    }
    else if(elem==".scss"){
writedText = 
`// Global
@import "../../../global";

// Mixins

// Code
.${dirs[i]}{

}`;
    }
    else if(elem==".js"){

    }
    fs.appendFileSync(allFilePath+elem, writedText,(err)=>{if(err) throw err;});   
   } 
  });
 } 
} 

function createBlocks(){
 createFilesByPath(PATH.src.modulesBlocks);
}

function createPages(){
 createFilesByPath(PATH.src.viewsPages);
}

function createBlockAndPages() {
 createPages();
 createBlocks();
}

module.exports.createBlockAndPages = createBlockAndPages;
module.exports.createPages         = createPages;
module.exports.createBlocks        = createBlocks;