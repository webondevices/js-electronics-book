const five = require("johnny-five");

const arduino = new five.Board();
// exec command can be dangerous, so be careful how you use it
const exec = require('child_process').exec;

let volume = 0;

arduino.on("ready", () => {

    const potmeter = new five.Sensor("A0");

    // When a changing value is received
    potmeter.on("change", () => {

        // Map input range to a given scale
        const input = this.scaleTo(0, 10);

        // If input is different to previous value
        if (volume !== input) {
            volume = input;

            // Command on OSX
            exec(`osascript -e "set Volume ${volume}"`);

            // Command on Windows
            // exec(`nircmd.exe setsysvolume ${volume * 6553.5}`);

            console.log(`Volume: ${volume}`);
        }
    });
});