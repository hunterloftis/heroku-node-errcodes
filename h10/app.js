const http = require('http');
const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello.\n');
}).listen(PORT);
