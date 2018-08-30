const amqp = require('amqplib/callback_api');
const args = process.argv.slice(2);

if (args.length == 0) {
    console.log("Usage: rpc_client.js num");
    process.exit(1);
}
amqp.connect('amqp://localhost', (err, conn) => {
    conn.createChannel((err, ch) => {
        ch.assertQueue('', { exclusive: true }, (err, q) => {
            let corr = generateUuid();
            let num = parseInt(args[0]);
            console.log(' [x] Requesting fib(%d)', num);
            // 发送rpc请求,需要代两个参数.correlationId:唯一值;replyTo:队列名
            ch.sendToQueue('rpc_queue', Buffer.from(num.toString()), { correlationId: corr, replyTo: q.queue });
            ch.consume(q.queue, (msg) => {
                if (msg.properties.correlationId == corr) {
                    console.log(' [.] Got %s', msg.content.toString());
                    setTimeout(function () { conn.close(); process.exit(0) }, 500);
                }
            })
        })
    })
})
function generateUuid() {
    return Math.random().toString() +
        Math.random().toString() +
        Math.random().toString();
}