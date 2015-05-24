//Conway's Game of Life in Cyto

var grid
  , lastRun = + new Date
  , delay   = 100

/* Setup
  --------------------------------------------------- */
cyto.setup = function() {

  grid = new cy.Grid({
    scale       : 1.5,
    width       : 480,
    height      : 300,
    strokeStyle : '#333',
    fillStyle   : '#AAA',
    stepX       : 10,
    stepY       : 10,
    x           : 50,
    y           : 50
  });

  generateRandomSeeds(450);
 

  grid.draw();
};

/* Update
  --------------------------------------------------- */
cyto.update = function() {

};

/* Draw
  --------------------------------------------------- */
cyto.draw = function() {

  if( + new Date - lastRun > delay) {
    lastRun = + new Date;

    cy.bg();

    grid.cells.forEach(function(cell) {
      var neighbors = {
        top:    grid.cell(cell.row - 1, cell.col),
        right:  grid.cell(cell.row, cell.col + 1),
        bottom: grid.cell(cell.row + 1, cell.col),
        left:   grid.cell(cell.row, cell.col - 1)
      };
      cell.on = cellLife(neighbors);
    });
    
    grid.draw();
  }
};

function generateRandomSeeds(amount) {
  var randRow, randCol;
  while(amount--) {
    randRow = cy.math.random(0, grid.cells.rows-1);
    randCol = cy.math.random(0, grid.cells.cols-1);

    grid.cell(randRow, randCol, true);
  }
}

function cellLife(neighbors) {
  var livingNeighbors = 0;
  for(var cell in neighbors) {
    if(typeof(neighbors[cell]) === 'object') {
      if(neighbors[cell].on) {
        livingNeighbors++;
      }
    }
  }
  return (livingNeighbors > 1 && livingNeighbors < 4);
}