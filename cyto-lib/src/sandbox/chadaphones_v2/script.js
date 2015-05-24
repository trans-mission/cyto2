function play() {

  var pattern = sc.Pseries(0, 1, 5);

  var scale  = new sc.Scale.major();
  var chords  = [
    [1, 22, 10, 5], [5, 22, 10, 5]
  ];

  //[0, 1, 5], [0, 1, 6],[0, 2, 6], [0, 2, 5], [0, 2, 4],[0, 3, 6], [0, 3, 5], [0, 3, 4]

  var msec = timbre.timevalue("BPM80 L32");
  var osc  = T("saw");
  var env  = T("env", {table:[0.08, [1, msec * 48], [0.2, msec * 16]]});
  var gen  = T("OscGen", {osc:osc, env:env, mul:0.1});

  var pan   = T("pan", gen);
  var synth = pan;

  synth = T("sin", {freq:(msec * 4)+"ms", add:0.5, mul:0.85}, synth);
  synth = T("lpf" , {cutoff:800, Q:12}, synth);

  T("interval", {interval:msec * 64}, function(i) {
    
    var n = i % chords.length;
    var root = pattern.next();

    chords[n].forEach(function(chord){
      //gen.noteOn(scale.wrapAt(root + chord) + 60, 80);
      gen.noteOn(scale.wrapAt(root + chord) + 50, 50);
    });

    pan.pos.value = Math.random() * .5 - 1;

  }).set({buddies:synth}).start();


  var sine1 = T("sin", {freq:440, mul:0.5});
  var sine2 = T("sin", {freq:660, mul:0.5});

  var midis = [64,66,68,72].scramble();
  var msec  = timbre.timevalue("bpm80 l8");

  var sine1 = T("sin", {freq:440, mul:0.5});
  var sine2 = T("sin", {freq:660, mul:0.5});  

  var synth2 = T("OscGen", {env: T("perc", {r:500}, sine1, sine2)});

  var reverb = T("reverb", {room:0.9, damp:0.1, mix:0.50}, synth2);
  var vol = 10;

  var playRandNote = false;

  T("interval", {interval:msec}, function(i) {
    var i = i % midis.length;

    synth2.noteOn(scale.wrapAt(midis[i]) + 50, vol); 

    if(playRandNote) {
      playRandNote = false;
      synth2.noteOn(scale.wrapAt(midis.choose()) + 62, vol);
    }
    
  }).set({buddies:reverb}).start();


  // -----------------------------
  var min = 200, max = 4000;

  function doRandNoteInterval() {
    var nextTime = Math.floor(Math.random() * (max - min + 1)) + min;
    setTimeout(function() {
      playRandNote = true;
      doRandNoteInterval();
    }, nextTime);
  }

var freq = T("pulse", {freq:5, add:880, mul:20}).kr();

  T("sin", {freq:freq, mul:0.5});

  doRandNoteInterval();

 }