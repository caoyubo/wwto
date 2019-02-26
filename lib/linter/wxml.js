const fs=require("fs"),gulp=require("gulp"),readLine=require("readline"),through2=require("through2"),ab2str=require("arraybuffer-to-string"),logger=require("../utils/logger");function lintLine(e,r){return r.map(r=>r(e)).filter(e=>e)}function lintFile(e,r){const t=ab2str(e.contents),n=e.path;let i=[];return r.forEach(e=>{i=i.concat(e(t,n))}),i}function lint(e="./src",r,t){gulp.src(e+"/**/*.wxml").pipe(through2.obj(function(e,n,i){const l=fs.createReadStream(e.path),u=readLine.createInterface({input:l}),o=lintFile(e,r),s=e.path;let a=0;u.on("line",e=>{a++,lintLine(e,t).forEach(e=>{o.push({path:s,line:a,source:e.source,rule:e.rule})})}),u.on("close",()=>{0===o.length&&logger.success("检测通过："+e.path),o.sort((e,r)=>e.line>r.line?1:-1),o.forEach(e=>{logger.lintWarning(e.path,e.line,e.source,e.rule)})}),this.push(e),i()}))}module.exports=lint;