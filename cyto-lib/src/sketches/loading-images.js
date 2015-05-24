var c
  , img;

/* Setup
  --------------------------------------------------- */
cyto.setup = function() {
  img = new Image();
  img.onload = drawImage;
  img.src = 'sketches/data/penguin.jpeg';
}

/*

The drawImage() method draws an image, referred to as the source image (s), 
into a canvas, referred to as the destination canvas (d). 

The drawImage() method can take three different argument sets: 

drawImage( image, dx, dy) 
drawImage( image, dx, dy, dw, dh) 
drawImage( image, sx, sy, sw, sh, dx, dy, dw, dh)

*/

function drawImage() {
  var dx = cyto.width/2 - 150
    , dy = cyto.height/2 - 226
    , sx = 0
    , sy = 0
    , sw = 1500
    , sh = 2258
    , dw = 300  //translated size to destination canvas
    , dh = 452;

  cyto.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}