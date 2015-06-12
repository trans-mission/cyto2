var CYTO = (CYTO) ? CYTO : {};
(function(root) {

  /**
   * Creates an Rectangle object
   *
   * @constructor Ellipse
   *
   * @param opt        {Object}  - configuration opt for ellipse object
   * @param opt.x      {Number}  - center x coordinate of the ellipse
   * @param opt.y      {Number}  - center y coordinate of the ellipse
   * @param opt.width  {Number}  - width of the ellipse
   * @param opt.height {Number}  - height of the ellipse
   */

  var Rectangle = function(opt) {

    var $ = this;

    $._context = cyto.renderer.getContext();

    // set constructor opt
    $.drawCenter  = (opt && opt.drawCenter)  ? opt.drawCenter  : false;
    $.radius      = (opt && opt.radius)      ? opt.radius      : 0;
    $.strokeStyle = (opt && opt.strokeStyle) ? opt.strokeStyle : '#fff';
    $.fillStyle   = (opt && opt.fillStyle)   ? opt.fillStyle   : '#000';
    $.draggable   = (opt && opt.draggable)   ? true            : false;

    //private properties
    $._width  = (opt && opt.width)  ? opt.width  : 100;
    $._height = (opt && opt.height) ? opt.height : 100;

    $._x = (opt && opt.x) ? ($.drawCenter) ?
           (opt.x - $._width) / 2 : opt.x :
           ($.drawCenter) ? - $._width/2 : 0;

    $._y = (opt && opt.y) ? ($.drawCenter) ?
           (opt.y - $._height) / 2 : opt.y :
           ($.drawCenter) ? - $._height/2 : 0;

    $._hasFill   = (opt && opt.fillStyle);
    $._hasStroke = true;

    $.top    = $._y;
    $.bottom = $._y + $._height;
    $.left   = $._x;
    $.right  = $._x + $._width;

    console.log("initialize rect");
    //public methods reserved for instantiated class objects
    $.draw = $._draw;

    console.log($._draw);
    //console.log(Object.getPrototypeOf(this));
  };

  /* public methods
     -------------------------------------------------- */
  /**
  * Draws a rectangle using the current state of the canvas.
  * By providing a fifth r argument a corner radius can be specified
  *
  * @param {CanvasRenderingContext2D} ctx
  * @param {Number} x The top left x coordinate
  * @param {Number} y The top left y coordinate
  * @param {Number} width The width of the rectangle
  * @param {Number} height The height of the rectangle
  * @param r {Number} radius The corner radius. Defaults to 5;
  * @param {Boolean} fill Whether to fill the rectangle. Defaults to false.
  * @param {Boolean} stroke Whether to stroke the rectangle. Defaults to true.
  */

  Rectangle.prototype.rect = function (x, y, w, h, r) {
    var $ = this;

    r = r || 0;

    if($.drawCenter) {
      x = x - w / 2.0;
      y = y - h / 2.0;
    }

    $.beginPath();
    $.moveTo(x + r, y);
    $.lineTo(x + w - r, y);
    $.quadraticCurveTo(x + w, y, x + w, y + r);
    $.lineTo(x + w, y + h - r);
    $.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    $.lineTo(x + r, y + h);
    $.quadraticCurveTo(x, y + h, x, y + h - r);
    $.lineTo(x, y + r);
    $.quadraticCurveTo(x, y, x + r, y);
    $.closePath();
    $.stroke();
    $.fill();
    $.clearPath();
  };

  /* private functions
     -------------------------------------------------- */
  Rectangle.prototype._draw = function() {
    var $ = this;

    if(!$._hasBeenDrawn) $._hasBeenDrawn = true;

    if($ instanceof Rectangle) {
      $.save();
      if($._hasStroke) {
        $.stroke($.strokeStyle);
      } else {
        $.noStroke();
      }
      if($._hasFill) {
        $.fill($.fillStyle);
      } else {
        $.noFill();
      }
      $.rect($.x, $.y, $.width, $.height, $.radius);
      $.restore();
    }
  };

  CYTO.Rectangle = Rectangle;

})(CYTO);
