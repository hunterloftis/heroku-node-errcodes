const http = require('http');
const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  req.socket.destroy();
}).listen(PORT);
