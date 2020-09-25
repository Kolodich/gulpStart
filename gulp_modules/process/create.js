const fs = require('fs');
const { log } = require('gulp-clean/utils');
const PATH = require("../../settings").PATH;

let fileExtension = [".html", ".scss", ".js"];
let layoutTypes = {
  page: "page",
  block: "block",
};

function createFilesByPath(path, layoutType) {
 let filePaths = path;
 let dirs = fs.readdirSync(filePaths);
 deleteJunks(dirs);
 dirs = dirs.filter(function (el) {return el != null;});
 for(i = 0; i < dirs.length;i++){
  let allFilePath = `${filePaths}${dirs[i]}/${dirs[i]}`;
  fileExtension.forEach(elem => {
   if(fs.existsSync(allFilePath+elem) === false){
    let writedText = ``;
    writedText = writeText(dirs[i], layoutType, elem);

    fs.appendFileSync(allFilePath+elem, writedText,(err)=>{if(err) throw err;});   
   } 
  });
 } 
} 

function writeText(dirName, layoutType, fileType) {
  let text = ``;
  if(layoutType==layoutTypes.block){
    if(fileType==".html"){
      text = `<!-- Start "${dirName}" block -->
<div class="nav">\n\n</div>
<!-- End "${dirName}" block -->`;
    }
    else if(fileType==".scss"){
      text = `// Global code
@import "../../../global.scss";\n
// "${dirName}" variables \n
// "${dirName}" mixins \n
// "${dirName}" code
.${dirName}{\n\n};`;
    }
    else if(fileType==".js"){
    }      
  }
  else if(layoutType=layoutTypes.page){
    if(fileType==".html"){}
    else if(fileType==".scss"){
      text = `// Global code
@import "../../../global.scss";

// Fonts

// Root, html and body code
@include root;
html{}
body{}

// Common blocks
@import "../../../modules/common/scss/reset.scss";
@import "../../../modules/blocks/footer/footer";
@import "../../../modules/blocks/header/header";
@import "../../../modules/blocks/main/main";
@import "../../../modules/blocks/nav/nav";
@import "../../../modules/blocks/wrapper/wrapper";
@import "../../../modules/blocks/btn/btn.scss";

// Blocks

// Costom code
`;
    }
    else if(fileType==".js"){}      
  }
  return text;
}

function deleteJunks(dirs) {
  dirs.forEach((elem, index) => {
   if(dirs[index].indexOf(".html")>=0 && dirs[index].indexOf(".js")>=0 && dirs[index].indexOf(".scss")>=0) delete dirs[index]; 
 });
 }

function createBlocks(){
 createFilesByPath(PATH.src.modulesBlocks, layoutTypes.block);
}

function createPages(){
 createFilesByPath(PATH.src.viewsPages, layoutTypes.page);
}

function createBlockAndPages() {
 createPages();
 createBlocks();
}

module.exports.createBlockAndPages = createBlockAndPages;
module.exports.createPages         = createPages;
module.exports.createBlocks        = createBlocks;