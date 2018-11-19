const five = require("johnny-five");

const arduino = new five.Board();

arduino.on("ready", function () {

    // The Arduino board is ready

    // Access the LED on pin D6
    const led = new five.Led(6);

    // Blink the LED every half second
    led.blink(500);

    // Pulsate LED
    // led.pulse();

    // Fade LED in and wait 3 seconds then fade out
    // led.fadeIn();

    // this.wait(3000, () => {
    //     led.fadeOut();
    // });
});