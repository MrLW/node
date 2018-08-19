var amqp = require('amqplib/callback_api') ;
// 连接RabbitMQ
amqp.connect('amqp:localhost',(err,conn)=>{
    // 创建通道
    // conn.createChannel((err,ch)=>{
    //     let queue = 'hello' ;
    //     ch.assertQueue(queue,{durable:false});
    //     ch.sendToQueue(queue,Buffer.from(msg));
    // })
    conn.createConfirmChannel((err,confirmChannel)=>{
    })
})
setTimeout(function() { conn.close(); process.exit(0) }, 500);