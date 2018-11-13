const five = require("johnny-five");

const arduino = new five.Board();

arduino.on("ready", () => {

    // Access the light sensor on pin A0
    const lightSensor = new five.Sensor({
        pin: "A0",
        freq: 1000
    });

    // Data event listener with callback function
    // Will capture incoming sensor readings
    lightSensor.on("data", () => {

        // Convert 0 - 1023 reading to percentage
        const percentage = parseInt((this.value / 1024) * 100);

        console.log(`Light: ${percentage}%`);
    });
});