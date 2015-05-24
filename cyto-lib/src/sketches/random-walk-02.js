var cy = cyto
  , top, btm;

/* Setup
  --------------------------------------------------- */
cy.setup = function() {

  //init arrays with int zero for all values
  btm = cy.range(20).map(function () { return 0 });
  top = cy.range(20).map(function () { return 0 });
}

/* Update
  --------------------------------------------------- */
cy.update = function() {

    
}

/* Draw
  --------------------------------------------------- */
cy.draw = function() {

  var topIx = Math.floor(Math.random() * top.length);
  var btmIx = Math.floor(Math.random() * btm.length);

  top[topIx]++;
  btm[btmIx]++;
    
  topWidth = cy.width/top.length;
  btmWidth = cy.width/btm.length;

  for(var x = 0; x < top.length; x++) {
    cy.fillRect(x*topWidth, 0, topWidth-1, top[x]);
    cy.fillStyle = '#fff';
    cy.fill();
  }

  for(var x = 0; x < btm.length; x++) {
    cy.fillRect(x*btmWidth, cy.height-btm[x], btmWidth-1, btm[x]);
    cy.fillStyle = '#fff';
    cy.fill();
  }
}
