/**
 *  链式写法
 */
const seneca = require('seneca')();
seneca.add('role:math,cmd:sum', function (msg, response) {
    let sum = msg.left + msg.right;
    response(null, { answer: sum });
}).add('role:math,cmd:sum', function (msg, response) {
    // 添加检查功能
    if (!Number.isFinite(msg.left) || !Number.isFinite(msg.right)) {
        return response(new Error('left和right必须为数字'))
    }
    // 调用上一个操作函数
    this.prior({
        role: 'math',
        cmd: 'sum',
        left: msg.left,
        right: msg.right
    }, function (err, resullt) {
        if (err) return response(err)
        resullt.info = msg.left + '+' + msg.right;
        response(null, resullt);
    })
}).act('role:math,cmd:sum,left:1.5,right:2.5', console.log);