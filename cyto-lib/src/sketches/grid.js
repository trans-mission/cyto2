var g1, g2, g3; //draw some grids

/* Setup
  --------------------------------------------------- */
cyto.setup = function() {

  g1 = new cy.Grid({
    width:  50,
    height: 50,
    stepX:  10,
    stepY:  10,
    x:      50,
    y:      50
  });

  g1.draw();

  g2 = new cy.Grid({
    width:  400,
    height: 400,
    stepX:  20,
    stepY:  20,
    x:      120,
    y:      120
  });

  g2.draw();

  g3 = new cy.Grid({
    width:  600,
    height: 75,
    stepX:  5,
    stepY:  25,
    x:      120,
    y:      10
  });

  g3.draw();


};

/* Update
  --------------------------------------------------- */
cyto.update = function() {

};

/* Draw
  --------------------------------------------------- */
cyto.draw = function() {


};