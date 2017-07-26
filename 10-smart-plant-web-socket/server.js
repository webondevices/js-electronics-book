var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var numberOfClients = 0;

function updateData(sensorData) {

	// Only send data when there are connected users
	if (numberOfClients > 0) {
		io.sockets.emit('sensor data', { data: sensorData });
	}
}

function start(data) {

	// Start listening on port 8080
	server.listen(8080, function () {
	    console.log('Express server listening on port 8080');
	});

	// Respond to web GET requests with index.html page
	app.get('/', function (request, response) {
	    response.sendFile(__dirname + '/public/index.html');
	});

	// Define route folder for static requests
	app.use(express.static(__dirname + '/public'));

	// Increment client counter if someone connects
	io.on('connection', function () {
		numberOfClients++;

		// Decrement client counter if someone disconnects
		io.on('disconnect', function () {
			numberOfClients--;
		});
	});
}

exports.start = start;
exports.updateData = updateData;