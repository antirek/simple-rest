var app = require('./index');
//var config = require('config');
var http = require('http');
var server = http.createServer(app);

server.listen(3000, function(){ console.log('started')});

