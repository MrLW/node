var amqp = require('amqplib/callback_api');
// 连接RabbitMQ
amqp.connect('amqp:localhost', (err, conn) => {
    // 创建通道
    conn.createChannel((err, ch) => {
        let queue = 'rpc_queue';
        ch.assertQueue(queue, { durable: false });
        ch.prefetch(1);
        console.log(' [x] Awaiting RPC requests');
        ch.consume(queue, function reply(msg) {
            let n = parseInt(msg.content.toString());
            console.log(" [.] fib(%d)", n);
            let r = fibonacci(n);
            //响应给客户端
            console.log('msg.properties.replyTo:', msg.properties.replyTo); // 队列名
            ch.sendToQueue(msg.properties.replyTo, new Buffer(r.toString()), { correlationId: msg.properties.correlationId });
            ch.ack(msg) ;
        })
    });

})
function fibonacci(n) {
    if (n == 0 || n == 1)
        return n;
    else
        return fibonacci(n - 1) + fibonacci(n - 2);
}