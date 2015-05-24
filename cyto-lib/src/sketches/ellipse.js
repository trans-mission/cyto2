var radius = 70
  , cy     = cyto

  , ellipse1, ellipse2;

/* Setup
  --------------------------------------------------- */
cyto.setup = function() {

  ellipse1 = new cy.Ellipse({
    x: cy.centerX, 
    y: cy.centerY, 
    width: 100, 
    height: 100,
    fillStyle: '#333',
    draggable: true,
    drawCenter: true
  });


}

/* Update
  --------------------------------------------------- */
cyto.update = function() {

} 

/* Draw
  --------------------------------------------------- */
cyto.draw = function() {

  cy.bg();

  cy.fillStyle = 'green';

  //draws an ellipse without instantiation
  cy.ellipse(100, 100, 150, 150, true);
 

  ellipse1.draw();


}