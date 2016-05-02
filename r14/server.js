'use strict';

const http = require('http');
const PORT = process.env.PORT || 3000;

let server = http.createServer(addListeners)
  .listen(PORT)
  .setMaxListeners(0);

function addListeners(req, res) {
  for (var i = 0; i < 1000000; i++) {
    server.on('request', () => {});
  }
  res.end('Added a ridiculous number of event listeners\n');
}
