var rectangle
  , disableLoop = false;

/* Setup
  --------------------------------------------------- */
cyto.setup = function() {

  rectangle = new cy.Rectangle({
    x: 100,
    y: 100,
    drawCenter: true,
    draggable: true,
    fillStyle: 'darkblue'
  });

  /* note: 
    if no draw loop is used the object can still
    be drawn to the view and is even draggable. this can be 
    tested by disabling the draw loop at the top
  */

  //draw loop 
  rectangle.draw();
}

/* Update
  --------------------------------------------------- */
cyto.update = function() {

}

/* Draw
  --------------------------------------------------- */
cyto.draw = function() {

  if(disableLoop) return; //skips draw functions when disabled

  cy.bg('#011722');
  
  rectangle.draw();

  //draws directly from root object (not preserved)
  cy.fill('lightblue');
  cy.noStroke();
  cy.drawCenter = true;
  cy.rect(400, 400, 200, 200, 30);

  cy.noFill();
  cy.stroke('orange');
  cy.drawCenter = false;
  cy.rect(500, 200, 100, 100, 20);
}