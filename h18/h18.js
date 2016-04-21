const http = require('http');
const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
    res.write('test', 'utf8', () => {
        req.socket.destroy();
    });
}).listen(PORT);
