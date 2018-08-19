const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
    conn.createChannel((err, ch) => {
        let q = 'task_queue';
        ch.consume(q, function (msg) {
            let secs = msg.content.toString().split('.').length - 1;
            console.log(" [x] Received %s", msg.content.toString());
            // 延迟n秒
            setTimeout(function () {
                console.log(" [x] Done");
            }, secs * 1000);
        }, { noAck: true });

    })
})