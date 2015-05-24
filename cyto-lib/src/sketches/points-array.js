var radius   = 70
  , cy       = cyto
  , ellipses = []
  , points   = [];

var columns   = 10;
var rows      = 20;
var gridSpace = 20;
var gridStart = 100;

/* Setup
  --------------------------------------------------- */
cyto.setup = function() {

  for(var c = 0; c < columns; c++) {

    points.push([]);
    ellipses.push([]);

    for(var r = 0; r < rows; r++) {

      points[c].push(new cy.Point( 
        (r * (20 + gridSpace)) + gridStart, 
        (c * (20 + gridSpace)) + gridStart));

      ellipses[c].push(
        new cy.Ellipse({
          x: points[c][r].x, 
          y: points[c][r].y,
          width:  20,
          height: 20,
          fillStyle:   '#fff',
          strokeStyle: 'none',
          draggable:   true,
          drawCenter:  true
        })
      );

    }
  }

  for(var c = 0; c < columns; c++) {
    for(var r = 0; r < rows; r++) {
      ellipses[c][r].draw();
    }
  }
}

/* Update
  --------------------------------------------------- */
cyto.update = function() {

} 

/* Draw
  --------------------------------------------------- */
cyto.draw = function() {

  //cy.bg();

  //cy.fillStyle = 'green';

  //draws an ellipse without instantiation
  // cy.ellipse(100, 100, 150, 150, true);
 
  
}