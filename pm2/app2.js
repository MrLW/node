const http = require('http') ;
const server = http.createServer((request,response)=>{
})

// 推出程序
process.on('SIGINT', function() {
    console.log('exit...') ;
});
console.log('app2 server run on 3002',process.env.NODE_APP_INSTANCE);
server.listen(3001) ;