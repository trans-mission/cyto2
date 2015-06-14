var midi = require('midi');


var MIDI_PPQN = 24
var SOCKET_PPQN = 4;
var MIDI_CLOCK = 248;
var MIDI_START = 251;
var MIDI_CONTINUE = 252;
var clockCount = 0;

var VMIDI_PORT = "CYTO MIDI IN";


// Set up a new input.
var input = new midi.input();

//Configure a callback.
// input.on('message', function(deltaTime, message) {
//     console.log('m:' + message + ' d:' + deltaTime);
// });


var midiReceived = function(deltaTime, message){
  // console.log(message);
          console.log('m:' + message + ' d:' + deltaTime);
  return;
    // Throttle the number of clock messages sent.
    // The midi standard of 24 pulses-per-quarter-note
    // (e.g. 120*24 = 2880 messages per second @ 12bpm) is a
    // little high to pump through a web socket.
    if (message == MIDI_CLOCK){
        if (clockCount % (MIDI_PPQN/SOCKET_PPQN) == 0){
            //io.sockets.emit('midi', message);
            clockCount = 0;
        }
        clockCount ++;
    } else {
      console.log("different message = ", message);
        //io.sockets.emit('midi', message);
        if (message == MIDI_START || message == MIDI_CONTINUE){
            clockCount = 0;
        }
    }
};

// Create a virtual input port.
input.openVirtualPort(VMIDI_PORT);


// Sysex, timing, and active sensing messages are ignored
// by default. To enable these message types, pass false for
// the appropriate type in the function below.
// Order: (Sysex, Timing, Active Sensing)
// For example if you want to receive only MIDI Clock beats
// you should use
// input.ignoreTypes(true, false, true)
input.ignoreTypes(false, false, false);

input.on('message', midiReceived);
