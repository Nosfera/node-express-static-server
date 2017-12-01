const express = require('express');
const http = require('http');
const morgan = require('morgan');

const hostname = 'localhost';
const port = 3000;

// middleware then will be use for creating the server
const app = express();

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'))
// function to create our server 3 parameters ()
app.use((req, res, next) => {
  /* this is replace by the logs of Morgan
  console.log(req.headers); */
  // response used even when there file doesnt correspond to
  // the required file. Error handling can be applied
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});

// set up server with the app.express middleware
const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
