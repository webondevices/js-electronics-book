function update(message) {
	var data = message.data;

	// Convert the data parsed into a whole number
	var celsiusValue = parseInt(data.celsius) + '°C';
	var lightValue = parseInt(data.light) + '%';
	var moistureValue = parseInt(data.moisture) + '%';

	// Update the front end the with value
	$('.celsius').html(celsiusValue);
	$('.light').html(lightValue);
	$('.moisture').html(moistureValue);
}

// Create the websocket connection
var socket = io.connect();

// When data is received, run the update function
socket.on('sensor data', update);
