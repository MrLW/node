/**
 * 静态资源的访问
 * http://localhost:3000/demo04_static.js
 */
const Koa = require('koa') ;
const app = new Koa() ;
 const path = require('path') ;
const static = require('koa-static') ;
const main = static(path.join(__dirname)) ;
app.use(main) ;
app.listen(3000) ;