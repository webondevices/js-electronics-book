const express = require("express");

const app = express();

function start() {

	// Start listening on port 8080
	app.listen(8080, () => {
		console.log("Express server listening on port 8080");
	});

	// Respond to web GET requests with index.html page
	app.get("/", (request, response) => {
		response.sendFile(`${__dirname}/index.html`);
	});

	app.get("/about", (request, response) => {
		response.sendFile(`${__dirname}/about.html`);
	});

	app.get("/resources", (request, response) => {
		response.sendFile(`${__dirname}/resources.html`);
	});

	// Define route folder for static requests
	app.use(express.static(`${__dirname}/`));
}

exports.start = start;