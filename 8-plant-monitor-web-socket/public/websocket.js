function update(message) {
	var data = message.data;

	var celsiusValue = parseInt(data.celsius) + '°C';
	var lightValue = parseInt(data.light) + '%';
	var moistureValue = parseInt(data.moisture) + '%';

	$('.celsius').html(celsiusValue);
	$('.light').html(lightValue);
	$('.moisture').html(moistureValue);
}

var socket = io.connect();

socket.on('sensor data', update);
