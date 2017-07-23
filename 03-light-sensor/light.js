var five = require('johnny-five');

var arduino = new five.Board();

arduino.on('ready', function() {
    
    // Access the light sensor on pin A0
    var lightSensor = new five.Sensor({
        pin: 'A0',
        freq: 1000
    });

    // Data event listener with callback function
    // Will capture incoming sensor readings
    lightSensor.on('data', function(){
        console.log(this.value + '%');
    });
});
