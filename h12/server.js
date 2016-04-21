const http = require('http');
const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  if (req.url.indexOf('works') !== -1) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('This route works.\n');
  }
  // There's no "else" here, so whenever the "if" fails, the route times out
}).listen(PORT);
