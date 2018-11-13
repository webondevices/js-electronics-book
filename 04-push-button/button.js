const five = require("johnny-five");

const arduino = new five.Board();

arduino.on("ready", () => {

    // Access the push button on pin D2
    const button = new five.Button(2);

    // Access the LED on pin D6
    const led = new five.Led(6);

    // Event listeners with callback functions
    // Will capture button down event
    button.on("down", () => {
        led.on();
        console.log("button is pressed");
    });

    // Will capture button held down event
    button.on("hold", () => {
        led.blink(100);
        console.log("button is held down for over half a second");
    });

    // Will capture button released event
    button.on("up", () => {
        led.stop().off();
        console.log("button is released");
    });
});