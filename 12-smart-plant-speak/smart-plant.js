var five = require('johnny-five');
var server = require('./server');
var speak = require('./speak');

var arduino = new five.Board();

var sensorData = {
	celsius: 0,
	light: 0,
	moisture: 0
};

// Start server
server.start();

arduino.on('ready', function () {
    
    var thermometer = new five.Thermometer({
        controller: 'LM35',
        pin: 'A0',
        freq: 1000
    });

    var lightSensor = new five.Sensor({
        pin: 'A1',
        freq: 1000
    });

    var moistureSensor = new five.Sensor({
        pin: 'A2',
        freq: 1000
    });

    thermometer.on('data', function () {
        sensorData.celsius = this.C;
        server.updateData(sensorData);
        speak.interpret(sensorData);
    });

    lightSensor.on('data', function () {        
        sensorData.light = (this.value / 1024) * 100;
        server.updateData(sensorData);
        speak.interpret(sensorData);
    });

    moistureSensor.on('data', function () {
        sensorData.moisture = ((1024 - this.value) / 1024) * 100;
        server.updateData(sensorData);
        speak.interpret(sensorData);
    });
});
