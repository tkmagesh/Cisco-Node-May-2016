var url = require('url');
var querystring = require('querystring');

module.exports = function(req, res, next){
	req.url = req.url === '/' ? '/index.html' : req.url;
	req.data = url.parse(req.url);
	req.body = {};
	req.field = function(name){
		return req.data[name] || req.body[name];
	};
	if (req.method === 'POST'){
		var reqData = '';
		req.on('data', function(chunk){
			reqData += chunk;
		});
		req.on('end', function(){
			req.body = querystring.parse(reqData);
			next();
		});
	} else {
		next();	
	}
	
};