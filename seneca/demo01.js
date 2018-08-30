/**
 *  复用demo
 */
const seneca = require('seneca')();

seneca.add('role:math,cmd:sum', function (msg, res)  {
    let sum = msg.left + msg.right;
    res(null, { answer: sum });
});

// 注意:这里函数的写法必须是function格式
seneca.add('role:math,cmd:sum,integer:true', function (msg, res){
    // 复用role:math,cmd:sum
    // 在action函数中,this指的就是seneca实例
    this.act({
        role: 'math',
        cmd: 'sum',
        left: Math.floor(msg.left),
        right: Math.floor(msg.right)
    }, res)
})

seneca.act('role:math,cmd:sum,left:1.1,right:9.9', console.log);
console.log('-------------------------------------------------------------')
seneca.act('role:math,cmd:sum,left:1.1,right:9.9,integer:true', console.log);