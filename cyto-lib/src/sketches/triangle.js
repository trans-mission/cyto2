var cy = cyto
  , triangle
  ;

/* Setup
  --------------------------------------------------- */
cyto.setup = function() {

  triangle = new cy.Triangle({
    x1: 40,
    y1: 220,
    x2: 90,
    y2: 120,
    x3: 140,
    y3: 220,
    drawCenter : false,
    draggable  : true,
    fillStyle  : 'lightblue'
  });

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

  for(var i = 0; i < 210; i+=30) {
    cy.noFill();
    cy.triangle(30 + i, 60, 58 + i, 20, 86 + i, 60);
  }

  cy.fill('#ff0000');
  cy.triangle(100, 500, 350, 100, 600, 500);

  triangle.draw();

}
