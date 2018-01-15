var five = require('johnny-five');

var arduino = new five.Board();
// exec command can be dangerous, so be careful how you use it
var exec = require('child_process').exec;

var volume = 0;

arduino.on('ready', function () {

    var potmeter = new five.Sensor('A0');

    // When a changing value is received
    potmeter.on('change', function () {

        // Map input range to a given scale
        var input = this.scaleTo(0, 10);

        // If input is different to previous value
        if (volume !== input) {
            volume = input;

            // Command on OSX
            exec('osascript -e "set Volume ' + input + '"');

            // Command on Windows
            // exec('nircmd.exe setsysvolume ' + (volume * 6553.5));
            
            console.log('Volume: ', volume);
        }
    });
});