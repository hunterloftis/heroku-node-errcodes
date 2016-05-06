const http = require('http');
const cluster = require('cluster');
const PORT = process.env.PORT || 3000;

if (cluster.isWorker) {
  http.createServer((req, res) => {
    //req.socket.destroy(); // this will also create an H13
    throw new Error('We throw an error before sending a response');
    res.end('ok');
  }).listen(PORT);
}
else {
  cluster.fork();
  cluster.on('exit', () => {
    cluster.fork();
  })
}
