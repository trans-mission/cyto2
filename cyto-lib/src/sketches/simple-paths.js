var cy = cyto;

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

  cy.bg();

  for(var i = 0; i < 100; i++) {
    var x = i*2;

    cy.fillStyle = '#ccddff';
    cy.beginPath();
    cy.moveTo(cy.centerX+x,cy.centerY+x);
    cy.lineTo(250+x,50);
    cy.lineTo(200+x,80);
    cy.closePath();
    cy.fill();
    cy.strokeStyle = 'rgb(0,128,0)';
    cy.lineWidth = 1;
    cy.stroke();
  }
}





    

    
