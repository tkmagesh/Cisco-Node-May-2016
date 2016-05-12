module.exports = function(req, res, next){
	console.log('serving 404 [notfoundhandler]');
	res.statusCode = 404;
	res.end();
	next();
}