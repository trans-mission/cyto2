var cy = cyto
  , rectangle
  ;

/* Setup
  --------------------------------------------------- */
cyto.setup = function() {

  rectangle = new cy.Rectangle({
    w: 100,
    h: 400,
    x: 10,
    y: 10,
    drawCenter : false,
    draggable  :  true,
    fillStyle  : 'lightblue'
  });

  /* note:
    if no draw loop is used the object can still
    be drawn to the view and is even draggable. this can be
    tested by disabling the draw loop at the top
  */

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

  rectangle.draw();

  cy.noStroke();
  cy.fill('burlywood');
  cy.rect(100, 100, 400, 400, 20);

  // //draws directly from root object (not preserved)
  cy.noFill();
  cy.stroke('blue');
  cy.rect(300, 50, 100, 100, 20);
}
