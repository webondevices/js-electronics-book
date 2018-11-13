let tempChart;
let lightChart;
let humidChart;

function update(response) {
    response.entries.forEach(data => {

        const time = new Date(data.timestamp);
        const stamp = time.getTime();

        tempChart.series[0].addPoint([stamp, data.celsius], false, false);
        lightChart.series[0].addPoint([stamp, data.light], false, false);
        moistChart.series[0].addPoint([stamp, data.moisture], false, false);
    });

    tempChart.redraw();
    lightChart.redraw();
    moistChart.redraw();
}

function getData() {
    $.ajax({
        url: "/plant-data",
        success: update
    });
}

function initChart() {

    getData();

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
}

$(initChart);

