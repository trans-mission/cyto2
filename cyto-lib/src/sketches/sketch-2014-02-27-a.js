//NOTE: Marked up for JSDOC3
require([
  'jquery',
  'underscore', 
  'classes/DrawEngine2', 
  'classes/Utils'
  ], 

function($, _, DrawEngine, utils) {

  //window.utils = utils;

  /* Sketch Vars
    --------------------------------------------------- */

  var 

  canvas  = document.getElementById('sketch'),
  //sketch  = new DrawEngine(canvas),
  c       = canvas.getContext('2d'),

  lastRun   = + new Date,
  delay     = 100,
  centerX, centerY,
  numNodes = 50,
  nodes = [],

  clockwise = true,
  radStart  = 0,
  radEnd    = 0,

  deg = 0;


  /* Setup
    --------------------------------------------------- */

  sketch.setup = function() {

    canvas.width  = $(window).width();
    canvas.height = $(window).height();
    centerX = canvas.width/2;
    centerY = canvas.height/2;

    $(canvas).hover(function() {
      alert("HI");
    });


    c.strokeStyle = '#fff';
    c.fillStyle = '#fff';
    
    for(var i = 0; i < numNodes; i++) {
      nodes.push(c.arc(centerX, centerY, 20, 0, 2 * Math.PI, false));
    }

  };

    registerEventHandlers();
  /* Update
    --------------------------------------------------- */
  sketch.update = function() {

  };

  /* Draw (main loop)
    --------------------------------------------------- */
  sketch.draw = function(time) {
    
    c.beginPath();
    c.arc(centerX, centerY, 20, 0, 2 * Math.PI, false);
    c.stroke();

    if( + new Date - lastRun > delay) {
      lastRun = + new Date;      
    }

  };

  function registerEventHandlers() {
    console.log($('#sketch'));
    $('#sketch').click(function() {
      console.log("clicked");
    });
  }


/**
 * @name intersectsArc
 * @function
 * @global
 * @param {num} pointX    - x coordinate of the point to test
 * @param {num} pointY    - y coordinate of the point to test
 * @param {num} centerX   - center x coordinate of the given arc
 * @param {num} centerY   - center y coordinate of the given arc
 * @param {num} radius    - the radius of the given arc
 * @param {num} tolerance - acceptable distance from stroke for an intersection
 */

function intersectsArc(pointX, pointY, centerX, centerY, radius, tolerance) {
  var difference, 
      distance = Math.sqrt(
        Math.pow((pointX - centerX), 2) + 
        Math.pow((pointY - centerY), 2)
    );
  difference = Math.abs(distance - radius);
  return difference <= tolerance;
}

//sketch.start();

});