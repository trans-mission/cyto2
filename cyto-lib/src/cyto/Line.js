(function(CYTO) {

  /**
   * Creates an Line object
   *
   * @constructor Line
   *
   */

  var Line = function(opt) {

    var $ = this;

    $._rootAccessible = false;

    // set constructor opt
    $.drawCenter  = (opt && opt.drawCenter)  ? opt.drawCenter  : false;
    $.strokeStyle = (opt && opt.strokeStyle) ? opt.strokeStyle : '#fff';
    $.fillStyle   = (opt && opt.fillStyle)   ? opt.fillStyle   : '#000';
    $.draggable   = (opt && opt.draggable)   ? true            : false;

    $.hasFill   = (opt && opt.fillStyle);
    $.hasStroke = true;

    $.x1 = (opt && opt.x1) ? opt.x1 : 0;
    $.y1 = (opt && opt.y1) ? opt.y1 : 0;
    $.x2 = (opt && opt.x2) ? opt.x2 : 0;
    $.y2 = (opt && opt.y2) ? opt.y2 : 0;

    //public methods reserved for instantiated class objects
    $.draw = $._draw;
  };

  /* public methods
     -------------------------------------------------- */
  /**
  * Draws a line
  *
  * @param {Number} x1 x-coord of first point
  * @param {Number} y1 x-coord of first point
  * @param {Number} x2 x-coord of first point
  * @param {Number} y2 x-coord of first point
  */

  Line.prototype.line = function (x1, y1, x2, y2) {

    var $ = this;

    $.renderer.beginPath();
    $.renderer.moveTo(x1, y1);
    $.renderer.lineTo(x1, y1);
    $.renderer.stroke();
    $.renderer.fill();
    $.renderer.clearPath();
  };

  /* private methods
     -------------------------------------------------- */

  Line.prototype._draw = function() {

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

      $.line($.x1, $.y1, $.x2, $.y2);
      $.renderer.restore();
    }
  };

  CYTO.Line = Line;

})(CYTO);
