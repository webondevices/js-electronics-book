const express = require("express");

const app = express();
let apiData = {};

function updateData(sensorData) {
	apiData = sensorData;
}

function start() {

	// Start listening on port 8080
	app.listen(8080, () => {
		console.log("Express server listening on port 8080");
	});

	// Respond to http GET requests with index.html page
	app.get("/", (request, response) => {
		response.sendFile(`${__dirname}/public/index.html`);
	});

	// Respond to the http GET request with data from our server
	app.get("/plant-data", (request, response) => {
		response.setHeader("Content-Type", "application/json");
		response.send(apiData);
	});

	// Define route folder for static requests
	app.use(express.static(`${__dirname}/public`));
}

exports.start = start;
exports.updateData = updateData;