var c
  , video1
  , video2
  , video3
  , video4
  , delay   = 0
  , lastRun = + new Date;

/* Setup
  --------------------------------------------------- */
cyto.setup = function() {

  c = cyto.canvas.context2D;

  video1 = new cyto.Video('sketches/data/spaceships.webm');

  // video2 = new cyto.Video('sketches/data/spaceships.webm');

  // video3 = new cyto.Video('sketches/data/spaceships.webm');

  // video4 = new cyto.Video('sketches/data/spaceships.webm');

}

/* Update
  --------------------------------------------------- */
cyto.update = function() {

}


/* Draw
  --------------------------------------------------- */
cyto.draw = function() {

  if( + new Date - lastRun > delay) {

    lastRun = + new Date;

    video1.draw(cyto.mouseX, cyto.mouseY);
    // video2.draw(800, 200);
    // video3.draw(1000, 600);
    // video4.draw(400, 900);
  }

}
