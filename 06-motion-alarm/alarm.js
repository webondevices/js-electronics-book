const five = require("johnny-five");

const arduino = new five.Board();

arduino.on("ready", function () {

    // Setup the components
    const led = new five.Led(6);
    const piezo = new five.Piezo(10);
    const motion = new five.Motion(4);

    const alarmTone = [["C4", 1], ["C3", 1], ["C4", 1], ["C3", 1]];

    // When motion is detected, blink the LED and play the alarm tone
    motion.on("motionstart", function () {
        led.blink(250);

        piezo.play({
            song: alarmTone,
            tempo: 50
        });
    });

    // Stop the LED flashing when the motion stops
    motion.on("motionend", function () {
        led.stop().off();
    });
});