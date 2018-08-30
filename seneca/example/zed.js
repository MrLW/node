var seneca = require('seneca')()
// zed.js
function zed(options) {
    console.log(this.context.name, this.context.tag, options)
}

seneca.use(zed) ;
seneca.use( {init:zed, name:'zed', tag:'tag0'} ) 