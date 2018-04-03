var say = require('say');
var faces = require('./face-definitions');
var face = require('./face');

var interval = 1;
var lastSpoken = new Date();

function interpret(sensorData) {
    var message = '';
    var emotion = 'neutral';
    var now = new Date();
    var currentHour = now.getHours();
    
    if (sensorData.celsius < 18) {
        message += 'I\'m freezing! It\'s ' + sensorData.celsius + 'degrees in here. Turn on the heating or put me out in the sun.';
        emotion = 'sad';
    
    } else if (sensorData.celsius > 25) {
        message += 'I\'m hot! It\'s ' + sensorData.celsius + 'degrees in here. Open the window or move me away from the sun.';
        emotion = 'sad';
    }

    if (sensorData.light < 25 && currentHour < 20 && currentHour > 6) {
        message += 'It\'s too dark in here. Switch the lights on!';
        emotion = 'sad';
    } 

    if (sensorData.moisture < 35) {
        message += 'Water me please! My soil is dry.';
        emotion = 'sad';
    }

    if (message === '') {
        message += 'I\'m happy right now! Everything is fine.';
        emotion = 'happy';
    }

    if (now.getTime() - lastSpoken.getTime() > interval * 1000 * 60) {
        say.speak(message);
        face.display(faces[emotion]);
        lastSpoken = now;
    }
}

exports.interpret = interpret;
