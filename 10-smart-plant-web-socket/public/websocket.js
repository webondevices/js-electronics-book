function update(message) {
	const data = message.data;

	// Convert the data parsed into a whole number
	const celsiusValue = `${parseInt(data.celsius)}°C`;
	const lightValue = `${parseInt(data.light)}%`;
	const moistureValue = `${parseInt(data.moisture)}%`;

	// Update the front end the with value
	$(".celsius").html(celsiusValue);
	$(".light").html(lightValue);
	$(".moisture").html(moistureValue);
}

// Create the websocket connection
const socket = io.connect();

// When data is received, run the update function
socket.on("sensor data", update);
