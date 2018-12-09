let tempChart;
let lightChart;
let humidChart;

function update(response) {
    response.entries.forEach(data => {

        const time = new Date(data.timestamp);
        const stamp = time.getTime();

        // Adds points to the charts using the Highcharts library
        tempChart.series[0].addPoint([stamp, data.celsius], false, false);
        lightChart.series[0].addPoint([stamp, data.light], false, false);
        moistChart.series[0].addPoint([stamp, data.moisture], false, false);
    });

    // Redraw the charts each time update is called
    tempChart.redraw();
    lightChart.redraw();
    moistChart.redraw();
}

// Get the data from the API
function getData() {
    $.ajax({
        url: "/plant-data",
        success: update
    });
}

// Sets up the charts from the High Charts library
function initChart() {
    tempChart = Highcharts.chart("temperature", {
        chart: { type: "spline" },
        title: { text: "Temperature" },
        xAxis: { type: "datetime" },
        series: [{
            name: "Celsius",
            data: []
        }]
    });

    lightChart = Highcharts.chart("light", {
        chart: { type: "spline" },
        title: { text: "Light" },
        xAxis: { type: "datetime" },
        series: [{
            name: "%",
            data: []
        }]
    });

    moistChart = Highcharts.chart("moisture", {
        chart: { type: "spline" },
        title: { text: "Moisture" },
        xAxis: { type: "datetime" },
        series: [{
            name: "%",
            data: []
        }]
    });

    getData();
    setInterval(getData, 5000);
}

$(initChart);