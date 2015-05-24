var cy = cyto;
var c;

/* Setup
  --------------------------------------------------- */
cyto.setup = function() {
  //c = cy.getContext();

  cy.font = 'bold 50px Arial';

  console.log(cy);
}

/* Update
  --------------------------------------------------- */
cyto.update = function() {

  //console.log(cyto.getTime());

  //console.log(cyto.getFps());
}


/* Draw
  --------------------------------------------------- */
cyto.draw = function() {
  cy.bg();

  cy.fillStyle = '#fff';
  cy.fillText(String(cy.getTime()), cy.width/2, cy.height/2);
  cy.beginPath();
}