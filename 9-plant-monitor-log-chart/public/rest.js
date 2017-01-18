var chart;

function update(response) {

	for (var i = 0; i < response.data.length; i++) {

		console.log('Loading ' + i + ' of ' + response.data.length);

		var time = new Date(response.data[i].timeStamp);
		var stamp = time.getTime();
		
		tempChart.series[0].addPoint([stamp, response.data[i].celsius], false, false);
		lightChart.series[0].addPoint([stamp, response.data[i].light], false, false);
		humidChart.series[0].addPoint([stamp, response.data[i].moisture], false, false);
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
        chart: {
            type: 'spline'
        },

        title: {
            text: 'Temperature'
        },

        xAxis: {
        	type: 'datetime'
        },

        series: [{
            name: 'Celsius',
            data: []
        }]
    });

    lightChart = Highcharts.chart('light', {
        chart: {
            type: 'spline'
        },

        title: {
            text: 'Light'
        },

        xAxis: {
        	type: 'datetime'
        },

        series: [{
            name: '%',
            data: []
        }]
    });

    humidChart = Highcharts.chart('humidity', {
        chart: {
            type: 'spline'
        },

        title: {
            text: 'Humidity'
        },

        xAxis: {
        	type: 'datetime'
        },

        series: [{
            name: '%',
            data: []
        }]
    });
}

$(initChart);

