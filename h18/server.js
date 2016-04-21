const http = require('http');
const PORT = process.env.PORT || 3000;
const SEND_DATA = process.env.SEND_DATA || false;

http.createServer((req, res) => {
    if (SEND_DATA) {
      // This will cause an H18
      res.write('test', 'utf8', () => {
          req.socket.destroy();
      });
    }
    else {
      // This will cause an H13
      req.socket.destroy();
    }
  })
  .on('clientError', (err, socket) => {
    console.log('client err:', err);
  })
  .on('error', (err) => {
    console.log('error:', err);
  })
  .on('connection', (socket) => {
    console.log('connection');
  })
  .on('listening', (err) => {
    if (err) throw err;
    console.log(`listening on ${ PORT }`);
  })
  .listen(PORT);
