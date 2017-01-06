// Start a simple HTTP server
var express = require('express');
var app = express();

function start(){
	
	// Start listening on port 8080
	app.listen(8080, function () {
	    console.log('Express server listening on port 8080');
	});

	// Respond to web GET requests with index.html page:
	app.get('/', function (request, response) {
	    response.sendFile(__dirname + '/index.html');
	});

	app.get('/about', function (request, response) {
	    response.sendFile(__dirname + '/about.html');
	});

	app.get('/resources', function (request, response) {
	    response.sendFile(__dirname + '/resources.html');
	});

	// Define route folder for static requests
	app.use(express.static(__dirname + '/'));
}

exports.start = start;
