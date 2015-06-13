var CYTO = (CYTO) ? CYTO : {};
(function(root) {

  var $;

  /**
   * Creates an Rectangle object
   *
   * @constructor Ellipse
   *
   * @param opt        {Object}  - configuration opt for ellipse object
   * @param opt.x      {Number}  - center x coordinate of the ellipse
   * @param opt.y      {Number}  - center y coordinate of the ellipse
   * @param opt.w  {Number}  - w of the ellipse
   * @param opt.h {Number}  - h of the ellipse
   */

  var Rectangle = function(opt) {

    $ = this;
    $._rootAccessible = false;

    $.renderer = cyto.renderer;

    // set constructor opt
    $.drawCenter  = (opt && opt.drawCenter)  ? opt.drawCenter  : false;
    $.radius      = (opt && opt.radius)      ? opt.radius      : 0;
    $.strokeStyle = (opt && opt.strokeStyle) ? opt.strokeStyle : '#fff';
    $.fillStyle   = (opt && opt.fillStyle)   ? opt.fillStyle   : '#000';
    $.draggable   = (opt && opt.draggable)   ? true            : false;

    //private properties
    $.w = (opt && opt.w) ? opt.w : 100;
    $.h = (opt && opt.h) ? opt.h : 100;

    $.x = (opt && opt.x) ? ($.drawCenter) ?
          (opt.x - $.w) / 2 : opt.x : ($.drawCenter) ? - $.w/2 : 0;

    $.y = (opt && opt.y) ? ($.drawCenter) ?
          (opt.y - $.h) / 2 : opt.y : ($.drawCenter) ? - $.h/2 : 0;

    $.hasFill   = (opt && opt.fillStyle);
    $.hasStroke = true;

    $.top    = $.y;
    $.bottom = $.y + $.h;
    $.left   = $.x;
    $.right  = $.x + $.w;

    //public methods reserved for instantiated class objects
    $.draw = $._draw;
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
  * @param {Number} w The w of the rectangle
  * @param {Number} h The h of the rectangle
  * @param r {Number} radius The corner radius. Defaults to 5;
  * @param {Boolean} fill Whether to fill the rectangle. Defaults to false.
  * @param {Boolean} stroke Whether to stroke the rectangle. Defaults to true.
  */

  Rectangle.prototype.rect = function (x, y, w, h, r) {

    r = r || 0;

    if($.drawCenter) {
      x = x - w / 2.0;
      y = y - h / 2.0;
    }

    $.renderer.beginPath();
    $.renderer.moveTo(x + r, y);
    $.renderer.lineTo(x + w - r, y);
    $.renderer.quadraticCurveTo(x + w, y, x + w, y + r);
    $.renderer.lineTo(x + w, y + h - r);
    $.renderer.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    $.renderer.lineTo(x + r, y + h);
    $.renderer.quadraticCurveTo(x, y + h, x, y + h - r);
    $.renderer.lineTo(x, y + r);
    $.renderer.quadraticCurveTo(x, y, x + r, y);
    $.renderer.closePath();
    $.renderer.stroke();
    $.renderer.fill();
    $.renderer.clearPath();
  };

  /* private functions
     -------------------------------------------------- */
  Rectangle.prototype._draw = function() {

    if(!$.hasBeenDrawn) $._hasBeenDrawn = true;

    if($ instanceof Rectangle) {
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

  CYTO.Rectangle = Rectangle;

})(CYTO);
