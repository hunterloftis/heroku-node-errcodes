const http = require('http');
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

var options = {
  hostname: HOST,
  port: PORT,
  path: '/',
  method: 'GET'
};

setInterval(makeRequest, 5);

function makeRequest() {
  console.log('making request...');
  http.request(options, (res) => {
    console.log('  got response');
  })
  .on('error', (err) => {
    console.log('[ got error ]');
    process.exit();
  })
  .end();
}
