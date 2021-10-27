const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.static(__dirname + '/images'));

routes(app);

module.exports = app;
