#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

var args = process.argv.slice(2);

if (args.length == 0) {
    console.log("Usage: receive_logs_direct.js [info] [warning] [error]");
    process.exit(1);
}

amqp.connect('amqp://localhost', (err, conn) => {
    conn.createChannel((err, ch) => {
        var ex = 'direct_logs';
        // 设置非持久化
        ch.assertExchange(ex, 'direct', { durable: false });
        ch.assertQueue('', { exclusive: true }, (err, q) => {
            args.forEach(severity => {
                ch.bindQueue(q.queue, ex, severity);
            });
        });
        ch.consume(q.queue, function (msg) {
            console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
        }, { noAck: true });
    })
})