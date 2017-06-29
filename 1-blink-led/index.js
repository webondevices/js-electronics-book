var five = require('johnny-five');
var arduino = new five.Board();

arduino.on('ready', function() {
    
    // The Arduino board is ready

    // Access the LED on pin D6
    var led = new five.Led(6);

    // Blink the LED every half second
    led.blink(500);

    // Pulsate LED
    // led.pulse();

    // Fade LED in
    // led.fadeIn();

    // Wait 3 seconds then fade out
    // this.wait(3000, function(){
    //     led.fadeOut();
    // });
});
