var five = require('johnny-five');
var Twit = require('twit');

// ADD IN YOUR DETAILS HERE
var T = new Twit({
    consumer_key: 'consumer_key_here',
    consumer_secret: 'consumer_secret_here',
    access_token: 'access_token_here',
    access_token_secret: 'access_token_secret_here'
});

// ADD IN YOUR DETAILS HERE
var Twilio = require('twilio')('account_sid_here', 'auth_token_here');

var arduino = new five.Board();

var celsius = 0;
var light = 0;
var moisture = 0;

var sentAlertThisPeriod = {
    temperature: false,
    light: false,
    moisture: false
};

function sendAlert(message, type) {

    // Text message
    // ADD IN YOUR DETAILS HERE
    Twilio.messages.create({
        to: 'a-verified-phone-number',
        from: 'your-special-twilio-phone-number',
        body: message

    // Handle error messages
    }, function (error) {
        console.log(!error ? 'SMS sent!' : JSON.stringify(error));
    });


    // Tweet message
    T.post('statuses/update', {
        status: message

    // Handle error messages
    }, function (error) {
        console.log(!error ? 'Tweet sent!' : JSON.stringify(error));
    });

    // Disable alerts for the sensor type
    sentAlertThisPeriod[type] = true;

    // Enable alerts after timeout
    setTimeout(function () {
        sentAlertThisPeriod[type] = false;
    }, 60 * 60 * 1000);
}

arduino.on('ready', function () {

    var thermometer = new five.Thermometer({
        controller: 'LM35',
        pin: 'A0',
        freq: 1000
    });

    var lightSensor = new five.Sensor({
        pin: 'A1',
        freq: 1000
    });

    var moistureSensor = new five.Sensor({
        pin: 'A2',
        freq: 1000
    });

    thermometer.on('data', function () {
        celsius = this.C;

        console.log('Temperature: ' + celsius);

        // If no alert was sent this hour
        if (!sentAlertThisPeriod.temperature) {
            if (celsius > 25) sendAlert('It\'s really hot in here: ' + celsius + '°C', 'temperature');
            if (celsius < 15) sendAlert('It\'s freezing cold in here: ' + celsius + '°C', 'temperature');
        }
    });

    lightSensor.on('data', function () {
        var now = new Date();
        var currentHour = now.getHours();

        // Convert to percentage
        light = (this.value / 1024) * 100;

        console.log('Light: ' + light);

        // If no alert was sent this hour
        // And time is between 6am and 8pm to prevent alerts at night
        if (!sentAlertThisPeriod.light && currentHour < 20 && currentHour > 6) {
            if (light < 40) sendAlert('It\'s way too dark in here: ' + light + '%', 'light');
        }
    });

    moistureSensor.on('data', function () {
        // Convert to percentage and invert
        moisture = ((1024 - this.value) / 1024) * 100;

        console.log('Moisture: ' + moisture);

        // If no alert was sent this hour
        if (!sentAlertThisPeriod.moisture) {
            if (moisture < 25) sendAlert('Water me please! My soil is really dry: ' + moisture + '%', 'moisture');
        }
    });
});
