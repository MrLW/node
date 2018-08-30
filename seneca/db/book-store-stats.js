const status = {};
require('seneca')().add('role:store,info:purchase', function (msg, response) {
    const id = msg.purchase.bookId;
    status[id] = status[id] || 0;
    status[id]++;
    console.log(status);
    response();
}).listen({
    port: 9000,
    host: 'localhost',
    pin: 'role,store,info:purchase'
})