var http = require('http');
var fs = require('fs');
var path = require('path');

var server = http.createServer(function(req, res){
	console.log(req.method, ' - ', req.url);
	var filename = path.join(__dirname, req.url);

	if (!fs.existsSync(filename)){
		res.statusCode = 404;
		res.end();
	}
	/*fs.readFile(filename, {encoding : 'utf8'}, function(err, fileContents){
		if (err){
			res.statusCode = 500;
			res.end();
			return;
		}
		res.write(fileContents);
		res.end();
	})*/
	var stream = fs.createReadStream(filename);
	stream.on('error', function(){
		res.statusCode = 500;
		res.end();
	});
	stream.pipe(res);
});
server.listen(8080);
console.log('server listening on 8080...!');