(function(CYTO) {

  /**
   * Creates an Triangle object
   *
   * @constructor Triangle
   *
   */

  var Triangle = function(opt) {

    var $ = this;

    $._rootAccessible = false;

    $.renderer = cyto.renderer;

    // set constructor opt
    $.strokeStyle = (opt && opt.strokeStyle) ? opt.strokeStyle : '#fff';
    $.fillStyle   = (opt && opt.fillStyle)   ? opt.fillStyle   : '#000';
    $.draggable   = (opt && opt.draggable)   ? true            : false;

    //TODO: support storing coords

    $.hasFill   = (opt && opt.fillStyle);
    $.hasStroke = true;

    //public methods reserved for instantiated class objects
    $.draw = $._draw;
  };

  /* public methods
     -------------------------------------------------- */
  /**
  * Draws a triangle
  *
  * @param {Number} x1 x-coord of first point
  * @param {Number} y1 y-coord of first point
  * @param {Number} x2 x-coord of second point
  * @param {Number} y2 y-coord of second point
  * @param {Number} x3 x-coord of third point
  * @param {Number} y3 y-coord of third point
  */

  Triangle.prototype.triangle = function (x1, y1, x2, y2, x3, y3) {
    var $ = this;

    $.renderer.beginPath();
    $.renderer.moveTo(x1, y1);
    $.renderer.lineTo(x2, y2);
    $.renderer.lineTo(x3, y3);
    $.renderer.closePath();
    $.renderer.stroke();
    $.renderer.fill();
    $.renderer.clearPath();
  };

  /* private functions
     -------------------------------------------------- */

  Triangle.prototype._draw = function() {
    var $ = this;

    //injects local style then restores the renderer
    if($ instanceof Triangle) {
      $.renderer.save();

      if($.hasStroke) {
        $.renderer.stroke($.strokeStyle);
      } else {
        $.renderer.noStroke();
      }

      if($.hasFill) {
        $.renderer.fill($.fillStyle);
      } else {
        $.renderer.noFill();
      }

      $.rect($.x, $.y, $.w, $.h, $.radius);
      $.renderer.restore();
    }
  };

  CYTO.Triangle = Triangle;

})(CYTO);
