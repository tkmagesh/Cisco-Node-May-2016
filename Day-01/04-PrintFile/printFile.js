var fs = require('fs');
//var filename = 'D:\\Training\\Cisco-Node-May-2016\\Day-01\\04-PrintFile\\tst.txt';
var filename = process.argv[2];
if (!filename){
	console.log('invalid arguments');
	return;
}

if (!fs.existsSync(filename)){
	console.log('file - ' + filename + ' , doesnot exist');
	return;
}

/*try{
	var fileContents = fs.readFileSync(filename, {encoding : 'utf8'});
	console.log(fileContents);
} catch (e){
	console.log('something went wrong...', e);
}*/

/*try{
	fs.readFile(filename, {encoding : 'utf8'}, function(err, fileContents){
		//if (!err)
		console.log(fileContents);	
		console.log("----------------------------- EOF ------------------------");
	});
} catch (e){
	console.log('something went wrong', e);
} finally{
	console.log('finally reached the end of program');
}
*/

/*fs.readFile(filename, {encoding : 'utf8'}, function(err, fileContents){
	if (err){
		console.log('something went wrong', err);
		return;	
	}
	console.log(fileContents);	
	console.log("----------------------------- EOF ------------------------");
});*/

var stream = fs.createReadStream(filename, {encoding : 'utf8'});
/* open, data, end, close, error */
var readCount = 0;
stream.on('data', function(chunk){
	//console.log(chunk);
	++readCount;
});
stream.on('end', function(){
	console.log("-------------- EOF ---------------- " + readCount + ' - readCounts');
});

stream.pipe(process.stdout)
/*stream.on('end', function(){
	console.log("----------------------------- EOF ------------------------");
});*/
console.log('triggered stream reading');
