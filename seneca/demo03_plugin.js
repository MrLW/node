/**
 *  插件:通常在插件函数中不推荐调用act方法,它是被设计成同步的
 *  打印日志:node index.js --seneca.log
 */
const seneca = require('seneca')();

function minimal_plugin(options) {
    console.log(options);
}

function math(options) {
    this.add('role:math,cmd:sum', (msg, respond) => {
        respond(null, { answer: msg.left + msg.right });
    })
    this.add('role:math,cmd:product', function (msg, response) {
        response(null, { answer: msg.left * msg.right })
    })
}

seneca.use(minimal_plugin, { foo: 'bar' });
seneca.use(math).act('role:math,cmd:sum,left:1,right:3', console.log);
