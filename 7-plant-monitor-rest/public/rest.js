function update(data) {
	var celsiusValue = parseInt(data.celsius) + '°C';
	var lightValue = parseInt(data.light) + '%';
	var moistureValue = parseInt(data.moisture) + '%';

	$('.celsius').html(celsiusValue);
	$('.light').html(lightValue);
	$('.moisture').html(moistureValue);
}

function getData() {
	$.ajax({
		url: '/plant-data',
		success: update
	});
}

$('.update').click(getData);

setInterval(getData, 2000);

