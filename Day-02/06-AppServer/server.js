var http = require('http'),
	dataParser = require('./dataParser'),
	serveStatic = require('./serveStatic'),
	calculatorHandler = require('./calculatorHandler'),
	notFoundHandler = require('./notFoundHandler');

var server = http.createServer(function(req, res){
	console.log(req.method, ' - ', req.url);
	dataParser(req, res);
	serveStatic(req, res);
	calculatorHandler(req, res);
	notFoundHandler(req, res);
});

server.listen(8080);
console.log('server listening on 8080...!');