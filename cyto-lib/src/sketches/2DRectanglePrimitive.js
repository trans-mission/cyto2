/* Setup
  --------------------------------------------------- */
cy.setup = function() {

}

/* Update
  --------------------------------------------------- */
cy.update = function() {

} 

/* Draw
  --------------------------------------------------- */
cy.draw = function() {

  cy.bg('#011722');


  cy.noStroke();
  cy.fill('lightblue');
  cy.drawCenter = true;
  cy.rect(400, 400, 200, 200, 30);


  cy.noFill();
  cy.stroke('orange');
  cy.drawCenter = false;
  cy.rect(500, 200, 100, 100, 20);

}