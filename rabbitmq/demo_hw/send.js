var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (err, conn) {
    conn.createChannel(function (err, ch) {
        var q = 'hello';
        var msg = 'Hello World!';
        // durable:false表示当RabbitMQ挂了之后,消息会丢失
        ch.assertQueue(q, { durable: false });
        ch.sendToQueue(q, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function () { conn.close(); process.exit(0) }, 500);
});