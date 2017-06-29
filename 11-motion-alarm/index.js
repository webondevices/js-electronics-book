var five = require('johnny-five');
var arduino = new five.Board();

arduino.on('ready', function() {
    
    var led = new five.Led(6);
    var piezo = new five.Piezo(10);
    var motion = new five.Motion(4);

    var alarmTone = [["C4", 1], ["C3", 1], ["C4", 1], ["C3", 1]];

    motion.on("motionstart", function() {
        led.blink(250);

        piezo.play({
            song: alarmTone,
            tempo: 50
        });
    });
  
    motion.on("motionend", function() {
        led.stop().off();
    });
});
