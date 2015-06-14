var MidiClock = require('midi-clock');

// in node just do this (uses process.hrtime):
var clock = MidiClock();

// in browser

var audioContext;
if (typeof AudioContext !== "undefined") {
  audioContext = new AudioContext();
} else if (typeof webkitAudioContext !== "undefined") {
  audioContext = new webkitAudioContext();
} else {
    throw new Error('AudioContext not supported. :(');
}


var clock = MidiClock(audioContext);

clock.start();

clock.on('position', function(position){

  // log on each beat, ignore the rest
  var microPosition = position % 24
  if (microPosition === 0){
    console.log('Beat:', position / 24)
  }

});

setTimeout(function(){
  // change to 120bpm after 10 seconds
  clock.setTempo(120)
}, 10000);
