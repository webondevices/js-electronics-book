var five = require('johnny-five');

var arduino = new five.Board();

arduino.on('ready', function () {
    
    // Access the push button on pin D2
    var button = new five.Button(2);

    // Event listeners with callback functions
    // Will capture button down event
    button.on('down', function () {
        console.log('button is pressed');
    });

    // Will capture button held down event
    button.on('hold', function () {
        console.log('button is held down for over half a second');
    });

    // Will capture button released event
    button.on('up', function () {
        console.log('button is released');
    });
});