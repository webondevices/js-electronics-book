var chart;

function update(response) {

	for (var i = 0; i < response.entries.length; i++) {

        var data = response.entries[i];

		var time = new Date(data.timestamp);
		var stamp = time.getTime();
		
		tempChart.series[0].addPoint([stamp, data.celsius], false, false);
		lightChart.series[0].addPoint([stamp, data.light], false, false);
		humidChart.series[0].addPoint([stamp, data.moisture], false, false);
	}

	tempChart.redraw();
	lightChart.redraw();
	humidChart.redraw();
}

function getData() {
	$.ajax({
		url: '/plant-data',
		success: update
	});
}

function initChart() {

	getData();

	tempChart = Highcharts.chart('temperature', {
        chart: { type: 'spline' },
        title: { text: 'Temperature' },
        xAxis: { type: 'datetime' },
        series: [{
            name: 'Celsius',
            data: []
        }]
    });

    lightChart = Highcharts.chart('light', {
        chart: { type: 'spline' },
        title: { text: 'Light' },
        xAxis: { type: 'datetime' },
        series: [{
            name: '%',
            data: []
        }]
    });

    humidChart = Highcharts.chart('humidity', {
        chart: { type: 'spline' },
        title: { text: 'Humidity' },
        xAxis: { type: 'datetime' },
        series: [{
            name: '%',
            data: []
        }]
    });
}

$(initChart);

