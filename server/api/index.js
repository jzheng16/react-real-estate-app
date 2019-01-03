const express = require('express');

const api = express.Router();

api
  .use('/zillow', require('./zillow'))
  .use('/user', require('./user'));


// No routes hit?
api.use((req, res) => res.status(404).end());
module.exports = api;
