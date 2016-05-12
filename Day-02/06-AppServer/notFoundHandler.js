module.exports = function(req, res){
	console.log('serving 404 [notfoundhandler]');
	res.statusCode = 404;
	res.end();
}