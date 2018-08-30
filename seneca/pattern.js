const seneca = require('seneca')();

seneca.add('role:math, cmd:sum', (msg, reply) => {
    reply(null, { answer: (msg.left + msg.right) })
});
seneca.add({ role: 'math', cmd: 'sum', integer: true }, function (msg, respond) {
    var sum = Math.floor(msg.left) + Math.floor(msg.right)
    respond(null, { answer: sum })
})
seneca.act({
    role: 'math',
    cmd: 'sum',
    integer:true,
    left: 1.9,
    right: 2.9
}, (err, result) => {
    if (err) {
        return console.error(err);
    }
    console.log(err,result);
});