var five = require('johnny-five');
var arduino = new five.Board();
var exec = require('child_process').exec;

var volume = 0;

arduino.on('ready', function() {
    
    var potmeter = new five.Sensor('A0');

    // When a changing value is received
    potmeter.on('change', function() {

        // Map input range to a given scale
        var input = this.scaleTo(0, 10);

        // If input is different to previous value
        if (volume !== input) {
            volume = input;
            console.log('Volume: ', volume);
            exec('osascript -e "set Volume ' + input + '"');
        }
    });
});
