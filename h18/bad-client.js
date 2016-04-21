const http = require('http');
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

var options = {
  hostname: HOST,
  port: PORT,
  path: '?invalid=request', // This will trigger a client error and cause an H13
  method: 'GET'
};

var req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.')
  })
});

req.on('error', (e) => {
  console.log(`problem with request: ${e.message}`);
});

req.end();
