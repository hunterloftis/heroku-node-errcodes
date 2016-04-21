'use strict';

const http = require('http');
const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  let writes = 0;
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Content-Length': 500
  });
  res.write('Beginning of a response...');
}).listen(PORT);
