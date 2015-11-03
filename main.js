var redis = require('redis')
var multer  = require('multer')
var express = require('express')
var fs      = require('fs')

var app = express();

// REDIS Client
var client = redis.createClient(6379, '127.0.0.1', {});

// Add hook to make it easier to get all visited URLS.
app.use(function(req, res, next) 
{
	console.log(req.method, req.url);
	if(req.url!="/recent"){
		client.lpush("sites", req.url )
		client.ltrim("sites", 0, 4);
	}
	next(); 
});

// Will match the post request to /upload
app.post('/upload',[ multer({ dest: './uploads/'}), function(req, res){
  console.log(req.body) // form fields
  console.log(req.files) // form files

  if( req.files.image )
  {
	   fs.readFile( req.files.image.path, function (err, data) {
	  		if (err) throw err;
	  		var img = new Buffer(data).toString('base64');
	  		console.log(img);
	  		client.lpush("images", img);
		});
	}

  res.status(204).end()
}]);

// Will match the get request to /meow
app.get('/meow', function(req, res) {
 	{
 		res.writeHead(200, {'content-type':'text/html'});
 		client.lpop("images", function(err, imagedata){
 			if (err) throw err;
 			if(imagedata){
 				res.write("<h1>\n<img src='data:my_pic.jpg;base64,"+imagedata+"'/>");
 			}else{
 				res.write("Image not available!");
 			}
 			res.end();
 		});	
 	}
})

// Will match the get request to /recent
app.get('/recent', function(req, res) {
  	client.lrange("sites", 0, 4, function(err,value){ res.send(value)});
})

// Will match the get request to /set
app.get('/set', function(req, res) {
  	client.set("sample-key", "this message will self-destruct in 20 seconds");
	client.expire("sample-key",20);
	res.send("Sample value set");
	
})

// Will match the get request to /get
app.get('/get', function(req, res) {
	client.get("sample-key", function(err,value){ res.send(value)});
	
})

// Creating a list of App servers instance running on different port
var serverPorts = [3000, 3001, 3002];
var targetServers = [];

// Starting all the server instances
serverPorts.forEach(function(serverPort){
  var server = app.listen(serverPort)
  var host = server.address().address
  var port = server.address().port

  var targetServer = "http://"+host+":"+port;
  targetServers.push(targetServer);
  console.log('Example app listening at http://%s:%s', host, port);

})

// Deleting the entries of the list if exists and Appending target server instances to the redis list
client.del("targetServers");
targetServers.forEach(function(target) {
    client.lpush("targetServers", target);
})












