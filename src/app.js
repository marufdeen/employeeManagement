const express = require('express');
const bodyParser = require('body-parser'); 
const morgan = require('morgan');
const routes  = require('./routes/index') ; 

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json()); 
 
app.use(morgan("dev"))
// Routes for the end-points
app.use('/api', routes);

module.exports = app;
