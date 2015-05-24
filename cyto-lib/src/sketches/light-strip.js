//TODO: migrate to new format

require(['jquery', 'classes/DrawEngine2', 'classes/Utils'], function($, DrawEngine, utils) {


  window.utils = utils;

  /* Sketch Vars
    --------------------------------------------------- */

  var 

  canvas  = document.getElementById('sketch'),
  sketch  = new DrawEngine(canvas),
  c       = canvas.getContext('2d'),

  //const
  TWO_PI = Math.PI * 2,
  R = 0, G = 1, B = 2,

  //vars
  numLights = 50,
  pixels    = [],
  lastRun   = + new Date,
  delay     = 2000,
  speed     = 10,
  scanLed   = 0,
  spacing   = 10,
  size      = 5,
  o = "h", //h or v
  i = 0,
  r = 0, 
  g = 0,
  b = 0,

  transX = 100, //translation
  transY = 100,

  theta = 0,
  frequency = .03,
  amplitude = 128,
  center = 127, //color center monochromatic
  period = 500,
  dx, //val for incrementing x, to be calculated as func of period and spacing

  colDir  = true,
  scanDir = true,

  inc   = 0.2,
  count = 0;


  /* Setup
    --------------------------------------------------- */

  sketch.setup = function() {

    canvas.width  = $(window).width();
    canvas.height = $(window).height();

    for(var i = 0, l = numLights; i < l; i++) {
      pixels.push([255,255,255]);
    }


    for(var i = 0; i < pixels.length; i++) {
       var c = Math.ceil(Math.sin(frequency*i) * amplitude + center);
       pixels[i] = [c,c,c];
    }

  };

  /* Update
    --------------------------------------------------- */

  sketch.update = function() {


    for(var i = 0; i < pixels.length; i++) {
      var c = Math.ceil(Math.sin(frequency*calcWave(inc)+(i*.1)) * amplitude + center);
      pixels[i] = [c,c,c];
    }


    inc++;

    console.log(calcWave(inc));
  };

  /* Draw (main loop)
    --------------------------------------------------- */

  sketch.draw = function(time) {
    

      c.translate(transX, transY);

      drawStrip(0, 100, size,size);

      drawStrip(0, 150, size,size);
    
    if( + new Date - lastRun > delay) {
      lastRun = + new Date;      
    }

  };

  function calcWave(inc) {
    var freq = 0.01,
        amp  = 200;
    return Math.sin(freq*inc) * amp;
  }

  function drawStrip(x,y,w,h) {
    for(var i = 0, l = numLights; i < l; i++) {
      c.fillStyle = 'rgb(' + pixels[i][R] + ',' + pixels[i][G] + ',' + pixels[i][B] + ')';

      if(o === "h") {
        c.fillRect(x + (w + i * spacing), y, w, h);
      } else {
        c.fillRect(x, y + (h + i * spacing), w, h);
      }
    }
  }

  sketch.start();

});