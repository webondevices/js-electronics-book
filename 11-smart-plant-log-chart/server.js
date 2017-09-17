// Start a simple HTTP server
var express = require('express');
var app = express();
var fs = require('fs');

// Log settings
var lastUpdated = new Date();
var logIntervalMinutes = 0.1;

function updateData(sensorData) {
    var now = new Date();

    // If log interval has elapsed log entry
    if (now.getTime() - lastUpdated.getTime() > logIntervalMinutes * 60 * 1000) {
        lastUpdated = now;

        // Add timestamp property to received sensorData object
        sensorData.timestamp = now;
        
        // Read log file
        fs.readFile('./log.json', 'utf-8', function (err, data) {

            // Parse content of file to JavaScript object
            var log = JSON.parse(data);

            // Push new data to the array
            log.entries.push(sensorData);
            
            // Stringify object then save back to log file
            fs.writeFile('./log.json', JSON.stringify(log), 'utf8', function (err) {
                if (err) return console.log(err);
                console.log('Logged data: ', now);
            });
        });
    }
}

function start() {
    
    // Start listening on port 8080
    app.listen(8080, function () {
        console.log('Express server listening on port 8080');
    });

    // Respond to http GET requests with index.html page
    app.get('/', function (request, response) {
        response.sendFile(__dirname + '/public/index.html');
    });

    // Return log file as JSON
    app.get('/plant-data', function (request, response) {
        response.setHeader('Content-Type', 'application/json');

        // Read JSON file
        fs.readFile('./log.json', 'utf-8', function (err, data) {
            if (err) return console.log(err);

            // Send response
            response.send(data);
        });
    });

    // Define route folder for static requests
    app.use(express.static(__dirname + '/public'));
}

exports.start = start;
exports.updateData = updateData;