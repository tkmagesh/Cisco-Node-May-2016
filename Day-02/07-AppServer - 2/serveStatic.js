var path = require('path'),
	fs = require('fs');

var staticExtns = ['.html', '.js', '.css', '.xml', '.json', '.png', '.jpg', '.ico', '.txt'];
function isStatic(extn){
	return staticExtns.indexOf(extn) !== -1;
}


module.exports = function(staticResoucePath){
	return function(req, res, next){
		var filename = path.join(staticResoucePath, req.data.pathname);
		if (isStatic(path.extname(filename))){
			if (!fs.existsSync(filename)){
				console.log('serving 404');
				res.statusCode = 404;
				res.end();
			}
			var stream = fs.createReadStream(filename);
			stream.on('error', function(){
				res.statusCode = 500;
				res.end();
			});
			stream.pipe(res);
		} else {
			next();
		}
	};
}

