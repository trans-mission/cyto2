var cy        = cyto
  , lastRun   = + new Date
  , delay     = 10
  , clockwise = true
  , radStart  = 0
  , radEnd    = 0
  , deg = 0
  , c;


/* Setup
  --------------------------------------------------- */
cyto.setup = function() {

  cy.strokeStyle = '#fff';
  cy.fillStyle = '#fff';
}

/* Update
  --------------------------------------------------- */
cyto.update = function() {

  //update loop
}


/* Draw
  --------------------------------------------------- */
cyto.draw = function() {

  cy.bg(); //draw baground

  deg += 2;

  if(deg >= 360) {
    deg = 1;
    clockwise = !clockwise;
  }

  radStart = deg * (Math.PI/180);

  cy.beginPath();

  cy.arc(cyto.width/2, cyto.height/2, 150,  radStart, Math.PI*2,  clockwise);
  cy.arc(cyto.width/2, cyto.height/2, 130,  radStart, Math.PI*2,  clockwise);
  cy.arc(cyto.width/2, cyto.height/2, 110,  radStart, Math.PI*2,  clockwise);
  cy.arc(cyto.width/2, cyto.height/2, 90,   radStart, Math.PI*2,  clockwise);
  cy.arc(cyto.width/2, cyto.height/2, 70,   radStart, Math.PI*2,  clockwise);
  cy.arc(cyto.width/2, cyto.height/2, 50,   radStart, Math.PI*2,  clockwise);
  cy.arc(cyto.width/2, cyto.height/2, 30,   radStart, Math.PI*2,  clockwise);
  cy.arc(cyto.width/2, cyto.height/2, 10,   radStart, Math.PI*2,  clockwise);

  cy.stroke();
  
  if( + new Date - lastRun > delay) {
    lastRun = + new Date;
  }
}