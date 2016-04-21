const http = require('http');
const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  setTimeout(() => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('I know, 15 seconds is a long time!\n');
  }, 15000);
}).listen(PORT);
