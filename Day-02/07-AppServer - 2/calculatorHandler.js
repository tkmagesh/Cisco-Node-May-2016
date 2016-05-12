var calculator = require('./calculator');
var querystring = require('querystring');

module.exports = function(req, res, next){
	/*if (req.data.pathname === '/calculator' && req.method === 'GET'){
		var data = querystring.parse(req.data.query) || {} ;
		var n1 = parseInt(data.n1, 10);
		var n2 = parseInt(data.n2, 10);
		var result = calculator[data.op](n1, n2);
		res.write(result.toString());
		res.end();
	} else if (req.data.pathname === '/calculator' && req.method === 'POST'){
		var n1 = parseInt(req.body.n1, 10);
		var n2 = parseInt(req.body.n2, 10);
		var result = calculator[req.body.op](n1, n2);
		res.write(result.toString());
		res.end();	
	} else {
		next();
	}*/

	if (req.data.pathname === '/calculator'){
		var n1 = parseInt(req.field('n1'), 10);
		var n2 = parseInt(req.field('n2'), 10);
		var result = calculator[req.field('op')](n1, n2);
		res.write(result.toString());
		res.end();
	}
}