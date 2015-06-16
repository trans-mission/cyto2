var cy = cyto
  , triangle
  ;

/* Setup
  --------------------------------------------------- */
cyto.setup = function() {


}

/* Update
  --------------------------------------------------- */
cyto.update = function() {

}

/* Draw
  --------------------------------------------------- */
cyto.draw = function() {

  cy.noLoop();

  cy.bg('#011722');
  cy.stroke('#fff');

  var a = 30;

  for(var i = 0; i < 500; i+=20) {

    cy.triangle(30 + i, 75, 58 + i, 20, 86 + i, 75);
  }


}
