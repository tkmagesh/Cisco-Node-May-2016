var http = require('http'),
	path = require('path'),
	dataParser = require('./dataParser'),
	serveStatic = require('./serveStatic'),
	calculatorHandler = require('./calculatorHandler'),
	notFoundHandler = require('./notFoundHandler'),
	app = require('./app');

app.use(function(req, res, next){
	console.log(req.method, ' - ', req.url);
	next();
});
app.use(dataParser);
app.use(serveStatic(path.join(__dirname, '/public')));
app.use(calculatorHandler);
app.use(notFoundHandler);


http.createServer(app).listen(8080);
console.log('server listening on 8080...!');