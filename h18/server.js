const http = require('http');
const cluster = require('cluster');
const PORT = process.env.PORT || 3000;

if (cluster.isWorker) {
  http.createServer((req, res) => {
      res.write('test', 'utf8', () => {
        // req.socket.destroy(); // essentially, we're destroying the socket
        throw new Error('We throw an error before ending the response');
        res.end();
      });
  }).listen(PORT);
}
else {
  cluster.fork();
  cluster.on('exit', () => {
    cluster.fork();
  })
}
