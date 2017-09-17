var five = require('johnny-five');

var arduino = new five.Board();

arduino.on('ready', function () {
    
    // Access the light sensor on pin A0
    var lightSensor = new five.Sensor({
        pin: 'A0',
        freq: 1000
    });

    // Data event listener with callback function
    // Will capture incoming sensor readings
    lightSensor.on('data', function () {

        // Convert 0 - 1023 reading to percentage
        var percentage = parseInt((this.value / 1024) * 100);

        console.log('Light: ' + percentage + '%');
    });
});