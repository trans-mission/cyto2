var c       //2d context
  , r = 20  //radius
  , x       //mouse x
  , y;      //mouse y

/* Setup
  --------------------------------------------------- */
cyto.setup = function() {
  c = cyto.getContext();
  
  c.font="12px Telex";
}

/* Update
  --------------------------------------------------- */
cyto.update = function() {

  x = (cyto.mouseX !== 0) ? cyto.mouseX: cyto.canvas.width/2;
  y = (cyto.mouseY !== 0) ? cyto.mouseY: cyto.canvas.height/2;
}

/* Draw
  --------------------------------------------------- */
cyto.draw = function() {

  cyto.bg();

  c.fillStyle = '#fff';
  c.fillText('x: ' + x + ' y: ' + y, x + 28, y);
  c.beginPath();
  c.fillStyle = 'green';
  c.arc(x, y, r, 0, 2 * Math.PI, false);
  c.fill();
  c.lineWidth = 5;
  c.strokeStyle = '#003300';
  c.stroke();
}