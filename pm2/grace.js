const http = require('http');
const app = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hey');
});
const listener = app.listen(3001, function () {
    console.log('Listening on port ' + listener.address().port);
    // Here we send the ready signal to PM2
    process.send('ready');
});