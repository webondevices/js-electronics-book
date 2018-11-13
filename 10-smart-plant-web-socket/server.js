const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

let numberOfClients = 0;

function updateData(sensorData) {

	// Only send data when there are connected users
	if (numberOfClients > 0) {
		io.sockets.emit("sensor data", { data: sensorData });
	}
}

function start() {

	// Start listening on port 8080
	server.listen(8080, () => {
		console.log("Express server listening on port 8080");
	});

	// Respond to web GET requests with index.html page
	app.get("/", (request, response) => {
		response.sendFile(`${__dirname}/public/index.html`);
	});

	// Define route folder for static requests
	app.use(express.static(`${__dirname}/public`));

	// Increment client counter if someone connects
	io.on("connection", socket => {
		numberOfClients++;

		// Decrement client counter if someone disconnects
		socket.on("disconnect", () => {
			numberOfClients--;
		});
	});
}

exports.start = start;
exports.updateData = updateData;