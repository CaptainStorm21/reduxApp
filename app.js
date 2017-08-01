var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
// PROXY
var httpProxy = require('http-proxy');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
// PROXY
const apiProxy = httpProxy.createProxyServer({
  target: 'http://localhost:3001'
});

app.use('/api', function(req, res) {
  apiProxy.web(req, res);
})
// END PROXY

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

module.exports = app;
