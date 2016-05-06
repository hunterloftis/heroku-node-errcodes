const http = require('http');
const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  if (req.url.indexOf('works') !== -1) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('This route works.\n');
  }
  else {
    console.log('Something went wrong!');
    // There's no res.end() here, so even though we log errors, the client sees nothing and times out!
  }
}).listen(PORT);
