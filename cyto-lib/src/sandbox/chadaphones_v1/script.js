function play() {

  var pattern = sc.Pseries(0, 2, Infinity);

  var scale  = new sc.Scale.major();
  var chords  = [
    [0, 1, 4], [0, 1, 5], [0, 1, 6],
    [0, 2, 6], [0, 2, 5], [0, 2, 4],
    [0, 3, 6], [0, 3, 5], [0, 3, 4]
  ];

  var msec = timbre.timevalue("BPM120 L16");
  var osc  = T("saw");
  var env  = T("env", {table:[0.2, [1, msec * 48], [0.2, msec * 16]]});
  var gen  = T("OscGen", {osc:osc, env:env, mul:0.5});

  var pan   = T("pan", gen);
  var synth = pan;

  synth = T("sin", {freq:(msec * 4)+"ms", add:0.5, mul:0.85}, synth);
  synth = T("lpf" , {cutoff:800, Q:12}, synth);
  //synth = T("reverb", {room:0.95, damp:0.1, mix:0.75}, synth);

  T("interval", {interval:msec * 64}, function() {

    var root = pattern.next();
    chords.choose().forEach(function(i) {
      gen.noteOn(scale.wrapAt(root + i) +60, 80); 
    });
    pan.pos.value = Math.random() * 2 - 1;

  }).set({buddies:synth}).start();


  var sine1 = T("sin", {freq:440, mul:0.5});
  var sine2 = T("sin", {freq:660, mul:0.5});

  var midis = [64,66,68,72].scramble();
  var msec  = timbre.timevalue("bpm100 l8");

  var sine1 = T("sin", {freq:440, mul:0.5});
  var sine2 = T("sin", {freq:660, mul:0.5});  

  var synth2 = T("OscGen", {env: T("perc", {r:500}, sine1, sine2)});


  var reverb = T("reverb", {room:0.95, damp:0.1, mix:0.50}, synth2);
  var vol = 10;
  var inc = 1;
  T("interval", {interval:msec}, function(count) {

    var root = pattern.next();
     chords.choose().forEach(function(i) {
      synth2.noteOn(scale.wrapAt(root + i) +60, vol+=inc * .5); 
    });

    if(vol > 80) {
      inc = -1;

    }
    if(vol < 10) {
      inc = 1;
    }

    console.log(vol);

    
  }).set({buddies:reverb}); //.start();

 }