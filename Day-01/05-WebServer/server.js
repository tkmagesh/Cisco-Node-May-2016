var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
	console.log(req.method, ' - ', req.url);
	fs.readFile('index.html', {encoding : 'utf8'}, function(err, fileContents){
		if (err){
			res.statusCode = 404;
			res.end();
			return;
		}
		res.write(fileContents);
		res.end();
	})
});
server.listen(8080);
console.log('server listening on 8080...!');