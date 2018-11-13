const five = require("johnny-five");
const server = require("./server");
const speak = require("./speak");

const arduino = new five.Board();

const sensorData = {
    celsius: 0,
    light: 0,
    moisture: 0
};

// Start server
server.start();

arduino.on("ready", () => {

    const thermometer = new five.Thermometer({
        controller: "LM35",
        pin: "A0",
        freq: 1000
    });

    const lightSensor = new five.Sensor({
        pin: "A1",
        freq: 1000
    });

    const moistureSensor = new five.Sensor({
        pin: "A2",
        freq: 1000
    });

    thermometer.on("data", () => {
        sensorData.celsius = this.C;
        server.updateData(sensorData);
        speak.interpret(sensorData);
    });

    lightSensor.on("data", () => {
        sensorData.light = (this.value / 1024) * 100;
        server.updateData(sensorData);
        speak.interpret(sensorData);
    });

    moistureSensor.on("data", () => {
        sensorData.moisture = ((1024 - this.value) / 1024) * 100;
        server.updateData(sensorData);
        speak.interpret(sensorData);
    });
});
