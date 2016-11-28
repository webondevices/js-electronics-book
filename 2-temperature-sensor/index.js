var five = require('johnny-five');
var arduino = new five.Board();

arduino.on('ready', function() {
    
    // Access the temperature sensor on pin A0
    var thermometer = new five.Thermometer({
        controller: 'LM35',
        pin: 'A0'
    });

    // Data event listener with callback function
    // Will capture incoming sensor readings
    thermometer.on('data', function(data){

        // Returned data object has readings in celsius, fahrenheit and kelvin
        console.log(data.C + '°C');
        console.log(data.F + '°F');
        console.log(data.K + '°K');

    });
});
