const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dishRouter = require('./routes/dishRouter');

const hostname = 'localhost';
const port = 3000;

// middleware then will be use for creating the server
const app = express();

app.use('/routes', dishRouter);
app.use(morgan('dev'));
// this will only parse data that is in Json format
// and pass it to the req.body
app.use(bodyParser.json());

// app.use(express.static(__dirname + '/public'))

//  endpoints and callback functions
app.all('/dishes', (req,res,next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  // will continuous following request to check
  // the request is matched -> so to the get action
  next();
});

// Actions -  Verbes
app.get('/dishes', (req,res,next) => {
    res.end('Will send all the dishes to you!');
});

app.post('/dishes', (req, res, next) => {
  // Bparser Takes the req.body and res send use it
  // to write the response
  // you need to know the structure though: name, description, etc.
 res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.put('/dishes', (req, res, next) => {
  // no make sense this model endpoint
  res.statusCode = 403;
  res.end('PUT operation not supported on /dishes');
});

// this operation is dangerous and should be Auth.
app.delete('/dishes', (req, res, next) => {
    res.end('Deleting all dishes');
});

app.get('/dishes/:dishId', (req,res,next) => {
    res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
});

// Action does not make sense to modify
app.post('/dishes/:dishId', (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /dishes/'+ req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {
  // Add a line to the response
  res.write('Updating the dish: ' + req.params.dishId + '\n');
  // if the body contains the json details of the dish
  res.end('Will update the dish: ' + req.body.name +
        ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('Deleting dish: ' + req.params.dishId);
});
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
