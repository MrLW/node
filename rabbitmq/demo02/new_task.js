const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
    conn.createChannel((err, ch) => {
        let queue = 'task_queue';
        var msg = process.argv.slice(2).join(' ') || "Hello World!";
        ch.assertQueue(queue, { durable: true });
        // persistent:表明这条消息持久化
        ch.sendToQueue(queue, Buffer.from(msg), { persistent: true });
        console.log(" [x] Sent '%s'", msg);
    });
})