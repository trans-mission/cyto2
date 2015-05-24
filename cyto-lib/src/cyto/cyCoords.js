define(function () {

  var cyCoords = function(root) {
    var self = this;

    self.root = root;

    self.centerX = root.width/2;
    self.centerY = root.height/2;

    //Utils Class
  };

  cyCoords.prototype = {
    windowToCanvas: function(canvas, x, y) {
      var bbox = canvas.getBoundingClientRect(); //TODO: make this a method of the canvas class
      return {x: x-bbox.left * (canvas.width / bbox.width), y: y-bbox.top * (canvas.height / bbox.height)};
    }
  };
  
  return cyCoords;

});