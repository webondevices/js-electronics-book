var five = require('johnny-five');
var matrix = null;

function display (face) {
    
    // Check if the matrix is already initialised
    // Initalise if not
    if (matrix === null) {
        matrix = new five.Led.Matrix({
            pins: {
                data: 2,
                clock: 3,
                cs: 4
            }
        });
  
        // Switch matrix on
        matrix.on();
    }

    // Draw the received pixel definition array
    matrix.draw(face);
}

exports.display = display;
