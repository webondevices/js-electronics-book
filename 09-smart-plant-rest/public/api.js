function update(data) {
	const celsiusValue = `${parseInt(data.celsius)}°C`;
	const lightValue = `${parseInt(data.light)}%`;
	const moistureValue = `${parseInt(data.moisture)}%`;

	$(".celsius").html(celsiusValue);
	$(".light").html(lightValue);
	$(".moisture").html(moistureValue);
}

function getData() {
	$.ajax({
		url: "/plant-data",
		success: update
	});
}

$(".update").click(getData);

setInterval(getData, 2000);
