const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

// Helps on handling the request body of the message
// and populates the body property
dishRouter.use(bodyParser.json());

// accepts a parameter for the Endpoint route
dishRouter.route('/')

// by attaching the action to the endpoint you do not need
// to listen to the app/dishes and you can simply attach the
// verbs to the current / route and express will interpreate
// and apply this action to the current endpoint.
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the dishes to you!');
})
.post((req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((req, res, next) => {
    res.end('Deleting all dishes');
});

module.exports = dishRouter;
