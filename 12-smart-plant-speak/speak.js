var say = require('say');

var interval = 1;
var lastSpoken = new Date();

function interpret(sensorData) {
    var message = '';
    var now = new Date();
    var currentHour = now.getHours();
    
    if (sensorData.celsius < 18) {
        message += 'I\'m freezing! It\'s ' + sensorData.celsius + 'degrees in here. Turn on the heating or put me out to the sun?';
    
    } else if (sensorData.celsius > 25) {
        message += 'I\'m hot! It\'s ' + sensorData.celsius + 'degrees in here. Open the window or move me away from the sun.';
    }

    if (sensorData.light < 25 && currentHour < 20 && currentHour > 6) {
        message += 'It\'s too dark in here. Switch on the lights!';
    } 

    if (sensorData.moisture < 35) {
        message += 'Water me please! My soil is dry.';
    }

    if (message === '') {
        message += 'I\'m happy right now! Everything is fine.';
    }

    if (now.getTime() - lastSpoken.getTime() > interval * 1000 * 60) {
        say.speak(message);
        lastSpoken = now;
    }
}

exports.interpret = interpret;
