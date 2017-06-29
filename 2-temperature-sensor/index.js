var five = require('johnny-five');
var arduino = new five.Board();

arduino.on('ready', function() {
    
    // Access the temperature sensor on pin A0
    var thermometer = new five.Thermometer({
        controller: 'LM35',
        pin: 'A0',
        freq: 1000
    });

    // Data event listener with callback function
    // Will capture incoming sensor readings
    thermometer.on('data', function(){

        // Callback has readings in celsius, fahrenheit and kelvin
        console.log(this.C + '°C');
        console.log(this.F + '°F');
        console.log(this.K + '°K');
        console.log('========');
    });
});
