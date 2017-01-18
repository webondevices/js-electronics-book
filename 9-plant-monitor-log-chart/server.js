// Start a simple HTTP server
var express = require('express');
var app = express();
var fs = require('fs');

var csvToJson = require('./csv-to-json');

// Log settings
var lastUpdated = new Date();
var logIntervalMinutes = 1;

function updateData(sensorData) {
    var now = new Date();

    // If log interval has passed log entry
    if (now.getTime() - lastUpdated.getTime() > logIntervalMinutes * 60 * 1000) {
        lastUpdated = now;
        
        // Save sensor reading in the file
        fs.appendFile('log.csv', (sensorData.celsius + ' , ' +  sensorData.light + ' , ' +  sensorData.moisture + ' , ' + now + '\n'), function (err) {
            if (err) return console.log(err);
            console.log('Logged data: ', now);
        });
    }
}

function start(data) {
    
    // Start listening on port 8080
    app.listen(8080, function () {
        console.log('Express server listening on port 8080');
    });

    // Respond to http GET requests with index.html page
    app.get('/', function (request, response) {
        response.sendFile(__dirname + '/public/index.html');
    });

    // Return CSV file as JSON
    app.get('/plant-data', function (request, response) {
        response.setHeader('Content-Type', 'application/json');

        // Read CSV file
        fs.readFile('./log.csv', 'utf-8', function read(err, data) {
            if (err) return console.log(err);

            // Convert to JSON then send
            response.send(csvToJson.convert(data));
        });
    });

    // Define route folder for static requests
    app.use(express.static(__dirname + '/public'));
}

exports.start = start;
exports.updateData = updateData;
