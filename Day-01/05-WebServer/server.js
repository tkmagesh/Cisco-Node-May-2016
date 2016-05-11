var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring'),
	calculator = require('./calculator');

var staticExtns = ['.html', '.js', '.css', '.xml', '.json', '.png', '.jpg', '.ico', '.txt'];
function isStatic(extn){
	return staticExtns.indexOf(extn) !== -1;
}

var server = http.createServer(function(req, res){
	console.log(req.method, ' - ', req.url);
	req.url = req.url || '/index.html';
	var urlObj = url.parse(req.url);
	var filename = path.join(__dirname, urlObj.pathname);
	if (isStatic(path.extname(filename))){
		if (!fs.existsSync(filename)){
			res.statusCode = 404;
			res.end();
		}
		var stream = fs.createReadStream(filename);
		stream.on('error', function(){
			res.statusCode = 500;
			res.end();
		});
		stream.pipe(res);
	} else if (urlObj.pathname === '/calculator' && req.method === 'GET'){
		var data = querystring.parse(urlObj.query);
		var n1 = parseInt(data.n1, 10);
		var n2 = parseInt(data.n2, 10);
		var result = calculator[data.op](n1, n2);
		res.write(result.toString());
		res.end();
	} else if (urlObj.pathname === '/calculator' && req.method === 'POST'){
		var reqData = '';
		req.on('data', function(chunk){
			reqData += chunk;
		});
		req.on('end', function(){
			var data = querystring.parse(reqData);
			var n1 = parseInt(data.n1, 10);
			var n2 = parseInt(data.n2, 10);
			var result = calculator[data.op](n1, n2);
			res.write(result.toString());
			res.end();	
		});
	} else {
		res.statusCode = 404;
		res.end();
	}
});
server.listen(8080);
console.log('server listening on 8080...!');