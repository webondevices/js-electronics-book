var five = require('johnny-five');
var arduino = new five.Board();

arduino.on('ready', function() {

    // Setup the components
    var led = new five.Led(6);
    var piezo = new five.Piezo(3);
    var motion = new five.Motion(4);

    var alarmTone = [["C4", 1], ["C3", 1], ["C4", 1], ["C3", 1]];

    // When motion is detected, blink the LED and play the alarm tone
    motion.on("motionstart", function() {
        led.blink(250);

        piezo.play({
            song: alarmTone,
            tempo: 50
        });
    });

    // Stop the LED flashing when the motion stops
    motion.on("motionend", function() {
        led.stop().off();
    });
});
