// Start a simple HTTP server
var express = require('express');
var app = express();

var apiData = {};

function updateData(sensorData) {
	apiData = sensorData;
}

function start(data){
	
	// Start listening on port 8080
	app.listen(8080, function () {
	    console.log('Express server listening on port 8080');
	});

	// Respond to web GET requests with index.html page:
	app.get('/', function (request, response) {
	    response.sendFile(__dirname + '/public/index.html');
	});

	app.get('/plant-data', function (request, response) {
	    response.setHeader('Content-Type', 'application/json');
    	response.send(JSON.stringify(apiData));
	});

	// Define route folder for static requests
	app.use(express.static(__dirname + '/public'));
}

exports.start = start;
exports.updateData = updateData;
