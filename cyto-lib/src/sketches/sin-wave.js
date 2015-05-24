/*
The basic sine function is defined as:

f(x) = A sin(wt + p)
where

A is the amplitude
w is the frequency
p is the phase
*/

var xSpacing = 16 //how far apart should each horz point be
  , width //width of entire wave
  , theta = 0.0 //start of angle
  , amplitude = 75.0 //height of wave
  , period  = 500 //how many pixels before the wave repeats
  , dx //value for incrementing x, a function of period and xSpacing
  , yValues; //an array to store height values of the wave

/* Setup
  --------------------------------------------------- */
cyto.setup = function() {
  w = cy.width+16;

  yValues = new Array(w/xSpacing);

  //TODO: put constants on the root obj
  dx = (cy.const.TWO_PI / period) * xSpacing;
   
}

/* Update
  --------------------------------------------------- */
cyto.update = function() {

} 

/* Draw
  --------------------------------------------------- */
cyto.draw = function() {

  cy.bg();
  calcWave();
  renderWave();
}

function calcWave() {
  // Increment theta (try different values for 'angular velocity' here
  theta += 0.02;

  // For every x value, calculate a y value with sine function
  var x = theta;
  for (var i = 0; i < yValues.length; i++) {
    yValues[i] = Math.sin(x)*amplitude;
    x+=dx;
  }
}

function renderWave() {
  cy.noStroke();
  cy.fill('#fff');
  // A simple way to draw the wave with an ellipse at each location
  for (var x = 0; x < yValues.length; x++) {
    cy.ellipse(x*xSpacing, cy.height/2+yValues[x], 16, 16);
  }
}